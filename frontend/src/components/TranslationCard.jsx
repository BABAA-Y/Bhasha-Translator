import React from "react";
import { Volume2 } from "lucide-react";

export default function TranslationCard({
  speakerName,
  originalText,
  translatedText,
  audioUrl,
  onPlayAudio,
  placeholder,
}) {
  if (!translatedText) {
    return (
      <div className="text-center py-4 px-2">
        <p className="text-xs text-slate-500">{placeholder}</p>
      </div>
    );
  }

  return (
    <div className="text-center py-2 px-3">
      {speakerName && (
        <p className="text-[11px] text-slate-400 font-medium mb-1">
          {speakerName} said:
        </p>
      )}

      <div className="flex items-center justify-center gap-2">
        <h2 className="text-lg font-bold text-white tracking-wide">
          "{translatedText}"
        </h2>
        {audioUrl && (
          <button
            onClick={() => onPlayAudio(audioUrl)}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-slate-700 transition"
            title="Replay Voice"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {originalText && (
        <p className="text-xs text-slate-400 mt-1 italic">
          ({originalText})
        </p>
      )}
    </div>
  );
}
