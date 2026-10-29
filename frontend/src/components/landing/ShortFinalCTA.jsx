import React from "react";
import { Mic, ArrowRight } from "lucide-react";

export default function ShortFinalCTA({ onOpenDemo }) {
  const languages = [
    "Hindi", "Tamil", "Bengali", "Telugu", 
    "Marathi", "Kannada", "Malayalam", "Gujarati"
  ];

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden text-center select-none bg-transparent reveal-on-scroll">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9933]/07 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 space-y-7">
        
        {/* Large Statement */}
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.02] font-display">
          Speak naturally. <br />
          <span className="text-slate-300">Be understood.</span>
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-lg mx-auto leading-relaxed">
          Experience real-time voice translation across India's languages.
        </p>

        {/* Primary CTA */}
        <div className="pt-2 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={onOpenDemo}
            className="btn-tactile px-10 py-5 rounded-2xl text-base font-extrabold text-slate-950 flex items-center gap-3 active:scale-95 transition cursor-pointer shadow-2xl shadow-[#FF9933]/25 hover:scale-105"
          >
            <Mic className="w-5 h-5 text-slate-950" />
            <span>TRY BHASHA</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          {/* Subtle Language List Below CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm text-slate-400 font-medium">
            {languages.map((lang, idx) => (
              <React.Fragment key={lang}>
                <span>{lang}</span>
                {idx < languages.length - 1 && <span className="text-slate-600">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
