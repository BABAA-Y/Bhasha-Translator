import React from "react";
import { ChevronDown } from "lucide-react";
import { LANGUAGES } from "../constants/languages";

export default function LanguageSelector({
  value,
  onChange,
  label,
  align = "left",
  disabled = false,
}) {
  const isRight = align === "right";

  return (
    <div className={`flex flex-col gap-1 ${isRight ? "items-end" : "items-start"}`}>
      {label && (
        <span className="text-xs font-semibold text-slate-400">
          {label}
        </span>
      )}

      <div className="relative inline-flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-label={label || "Select language"}
          className="appearance-none bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.1] hover:border-white/[0.2] text-white font-medium text-xs sm:text-sm rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF9933] transition cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {LANGUAGES.map((l) => (
            <option
              key={l.code}
              value={l.code}
              className="bg-[#0A0F1D] text-white py-1"
            >
              {l.name} ({l.native})
            </option>
          ))}
        </select>

        <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2.5" />
      </div>
    </div>
  );
}
