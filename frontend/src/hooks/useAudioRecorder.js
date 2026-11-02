import { useState, useRef, useEffect, useCallback } from "react";

function getSupportedMimeType() {
  if (typeof window === "undefined" || !window.MediaRecorder) {
    return "";
  }
  const candidateTypes = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
    "audio/wav",
  ];
  for (const type of candidateTypes) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return "";
}

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  // Cleanup active audio tracks on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    setError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Microphone recording is not supported in this browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = getSupportedMimeType();
      const options = mimeType ? { mimeType } : undefined;
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(100);
      setIsRecording(true);
      return true;
    } catch (err) {
      console.error("Microphone access error:", err);
      const friendlyMsg =
        err.name === "NotAllowedError" || err.name === "PermissionDeniedError"
          ? "Microphone access denied. Please allow microphone permissions."
          : err.message || "Failed to initialize microphone.";
      setError(friendlyMsg);
      setIsRecording(false);
      throw new Error(friendlyMsg);
    }
  }, []);

  const stopRecording = useCallback(() => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        setIsRecording(false);
        resolve(null);
        return;
      }

      recorder.onstop = () => {
        const mimeType = recorder.mimeType || getSupportedMimeType() || "audio/webm";
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        setIsRecording(false);
        resolve(audioBlob);
      };

      try {
        recorder.stop();
      } catch (err) {
        console.warn("MediaRecorder stop notice:", err);
        setIsRecording(false);
        resolve(null);
      }
    });
  }, []);

  const resetError = useCallback(() => setError(null), []);

  return {
    isRecording,
    error,
    resetError,
    startRecording,
    stopRecording,
  };
}
