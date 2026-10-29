import React, { useState } from "react";
import { Volume2, SlidersHorizontal, Sparkles, ArrowRight } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function MeaningContextSection() {
  const [sliderPos, setSliderPos] = useState(70); // 0 = 100% literal, 100 = 100% Bhasha
  const [isPlayingLiteral, setIsPlayingLiteral] = useState(false);
  const [isPlayingBhasha, setIsPlayingBhasha] = useState(false);

  const handlePlayLiteral = () => {
    setIsPlayingLiteral(true);
    soundFx.playLiteralRobotSound("Brother, will you walk by the instrument?");
    setTimeout(() => setIsPlayingLiteral(false), 2400);
  };

  const handlePlayBhasha = () => {
    setIsPlayingBhasha(true);
    soundFx.playNaturalBhashaSound("அண்ணா, மீட்டருக்கு வருவீங்களா?");
    setTimeout(() => setIsPlayingBhasha(false), 2400);
  };

  return (
    <section id="meaning" className="py-28 relative">
      
      {/* Open Atmosphere Illumination */}
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-[#10B981]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout: Info LEFT, Feature RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Information & Storytelling */}
          <div className="lg:col-span-5 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#94A3B8] uppercase block">
              Semantic Intelligence
            </span>

            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              Translation isn't about words. <br />
              <span className="text-slate-300">It's about meaning.</span>
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              Standard AI translates words literally. Bhasha resolves the real-world Indian intent—understanding street idioms, cultural respect, and contextual colloquialisms before generating voice.
            </p>

            {/* Floating Input Specimen */}
            <div className="pt-2 space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Live Spoken Specimen
              </span>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-[#FF9933] font-bold">Hindi Audio Input</span>
                  <span className="text-slate-500">Auto Stand, Connaught Place</span>
                </div>
                <div className="text-lg font-bold text-white">
                  "भैया मीटर से चलोगे क्या?"
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  Phonetic: Bhaiya meter se chaloge kya?
                </div>
              </div>

              {/* Context Breakdown Tags in Open Space */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  CONTEXT: STREET MOBILITY
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                  INTENT: HIRE REQUEST
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/20 text-[#10B981]">
                  TARGET: STREET TAMIL
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: Floating Split Sound Prism Experience (No Heavy Outer Card) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Prism Balance Control Slider Floating in Space */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#FF9933]" />
                <span className="text-xs font-mono text-slate-400">
                  Prism Mode: <strong className="text-white">{sliderPos < 50 ? "Literal Focus" : "Bhasha Natural Focus"}</strong>
                </span>
              </div>

              <div className="w-full sm:w-60 flex items-center gap-3">
                <span className="text-[10px] font-mono text-rose-400">Literal</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-[#FF9933] cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                />
                <span className="text-[10px] font-mono text-[#10B981]">Bhasha</span>
              </div>
            </div>

            {/* Two Open Comparative Pods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* POD 1: Literal Machine Output */}
              <div
                className={`p-6 rounded-2xl transition-all duration-300 border flex flex-col justify-between ${
                  sliderPos < 50
                    ? "bg-rose-950/20 border-rose-500/40 shadow-xl shadow-rose-950/30 scale-[1.01]"
                    : "bg-white/[0.02] border-white/[0.06] opacity-75 hover:opacity-100"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
                      Standard AI Translation
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-950/40 text-rose-300 border border-rose-500/20">
                      Literal
                    </span>
                  </div>

                  <div className="text-base sm:text-lg font-mono font-bold text-slate-200 leading-snug">
                    "Brother, will you walk by the instrument?"
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Fault: Misinterprets "meter" as a laboratory device and "chaloge" as literal human walking.
                  </p>

                  {/* Mechanical Waveform */}
                  <div className="h-6 flex items-center gap-1 pt-1">
                    <span className="w-1.5 h-2 bg-rose-400/40 rounded-none" />
                    <span className="w-1.5 h-5 bg-rose-400/50 rounded-none" />
                    <span className="w-1.5 h-2 bg-rose-400/40 rounded-none" />
                    <span className="w-1.5 h-5 bg-rose-400/50 rounded-none" />
                    <span className="w-1.5 h-2 bg-rose-400/40 rounded-none" />
                    <span className="text-[10px] font-mono text-rose-400/70 ml-2">Mechanical drone</span>
                  </div>
                </div>

                <div className="pt-5">
                  <button
                    onClick={handlePlayLiteral}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 border transition ${
                      isPlayingLiteral
                        ? "bg-rose-900/60 text-white border-rose-500"
                        : "bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 border-white/10"
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingLiteral ? "animate-pulse" : ""}`} />
                    <span>{isPlayingLiteral ? "Playing Robotic Sound..." : "▶ Hear Literal"}</span>
                  </button>
                </div>
              </div>

              {/* POD 2: Bhasha Natural Tamil Translation */}
              <div
                className={`p-6 rounded-2xl transition-all duration-300 border flex flex-col justify-between ${
                  sliderPos >= 50
                    ? "bg-emerald-950/20 border-[#10B981]/50 shadow-xl shadow-emerald-950/30 scale-[1.01]"
                    : "bg-white/[0.02] border-white/[0.06] opacity-75 hover:opacity-100"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981]">
                      Bhasha Indic Intelligence
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-[#10B981] border border-[#10B981]/30">
                      Sovereign
                    </span>
                  </div>

                  <div className="text-lg sm:text-xl font-bold text-white leading-snug">
                    "அண்ணா, மீட்டருக்கு வருவீங்களா?"
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Respectful street Tamil (<span className="text-slate-300 italic">"Anna, meter-ku varuveengala?"</span>) instantly recognized by auto drivers.
                  </p>

                  {/* Resonant Waveform */}
                  <div className="h-6 flex items-center gap-1 pt-1">
                    <span className="w-1 bg-[#10B981] rounded-full animate-wave-1" />
                    <span className="w-1 bg-[#10B981] rounded-full animate-wave-2" />
                    <span className="w-1 bg-[#FF9933] rounded-full animate-wave-3" />
                    <span className="w-1 bg-[#FF9933] rounded-full animate-wave-4" />
                    <span className="w-1 bg-[#10B981] rounded-full animate-wave-5" />
                    <span className="text-[10px] font-mono text-[#10B981] ml-2 font-bold">Natural resonance</span>
                  </div>
                </div>

                <div className="pt-5">
                  <button
                    onClick={handlePlayBhasha}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 border transition ${
                      isPlayingBhasha
                        ? "bg-[#10B981] text-slate-950 border-[#10B981] shadow-lg shadow-[#10B981]/25"
                        : "bg-gradient-to-r from-[#FF9933]/20 to-[#10B981]/20 hover:from-[#FF9933]/30 hover:to-[#10B981]/30 text-white border-[#FF9933]/40"
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isPlayingBhasha ? "animate-bounce" : ""}`} />
                    <span>{isPlayingBhasha ? "Speaking Natural Voice..." : "▶ Hear Bhasha"}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
