import React from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

function formatDuration(sec = 0) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function MicButton({
  turnState = "IDLE", // "IDLE" | "RECORDING" | "STOPPING" | "PROCESSING" | "RESULT" | "ERROR"
  durationSeconds = 0,
  onClick,
  langName = "Hindi",
}) {
  const isRecording = turnState === "RECORDING";
  const isBusy = turnState === "PROCESSING" || turnState === "STOPPING";

  let labelText = `Tap to speak in ${langName}`;
  if (isRecording) {
    labelText = `Listening… ${formatDuration(durationSeconds)}`;
  } else if (isBusy) {
    labelText = "Processing…";
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isBusy && onClick) {
        onClick();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center select-none py-2">
      <div className="relative flex items-center justify-center">
        {/* Subtle audio activity indicator while recording */}
        {isRecording && (
          <div className="absolute -inset-2.5 rounded-full border border-rose-500/35 animate-ping pointer-events-none" />
        )}

        {/* The Microphone Button */}
        <button
          type="button"
          onClick={onClick}
          onKeyDown={handleKeyDown}
          disabled={isBusy}
          aria-label={labelText}
          aria-pressed={isRecording}
          className={`relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933] ${
            isRecording
              ? "bg-rose-500 text-white shadow-rose-500/25 ring-4 ring-rose-500/20"
              : isBusy
              ? "bg-slate-800 text-[#FF9933] border border-white/10 opacity-80 cursor-wait"
              : "bg-[#FF9933] hover:bg-[#FFAE5C] text-slate-950 shadow-[#FF9933]/20"
          }`}
        >
          {isBusy ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#FF9933]" />
          ) : isRecording ? (
            <MicOff className="w-6 h-6 animate-pulse" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Subtle State Waveform when recording */}
      {isRecording && (
        <div className="flex items-center gap-1 mt-3 h-4" aria-hidden="true">
          <span className="w-1 bg-rose-400 rounded-full wave-bar-1" />
          <span className="w-1 bg-rose-400 rounded-full wave-bar-3" />
          <span className="w-1 bg-rose-400 rounded-full wave-bar-2" />
          <span className="w-1 bg-rose-400 rounded-full wave-bar-5" />
          <span className="w-1 bg-rose-400 rounded-full wave-bar-4" />
        </div>
      )}

      {/* Clear, simple status text */}
      <p
        className={`text-xs sm:text-sm mt-2.5 font-medium transition-colors ${
          isRecording
            ? "text-rose-400 font-mono tracking-wide"
            : isBusy
            ? "text-slate-400"
            : "text-slate-400"
        }`}
      >
        {labelText}
      </p>
    </div>
  );
}
