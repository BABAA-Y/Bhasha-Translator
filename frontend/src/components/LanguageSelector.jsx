import React from "react";
import { LANGUAGES, getLanguage } from "../constants/languages";

export default function LanguageSelector({ value, onChange, label }) {
  const currentLang = getLanguage(value);

  return (
    <div className="flex items-center gap-1.5">
      {label && <span className="text-[11px] text-slate-400">{label}:</span>}
      <span className="text-base">{currentLang.flag}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 text-slate-100 text-xs font-semibold rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native} ({l.name})
          </option>
        ))}
      </select>
    </div>
  );
}
