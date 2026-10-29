import React from "react";
import { Volume2 } from "lucide-react";
import { getLanguage } from "../constants/languages";

export default function QuickCards({ cards, targetLang, onSelectPhrase, isLoading }) {
  const langObj = getLanguage(targetLang);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-slate-300">
        Tap any common phrase to speak it in <strong>{langObj.name}</strong>.
      </div>

      {cards.map((category) => (
        <div key={category.id} className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {category.phrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPhrase(phrase.hi)}
                disabled={isLoading}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between transition active:scale-[0.99]"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200">{phrase.hi}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{phrase.label}</p>
                </div>
                <div className="p-1.5 rounded-md bg-slate-800 text-slate-400">
                  <Volume2 className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
