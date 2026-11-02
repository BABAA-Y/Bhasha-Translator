import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftRight, Volume2, RotateCcw, AlertCircle } from "lucide-react";

import Header from "../Header";
import LanguageSelector from "../LanguageSelector";
import MicButton from "../MicButton";
import QuickCards from "../QuickCards";

import { useLiveStreamingSTT } from "../../hooks/useLiveStreamingSTT";
import { translateText, fetchQuickCards } from "../../services/api";
import { getLanguage } from "../../constants/languages";

export default function LiveTranslatorApp({ onBackToLanding }) {
  const [activeTab, setActiveTab] = useState("split"); // "split" | "cards"
  const [personALang, setPersonALang] = useState("hi"); // You (Hindi)
  const [personBLang, setPersonBLang] = useState("ta"); // Partner (Tamil)

  // State machine: "IDLE" | "RECORDING" | "STOPPING" | "PROCESSING" | "RESULT" | "ERROR"
  const [turnState, setTurnState] = useState("IDLE");
  const [, setIsPlayingAudio] = useState(false);
  const [playingTurnId, setPlayingTurnId] = useState(null);
  const [quickCards, setQuickCards] = useState([]);
  const [statusNotice, setStatusNotice] = useState(null);

  // Single source of truth for completed turns
  const [turns, setTurns] = useState([]);

  // Active turn live state (used strictly during active recording/processing)
  const [currentFinalTranscript, setCurrentFinalTranscript] = useState("");

  // Live streaming STT hook
  const {
    isRecording,
    liveTranscript,
    durationSeconds,
    error: sttError,
    startStreaming,
    stopStreaming,
    resetTranscript,
  } = useLiveStreamingSTT();

  const audioPlayerRef = useRef(null);
  const noticeTimeoutRef = useRef(null);
  const historyContainerRef = useRef(null);

  // Helper for non-intrusive notification toast
  const showNotice = (message, type = "info") => {
    if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    setStatusNotice({ message, type });
    noticeTimeoutRef.current = setTimeout(() => {
      setStatusNotice(null);
    }, 4500);
  };

  useEffect(() => {
    if (sttError) {
      showNotice(sttError, "error");
      setTurnState("IDLE");
    }
  }, [sttError]);

  // Load quick cards & cleanup
  useEffect(() => {
    fetchQuickCards().then((data) => setQuickCards(data || []));
    return () => {
      if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    };
  }, []);

  // Scoped Auto-Scroll ONLY the history container (keeps mic stationary)
  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTo({
        top: historyContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [turns, liveTranscript, turnState]);

  // Swap languages safely
  const handleSwap = () => {
    if (turnState === "RECORDING" || turnState === "PROCESSING" || turnState === "STOPPING") {
      return;
    }
    const temp = personALang;
    setPersonALang(personBLang);
    setPersonBLang(temp);
  };

  // Play audio safely
  const playAudio = (audioUrl, turnId = null) => {
    if (!audioUrl || !audioPlayerRef.current) return;
    try {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current.src = audioUrl;
      const playPromise = audioPlayerRef.current.play();
      if (playPromise !== undefined) {
        setIsPlayingAudio(true);
        if (turnId) setPlayingTurnId(turnId);
        playPromise.catch((e) => {
          console.warn("Audio autoplay blocked by browser policy; user can tap manual play button:", e);
          setIsPlayingAudio(false);
          setPlayingTurnId(null);
        });
      }
    } catch (err) {
      console.warn("Audio playback notice:", err);
      setIsPlayingAudio(false);
      setPlayingTurnId(null);
    }
  };

  // FIRST TAP: Start live recording & live transcription
  const handleStartRecording = async () => {
    if (turnState !== "IDLE") return;
    setStatusNotice(null);
    setCurrentFinalTranscript("");

    // Warm up/unlock audio element for mobile browsers during initial gesture
    if (audioPlayerRef.current) {
      audioPlayerRef.current.load();
    }

    try {
      setTurnState("RECORDING");
      await startStreaming(personALang);
    } catch (err) {
      console.warn("Live STT start notice:", err);
      setTurnState("IDLE");
    }
  };

  // SECOND TAP: Stop recording, finalize live transcript, and trigger translation
  const handleStopRecording = async () => {
    if (turnState !== "RECORDING") return;
    setTurnState("STOPPING");

    // Capture language pair safely at stop moment
    const capturedSourceLang = personALang;
    const capturedTargetLang = personBLang;

    try {
      const result = await stopStreaming();

      if (result.tooShort) {
        showNotice("Speak for a moment before stopping.", "warning");
        resetTranscript();
        setTurnState("IDLE");
        return;
      }

      const finalSpeech = (result.transcript || "").trim();

      if (!finalSpeech) {
        showNotice("Couldn't hear speech clearly. Please try again.", "info");
        resetTranscript();
        setTurnState("IDLE");
        return;
      }

      // Lock final source speech for processing indicator
      setCurrentFinalTranscript(finalSpeech);

      // ONLY NOW Translation Starts!
      setTurnState("PROCESSING");

      const data = await translateText(finalSpeech, capturedSourceLang, capturedTargetLang);
      const translated = (data && data.translated_text ? data.translated_text : "").trim();
      const audioB64 = data && data.audio_base64 ? data.audio_base64 : null;

      // Append completed turn to cumulative conversation history (ONE SOURCE OF TRUTH)
      const completedTurn = {
        id: Date.now().toString(),
        sourceLang: capturedSourceLang,
        targetLang: capturedTargetLang,
        sourceText: finalSpeech,
        translatedText: translated,
        audioBase64: audioB64,
        createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setTurns((prev) => [...prev, completedTurn]);

      // Play translated audio
      if (audioB64) {
        playAudio(audioB64, completedTurn.id);
      }

      setTurnState("RESULT");

      // Reset active card and return to IDLE for next turn
      setTimeout(() => {
        setTurnState("IDLE");
        setCurrentFinalTranscript("");
      }, 350);

    } catch (err) {
      console.error("Translation pipeline error:", err);
      showNotice("Translation failed. Please try again.", "error");
      setTurnState("IDLE");
      setCurrentFinalTranscript("");
    }
  };

  // Master click-to-toggle handler
  const handleToggleMic = async () => {
    if (turnState === "RECORDING") {
      await handleStopRecording();
    } else if (turnState === "IDLE") {
      await handleStartRecording();
    }
  };

  // Quick phrase translation
  const handleQuickPhrase = async (text) => {
    if (turnState !== "IDLE") return;
    setTurnState("PROCESSING");
    setCurrentFinalTranscript(text);

    const capturedSourceLang = personALang;
    const capturedTargetLang = personBLang;

    try {
      const data = await translateText(text, capturedSourceLang, capturedTargetLang);
      const translated = (data && data.translated_text ? data.translated_text : "").trim();
      const audioB64 = data && data.audio_base64 ? data.audio_base64 : null;

      const completedTurn = {
        id: Date.now().toString(),
        sourceLang: capturedSourceLang,
        targetLang: capturedTargetLang,
        sourceText: text,
        translatedText: translated,
        audioBase64: audioB64,
        createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setTurns((prev) => [...prev, completedTurn]);

      if (audioB64) {
        playAudio(audioB64, completedTurn.id);
      }

      setActiveTab("split");
      setTurnState("RESULT");

      setTimeout(() => {
        setTurnState("IDLE");
        setCurrentFinalTranscript("");
      }, 350);
    } catch (err) {
      console.error("Quick phrase translation error:", err);
      showNotice("Translation failed.", "error");
      setTurnState("IDLE");
      setCurrentFinalTranscript("");
    }
  };

  const handleClear = () => {
    resetTranscript();
    setTurns([]);
    setCurrentFinalTranscript("");
    setStatusNotice(null);
    setTurnState("IDLE");
  };

  const personALangObj = getLanguage(personALang);
  const personBLangObj = getLanguage(personBLang);
  const hasHistory = turns.length > 0;
  const isControlsDisabled = turnState === "RECORDING" || turnState === "PROCESSING" || turnState === "STOPPING";

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-transparent text-slate-100 relative selection:bg-[#FF9933]/30">
      <audio
        ref={audioPlayerRef}
        className="hidden"
        onEnded={() => {
          setIsPlayingAudio(false);
          setPlayingTurnId(null);
        }}
        onPause={() => {
          setIsPlayingAudio(false);
          setPlayingTurnId(null);
        }}
      />

      {/* 1. TOP NAVIGATION */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBackToLanding={onBackToLanding}
      />

      {/* 2. MAIN WORKSPACE */}
      {activeTab === "split" ? (
        <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-4 flex-1 flex flex-col justify-between">
          
          {/* Language Selector Bar with Swap Button */}
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/[0.08] shrink-0">
            <div className="flex-1">
              <LanguageSelector
                label="You"
                value={personALang}
                onChange={setPersonALang}
                align="left"
                disabled={isControlsDisabled}
              />
            </div>

            <div className="flex flex-col items-center justify-end shrink-0 pt-4">
              <button
                type="button"
                onClick={handleSwap}
                disabled={isControlsDisabled}
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/[0.1] hover:border-white/[0.2] flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF9933]"
                title="Swap languages"
                aria-label="Swap source and partner languages"
              >
                <ArrowLeftRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1 flex justify-end">
              <LanguageSelector
                label="Partner"
                value={personBLang}
                onChange={setPersonBLang}
                align="right"
                disabled={isControlsDisabled}
              />
            </div>
          </div>

          {/* Clear Button Bar (Only shown when history exists) */}
          {hasHistory && (
            <div className="flex justify-end pt-2 pb-1 shrink-0">
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 transition cursor-pointer"
                title="Clear conversation"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear history</span>
              </button>
            </div>
          )}

          {/* 3. BOUNDED CONVERSATION HISTORY FEED (Internally Scrollable, Height Capped) */}
          <div
            ref={historyContainerRef}
            className="flex-1 max-h-[50vh] sm:max-h-[52vh] overflow-y-auto py-2 my-auto pr-1 no-scrollbar flex flex-col gap-2.5"
          >
            {/* Empty State when no turns exist and idle */}
            {!hasHistory && turnState === "IDLE" && (
              <div className="flex-1 flex flex-col justify-center items-center text-center py-12 px-4 select-none opacity-60">
                <p className="text-base sm:text-lg font-medium text-slate-400 font-indic">
                  Speak in {personALangObj.name} to begin conversation...
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Translations will appear here in {personBLangObj.name}
                </p>
              </div>
            )}

            {/* RENDER COMPLETED TURNS (Single Source of Truth, Compact Chat Blocks) */}
            {turns.map((turn, index) => {
              const srcObj = getLanguage(turn.sourceLang);
              const tgtObj = getLanguage(turn.targetLang);
              return (
                <div
                  key={turn.id || index}
                  className="py-2.5 px-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] transition flex flex-col gap-2 text-left"
                >
                  {/* You */}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF9933]/90">
                      You ({srcObj.name})
                    </span>
                    <p className="text-sm sm:text-base font-medium text-white/95 font-indic leading-snug mt-0.5">
                      {turn.sourceText}
                    </p>
                  </div>

                  {/* Hairline Separator */}
                  <div className="w-full h-px bg-white/[0.04]" />

                  {/* Partner */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Partner ({tgtObj.name})
                      </span>
                      <p className="text-sm sm:text-base font-medium text-white/95 font-indic leading-snug mt-0.5">
                        {turn.translatedText}
                      </p>
                    </div>
                    {turn.audioBase64 && (
                      <button
                        type="button"
                        onClick={() => playAudio(turn.audioBase64, turn.id)}
                        className={`inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border transition shrink-0 cursor-pointer self-center ${
                          playingTurnId === turn.id
                            ? "bg-[#FF9933]/20 border-[#FF9933]/50 text-[#FF9933]"
                            : "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-[#FF9933] hover:text-[#FFAE5C]"
                        }`}
                        title="Play voice"
                      >
                        <Volume2 className={`w-3 h-3 ${playingTurnId === turn.id ? "animate-bounce" : ""}`} />
                        <span>{playingTurnId === turn.id ? "Playing" : "Play"}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* LIVE / IN-PROGRESS TURN (Rendered ONLY while actively recording or processing) */}
            {turnState !== "IDLE" && (
              <div className="py-2.5 px-3.5 rounded-xl bg-[#FF9933]/[0.03] border border-[#FF9933]/25 flex flex-col gap-2 text-left animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF9933]">
                    You ({personALangObj.name})
                  </span>
                  {turnState === "RECORDING" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                      Live
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base font-medium text-white font-indic leading-snug">
                  {liveTranscript || currentFinalTranscript || (turnState === "RECORDING" ? "Listening to your voice..." : "")}
                  {turnState === "RECORDING" && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-[#FF9933] animate-pulse align-middle" />
                  )}
                </p>

                {(turnState === "PROCESSING" || turnState === "STOPPING") && (
                  <div className="pt-1.5 border-t border-white/[0.04] flex items-center gap-2 text-xs text-slate-400 font-indic">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-ping" />
                    <span>Translating into {personBLangObj.name}...</span>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Status Notice (Non-blocking, subtle toast above mic) */}
          {statusNotice && (
            <div className="flex justify-center mb-1 shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                  statusNotice.type === "error"
                    ? "bg-rose-500/10 border-rose-500/25 text-rose-300"
                    : statusNotice.type === "warning"
                    ? "bg-amber-500/10 border-amber-500/25 text-amber-300"
                    : "bg-white/[0.05] border-white/[0.1] text-slate-300"
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{statusNotice.message}</span>
              </div>
            </div>
          )}

          {/* 4. STATIONARY VOICE INTERACTION: Bottom Center Microphone */}
          <div className="pt-2 pb-1 flex flex-col items-center shrink-0">
            <MicButton
              turnState={turnState}
              durationSeconds={durationSeconds}
              onClick={handleToggleMic}
              langName={personALangObj.name}
            />
          </div>

        </main>
      ) : (
        /* QUICK CARDS VIEW */
        <main className="w-full flex-1 flex flex-col justify-start">
          <QuickCards
            cards={quickCards}
            sourceLang={personALang}
            targetLang={personBLang}
            onSelectPhrase={handleQuickPhrase}
            isLoading={turnState !== "IDLE"}
          />
        </main>
      )}

      {/* Minimal Bottom Baseline */}
      <footer className="py-2 px-4 text-center text-[11px] text-slate-600 shrink-0">
        Bhasha • Speech Translator
      </footer>

    </div>
  );
}
