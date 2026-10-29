import React, { useState } from "react";
import { Volume2, Info } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function CameraTranslatorSection() {
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayVoice = () => {
    setIsPlayingAudio(true);
    soundFx.playNaturalBhashaSound("शुद्ध शाकाहारी भोजन उपलब्ध है");
    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  return (
    <section id="camera" className="py-28 relative">
      
      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-[#06B6D4]/06 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Phone Camera Scanner Viewfinder */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            
            <div className="relative w-full max-w-[340px] rounded-[40px] bg-[#0A0F1D]/90 border border-white/10 p-3 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
              
              {/* Dynamic Notch */}
              <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3 border border-white/5" />

              {/* Viewfinder Screen */}
              <div className="relative h-[460px] rounded-[30px] bg-slate-950 overflow-hidden border border-white/10 flex flex-col justify-between p-4">
                
                {/* Background Street Scene Simulation */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-950/90 to-slate-950 z-0" />
                
                {/* Detected Kannada Signboard */}
                <div className="relative z-10 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 mt-4">
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">
                    Street Signboard (Bengaluru)
                  </div>
                  <div className="text-xl font-bold text-amber-100 font-indic">
                    "ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಊಟ ಲಭ್ಯವಿದೆ"
                  </div>
                </div>

                {/* Laser Scanning Focus Box */}
                <div className="relative z-10 my-auto">
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent shadow-[0_0_15px_#06B6D4] animate-pulse" />
                  <div className="border border-dashed border-[#06B6D4]/40 rounded-2xl h-20 mt-2 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-[#06B6D4]">
                      Indic Optical OCR
                    </span>
                  </div>
                </div>

                {/* Live Real-Time Translation Overlay */}
                <div className="relative z-10 p-4 rounded-2xl bg-slate-900/95 border border-[#10B981]/40 backdrop-blur-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#10B981] font-bold uppercase tracking-wider">
                      Hindi Translation
                    </span>
                    <button
                      type="button"
                      onClick={handlePlayVoice}
                      className="text-[10px] font-mono text-[#10B981] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Volume2 className={`w-3 h-3 ${isPlayingAudio ? "animate-pulse" : ""}`} />
                      <span>{isPlayingAudio ? "Speaking..." : "Read Aloud"}</span>
                    </button>
                  </div>

                  <p className="text-base font-bold text-white font-indic">
                    "शुद्ध शाकाहारी भोजन उपलब्ध है"
                  </p>
                  
                  {showExplanation ? (
                    <div className="mt-2 pt-2 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
                      💡 Traditional South Indian pure-vegetarian meals (Oota / Thali with rice, sambar, rasam, curd).
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowExplanation(true)}
                      className="text-[10px] font-mono text-[#06B6D4] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <Info className="w-3 h-3" />
                      <span>Explain cultural context</span>
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT: Editorial Information */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#06B6D4] uppercase block">
              Visual Script OCR
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              Point. Scan. <br />
              <span className="text-slate-300">Understand instantly.</span>
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              When traveling across Indian states, road signs, restaurant menu cards, railway platform posters, and hospital directions are often written in regional scripts you may not read. Bhasha deciphers authentic Indian scripts in real time.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  12+ Indian Scripts Recognized
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Devanagari, Tamil, Kannada, Telugu, Bengali, Malayalam, and Gurmukhi handled across low light and aged boards.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Culinary & Cultural Context
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Doesn't just swap words—explains regional dishes, temple customs, and municipal transit instructions.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Instant Voice Read-Out
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tap once to have Gnani Timbre synthesize the translated text aloud in your own mother tongue.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
