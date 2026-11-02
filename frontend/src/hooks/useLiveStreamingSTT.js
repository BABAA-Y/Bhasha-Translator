import { useState, useRef, useEffect, useCallback } from "react";

export function getWebSocketUrl(sourceLang = "hi") {
  if (import.meta.env.VITE_WS_BASE_URL) {
    return `${import.meta.env.VITE_WS_BASE_URL}/ws/stt-stream?source_lang=${encodeURIComponent(sourceLang)}`;
  }
  const host =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "localhost";
  const protocol =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "wss:"
      : "ws:";
  return `${protocol}//${host}:8000/api/ws/stt-stream?source_lang=${encodeURIComponent(sourceLang)}`;
}

// Convert Float32Array to 16-bit PCM Int16Array Buffer with NaN guards
function floatTo16BitPCM(input) {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const val = Number.isFinite(input[i]) ? input[i] : 0;
    const s = Math.max(-1, Math.min(1, val));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return output.buffer;
}

// Downsample buffer to 16kHz
function downsampleBuffer(buffer, sampleRate, outSampleRate = 16000) {
  if (!buffer || buffer.length === 0 || outSampleRate >= sampleRate) {
    return buffer;
  }
  const sampleRateRatio = sampleRate / outSampleRate;
  const newLength = Math.round(buffer.length / sampleRateRatio);
  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      const v = Number.isFinite(buffer[i]) ? buffer[i] : 0;
      accum += v;
      count++;
    }
    result[offsetResult] = count > 0 ? accum / count : 0;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
}

export function useLiveStreamingSTT() {
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [error, setError] = useState(null);

  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const processorRef = useRef(null);
  const timerRef = useRef(null);
  const finalResolveRef = useRef(null);
  const latestTextRef = useRef("");
  const recordingStartTimeRef = useRef(0);

  // Clean cleanup
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
      } catch {
        // ignore
      }
      processorRef.current = null;
    }

    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch {
        // ignore
      }
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close().catch(() => {});
      } catch {
        // ignore
      }
      audioContextRef.current = null;
    }

    if (wsRef.current) {
      try {
        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.close();
        }
      } catch {
        // ignore
      }
      wsRef.current = null;
    }

    setIsRecording(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const startStreaming = useCallback(
    async (sourceLang = "hi") => {
      cleanup();
      setError(null);
      setLiveTranscript("");
      latestTextRef.current = "";
      setDurationSeconds(0);
      recordingStartTimeRef.current = Date.now();

      try {
        // 1. Request microphone access
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("Microphone access is not supported in this browser.");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        mediaStreamRef.current = stream;

        // 2. Open WebSocket connection to FastAPI STT Gateway
        const wsUrl = getWebSocketUrl(sourceLang);
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Connecting to speech recognizer timed out."));
          }, 7000);

          ws.onopen = () => {
            clearTimeout(timeout);
            resolve();
          };

          ws.onerror = () => {
            clearTimeout(timeout);
            reject(new Error("Failed to connect to speech recognizer."));
          };
        });

        // 3. Handle messages from WebSocket
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            const text = (data.text || "").trim();

            if (data.type === "partial_transcript" && text) {
              latestTextRef.current = text;
              setLiveTranscript(text);
            } else if (data.type === "final_transcript") {
              const committedText = text || latestTextRef.current;
              latestTextRef.current = committedText;
              setLiveTranscript(committedText);
              if (finalResolveRef.current) {
                finalResolveRef.current(committedText);
                finalResolveRef.current = null;
              }
            } else if (data.type === "error") {
              console.warn("STT stream notice:", data.message);
            }
          } catch (err) {
            console.warn("WS parse notice:", err);
          }
        };

        ws.onclose = () => {
          if (finalResolveRef.current) {
            finalResolveRef.current(latestTextRef.current);
            finalResolveRef.current = null;
          }
        };

        // 4. Initialize Web Audio API to capture raw 16kHz PCM
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContextClass();
        audioContextRef.current = audioCtx;

        if (audioCtx.state === "suspended") {
          await audioCtx.resume().catch(() => {});
        }

        const source = audioCtx.createMediaStreamSource(stream);
        // ScriptProcessor with bufferSize 2048 or 4096 gives smooth 30-60ms PCM frames
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
          if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            return;
          }
          const inputChannel = e.inputBuffer.getChannelData(0);
          const downsampled = downsampleBuffer(inputChannel, audioCtx.sampleRate, 16000);
          const pcmBuffer = floatTo16BitPCM(downsampled);
          wsRef.current.send(pcmBuffer);
        };

        source.connect(processor);
        // Connect processor to destination (muted) to keep audio pipeline active in WebKit/Blink
        const silentGain = audioCtx.createGain();
        silentGain.gain.value = 0;
        processor.connect(silentGain);
        silentGain.connect(audioCtx.destination);

        // 5. Start Duration Timer
        setIsRecording(true);
        timerRef.current = setInterval(() => {
          setDurationSeconds((prev) => prev + 1);
        }, 1000);

        return true;
      } catch (err) {
        console.error("Live streaming start error:", err);
        cleanup();
        const friendlyMsg =
          err.name === "NotAllowedError" || err.name === "PermissionDeniedError"
            ? "Microphone access is required to speak."
            : err.message || "Failed to initialize microphone.";
        setError(friendlyMsg);
        throw new Error(friendlyMsg);
      }
    },
    [cleanup]
  );

  const stopStreaming = useCallback(() => {
    return new Promise((resolve) => {
      const recordingDurationMs = Date.now() - recordingStartTimeRef.current;

      // Stop duration timer immediately
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop audio tracks immediately so microphone light turns off
      if (mediaStreamRef.current) {
        try {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        } catch {
          // ignore
        }
      }

      // If recording was under 400ms, abort as accidental tap
      if (recordingDurationMs < 400) {
        cleanup();
        resolve({
          tooShort: true,
          transcript: "",
          durationMs: recordingDurationMs,
        });
        return;
      }

      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        const text = latestTextRef.current;
        cleanup();
        resolve({
          tooShort: false,
          transcript: text,
          durationMs: recordingDurationMs,
        });
        return;
      }

      // Store resolve callback to wait for final transcript from server
      let fallbackTimeout = null;
      let resolved = false;
      const finish = (finalText) => {
        if (resolved) return;
        resolved = true;
        if (fallbackTimeout) {
          clearTimeout(fallbackTimeout);
          fallbackTimeout = null;
        }
        cleanup();
        resolve({
          tooShort: false,
          transcript: finalText || latestTextRef.current,
          durationMs: recordingDurationMs,
        });
      };

      finalResolveRef.current = finish;

      // Send stop action to backend
      try {
        ws.send(JSON.stringify({ action: "stop" }));
      } catch {
        finish(latestTextRef.current);
        return;
      }

      // Fallback timeout in case final event doesn't arrive within 1.8s
      fallbackTimeout = setTimeout(() => {
        finish(latestTextRef.current);
      }, 1800);
    });
  }, [cleanup]);

  const resetTranscript = useCallback(() => {
    setLiveTranscript("");
    latestTextRef.current = "";
    setError(null);
    setDurationSeconds(0);
  }, []);

  return {
    isRecording,
    liveTranscript,
    durationSeconds,
    error,
    startStreaming,
    stopStreaming,
    resetTranscript,
  };
}
