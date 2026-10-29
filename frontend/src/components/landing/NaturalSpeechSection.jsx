import React from "react";
import VoiceEnergyStream from "./VoiceEnergyStream";

export default function NaturalSpeechSection() {
  return (
    <section id="how-it-works" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Layout: Feature LEFT, Information RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Continuous Voice Energy Stream (Feature) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <VoiceEnergyStream />
          </div>

          {/* RIGHT: Clean Information Storytelling */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#94A3B8] uppercase block">
              Voice Intelligence
            </span>

            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              People don't speak like textbooks.
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              In everyday conversations across India, people mix languages mid-sentence, use colloquial slang, hesitation sounds, and local terms. Bhasha transforms raw audio into clear, natural intent.
            </p>

            {/* Lightweight Supporting Details (Whitespace + Dividers, NO CARDS) */}
            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Code-Switching
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Handles fast Hindi paired with English loanwords (Hinglish) without tripping.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Acoustic Robustness
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strips out background auto horns, street noise, and fans before speech processing.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Sovereign Accents
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Native speech models trained specifically on Indian voice intonations.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
