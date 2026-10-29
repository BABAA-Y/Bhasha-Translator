import React from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

export default function MicButton({
  isRecording,
  isLoading,
  onPressStart,
  onPressEnd,
  label,
  colorScheme = "indigo", // "indigo" or "emerald"
}) {
  const bgClass =
    colorScheme === "emerald"
      ? isRecording
        ? "bg-rose-500 ring-4 ring-rose-500/30"
        : "bg-emerald-600 hover:bg-emerald-500"
      : isRecording
      ? "bg-rose-500 ring-4 ring-rose-500/30"
      : "bg-indigo-600 hover:bg-indigo-500";

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onMouseDown={onPressStart}
        onMouseUp={onPressEnd}
        onTouchStart={onPressStart}
        onTouchEnd={onPressEnd}
        disabled={isLoading}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-all ${bgClass}`}
      >
        {isLoading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : isRecording ? (
          <MicOff className="w-6 h-6 animate-pulse" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </button>

      <span className="text-[11px] text-slate-400 mt-1.5 font-medium">
        {isRecording ? "Listening..." : label || "Hold to Speak"}
      </span>
    </div>
  );
}
