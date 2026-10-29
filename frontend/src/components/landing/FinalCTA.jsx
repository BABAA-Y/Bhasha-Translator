import React from "react";
import { Mic, ArrowRight } from "lucide-react";

export default function FinalCTA({ onOpenDemo }) {
  return (
    <section className="py-32 relative overflow-hidden text-center select-none">
      
      {/* Background subtle atmospheric aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF9933]/08 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] uppercase block mb-4">
          The Great Indian AI Challenge
        </span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
          Speak. Understand. <br />
          <span className="text-slate-300">Connect across India.</span>
        </h2>

        <p className="text-base sm:text-xl text-slate-400 mt-6 max-w-xl mx-auto leading-relaxed">
          Experience real-time voice translation built for the cadence, slang, and soul of Indian conversation.
        </p>

        {/* Tactile Physical CTA Button */}
        <div className="mt-10 flex flex-col items-center justify-center">
          
          <button
            onClick={onOpenDemo}
            className="btn-tactile px-9 py-4 rounded-2xl text-sm font-bold text-slate-950 flex items-center gap-2.5 active:scale-95 transition cursor-pointer"
          >
            <Mic className="w-4 h-4 text-slate-950" />
            <span>Try Live Voice Demo</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <p className="text-xs text-slate-500 font-mono mt-5">
            Powered by Gnani.ai Prisma STT & Timbre v3 Neural TTS
          </p>
        </div>

      </div>

    </section>
  );
}
