import React from "react";
import { Sparkles } from "lucide-react";

const INDIC_FRAGMENTS = [
  { text: "नमस्ते", lang: "Hindi", x: "10%", y: "15%", delay: "0s" },
  { text: "வணக்கம்", lang: "Tamil", x: "65%", y: "20%", delay: "1.2s" },
  { text: "নমস্কার", lang: "Bengali", x: "25%", y: "50%", delay: "2.4s" },
  { text: "నమస్కారం", lang: "Telugu", x: "72%", y: "55%", delay: "0.8s" },
  { text: "ನಮಸ್ಕಾರ", lang: "Kannada", x: "15%", y: "80%", delay: "1.8s" },
  { text: "નમસ્તે", lang: "Gujarati", x: "60%", y: "82%", delay: "2.8s" },
];

export default function AtmosphericLanguageVisual() {
  return (
    <div className="relative w-full flex flex-col justify-between py-4 select-none">
      
      {/* Brand Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
          <div className="w-5 h-5 rounded-lg bg-[#FF9933] flex items-center justify-center font-bold text-slate-950 text-xs font-indic">
            भा
          </div>
          <span className="text-xs font-bold tracking-widest text-white font-display">
            BHASHA
          </span>
          <span className="w-1 h-1 rounded-full bg-[#06B6D4]" />
          <span className="text-[11px] text-slate-400 font-medium">Neural Voice Bridge</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-tight font-display">
          India speaks differently. <br />
          <span className="text-slate-400 font-normal">
            Bhasha understands naturally.
          </span>
        </h1>

        <p className="text-sm text-slate-400 max-w-md leading-relaxed font-normal">
          Real-time voice-to-voice intelligence engineered for the vernacular cadence, 
          colloquial street slang, and soul of Indian conversation.
        </p>
      </div>

      {/* Floating Indic Language Constellation */}
      <div className="relative w-full h-[240px] lg:h-[280px] my-4 rounded-3xl bg-white/[0.015] border border-white/[0.05] overflow-hidden backdrop-blur-xs">
        {/* Soft Ambient Radial Accents */}
        <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-[#FF9933]/08 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-44 h-44 bg-[#06B6D4]/07 rounded-full blur-3xl pointer-events-none" />

        {/* Faint Connecting Grid / Acoustic Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 stroke-white/10" fill="none">
          <path d="M 50 50 Q 200 120 400 60" strokeDasharray="3 3" />
          <path d="M 80 200 Q 250 140 380 220" strokeDasharray="3 3" />
          <path d="M 120 70 L 280 210" strokeDasharray="2 4" />
        </svg>

        {/* Floating Language Fragments */}
        {INDIC_FRAGMENTS.map((item, idx) => (
          <div
            key={idx}
            className="absolute transition-all duration-700 hover:scale-105"
            style={{
              left: item.x,
              top: item.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0F1D]/80 border border-white/[0.08] hover:border-[#FF9933]/40 shadow-lg shadow-black/30 backdrop-blur-md transition-all duration-300 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]/70 group-hover:bg-[#FF9933] transition-colors" />
              <span className="font-indic text-sm font-semibold text-white tracking-wide">
                {item.text}
              </span>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                {item.lang}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sovereign Infrastructure Trust Line */}
      <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
        <span>22 Official Scheduled Languages</span>
        <span>•</span>
        <span>Ultra-Low Latency Speech</span>
      </div>

    </div>
  );
}
