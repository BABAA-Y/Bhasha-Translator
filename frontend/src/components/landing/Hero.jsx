import React from "react";
import { Mic, ArrowRight } from "lucide-react";
import BhashaVoiceSphere from "./BhashaVoiceSphere";

export default function Hero({ onOpenDemo }) {
  return (
    <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-12 min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden">
      {/* Cinematic Deep Atmosphere */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-[#FF9933]/06 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-[#06B6D4]/05 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT: DOMINANT HEADLINE, PARAGRAPH & CTA (~45%)                           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[66px] font-extrabold tracking-tight text-white leading-[1.08] font-display">
              India speaks differently. <br />
              <span className="text-slate-300">Bhasha understands naturally.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed font-normal">
              Real-time voice-to-voice translation designed for the cadence, colloquial slang, and soul of Indian conversation.
            </p>

            {/* Clean Primary CTA — Always visible above fold */}
            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenDemo}
                className="btn-tactile px-8 py-4 rounded-2xl text-base font-bold text-slate-950 flex items-center gap-3 active:scale-95 transition cursor-pointer shadow-xl shadow-[#FF9933]/20 hover:scale-105"
              >
                <Mic className="w-5 h-5 text-slate-950" />
                <span>Try Live Demo</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT: 3D BHASHA VOICE SPHERE WITH INTEGRATED MULTILINGUAL SCRIPTS (~55%)   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 w-full flex justify-center items-center">
            <BhashaVoiceSphere />
          </div>

        </div>
      </div>
    </section>
  );
}
