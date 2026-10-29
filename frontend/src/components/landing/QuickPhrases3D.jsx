import React, { useState } from "react";
import { Volume2, Car, Stethoscope, Coffee, Train, ShoppingBag, Compass } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function QuickPhrases3D() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  const soundDeckCategories = [
    {
      id: "auto",
      label: "Auto",
      icon: Car,
      color: "text-amber-400 border-amber-400/40 bg-amber-500/10",
      activeBg: "shadow-[0_0_30px_rgba(251,191,36,0.35)] border-amber-400 text-amber-400",
      phraseHi: "भैया, मीटर से चलोगे?",
      phrasePhonetic: "Bhaiya, meter se chaloge?",
      targetTa: "அண்ணா, மீட்டருக்கு வருவீங்களா?",
      context: "Bengaluru / Chennai Transit",
    },
    {
      id: "hospital",
      label: "Hospital",
      icon: Stethoscope,
      color: "text-rose-400 border-rose-400/40 bg-rose-500/10",
      activeBg: "shadow-[0_0_30px_rgba(244,63,94,0.35)] border-rose-400 text-rose-400",
      phraseHi: "यह दवाई दिन में कब लेनी है?",
      phrasePhonetic: "Yeh dawai din me kab leni hai?",
      targetTa: "இந்த மருந்தை எப்போது சாப்பிட வேண்டும்?",
      context: "Clinical OPD Consultation",
    },
    {
      id: "chai",
      label: "Chai Stall",
      icon: Coffee,
      color: "text-[#FF9933] border-[#FF9933]/40 bg-[#FF9933]/10",
      activeBg: "shadow-[0_0_30px_rgba(255,153,51,0.35)] border-[#FF9933] text-[#FF9933]",
      phraseHi: "एक कड़क चाय और पानी देना।",
      phrasePhonetic: "Ek kadak chai aur paani dena.",
      targetTa: "ஒரு ஸ்ட்ராங் டீயும் தண்ணீரும் கொடுங்கள்.",
      context: "Local Daily Refreshment",
    },
    {
      id: "railway",
      label: "Railway",
      icon: Train,
      color: "text-[#06B6D4] border-[#06B6D4]/40 bg-[#06B6D4]/10",
      activeBg: "shadow-[0_0_30px_rgba(6,182,212,0.35)] border-[#06B6D4] text-[#06B6D4]",
      phraseHi: "प्लेटफॉर्म 4 किस तरफ है?",
      phrasePhonetic: "Platform 4 kis taraf hai?",
      targetTa: "பிளாட்பார்ம் 4 எந்தப் பக்கம் போகணும்?",
      context: "Crowded Railway Station",
    },
    {
      id: "market",
      label: "Market",
      icon: ShoppingBag,
      color: "text-[#10B981] border-[#10B981]/40 bg-[#10B981]/10",
      activeBg: "shadow-[0_0_30px_rgba(16,185,129,0.35)] border-[#10B981] text-[#10B981]",
      phraseHi: "भैया, कुल कितना रुपया हुआ?",
      phrasePhonetic: "Bhaiya, kul kitna rupaya hua?",
      targetTa: "மொத்தம் எவ்வளவு ஆச்சுங்க?",
      context: "Kirana / Bazaar Billing",
    },
    {
      id: "directions",
      label: "Directions",
      icon: Compass,
      color: "text-indigo-400 border-indigo-400/40 bg-indigo-500/10",
      activeBg: "shadow-[0_0_30px_rgba(129,140,248,0.35)] border-indigo-400 text-indigo-400",
      phraseHi: "यहाँ आगे बाईं तरफ रोक दो।",
      phrasePhonetic: "Yahan aage baayein taraf rok do.",
      targetTa: "இங்கே இடதுபுறம் நிறுத்துங்கள்.",
      context: "Street Drop-off",
    },
  ];

  const current = soundDeckCategories[selectedIdx];

  const handlePlayPhrase = () => {
    setIsPlayingAudio(true);
    setShowRipple(true);
    soundFx.playNaturalBhashaSound(current.targetTa);

    setTimeout(() => {
      setShowRipple(false);
    }, 1200);

    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2400);
  };

  return (
    <section id="sound-deck" className="py-28 relative select-none">
      
      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FF9933]/08 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Expanding Ripple */}
      {showRipple && (
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-[#FF9933]/25 animate-ping pointer-events-none z-0" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Radial Desi Sound Deck */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-center justify-center space-y-8">
            
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* Outer Dashed Orbit */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
              <div className="absolute inset-8 rounded-full border border-white/[0.05]" />

              {/* Center Trigger Core */}
              <button
                type="button"
                onClick={handlePlayPhrase}
                className={`relative z-20 w-24 h-24 rounded-full bg-slate-950 border-2 flex flex-col items-center justify-center transition-all duration-300 shadow-2xl active:scale-95 cursor-pointer ${
                  isPlayingAudio
                    ? "border-[#10B981] shadow-[0_0_35px_rgba(16,185,129,0.5)] scale-110"
                    : "border-[#FF9933] hover:border-white shadow-[0_0_30px_rgba(255,153,51,0.25)] hover:scale-105"
                }`}
              >
                <Volume2 className={`w-6 h-6 mb-1 ${isPlayingAudio ? "text-[#10B981] animate-bounce" : "text-[#FF9933]"}`} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                  {isPlayingAudio ? "Speaking" : "Play Phrase"}
                </span>
              </button>

              {/* Orbiting Station Nodes */}
              {soundDeckCategories.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = selectedIdx === idx;

                const angle = (idx * (360 / soundDeckCategories.length) - 90) * (Math.PI / 180);
                const radius = 115;
                const x = Math.round(radius * Math.cos(angle));
                const y = Math.round(radius * Math.sin(angle));

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      setSelectedIdx(idx);
                      soundFx.playRipplePulse();
                    }}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${
                      isSelected
                        ? `bg-slate-900 border-2 ${item.activeBg} scale-125 z-30`
                        : "bg-slate-900/80 border border-white/10 hover:border-white/30 hover:scale-110 opacity-70 hover:opacity-100"
                    }`}
                    title={item.label}
                    aria-label={`Select ${item.label} station`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}

            </div>

            {/* Selected Phrase Output Floating Cleanly */}
            <div className="w-full max-w-md p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#FF9933] uppercase">
                  Station: {current.label}
                </span>
                <span className="text-slate-500 font-mono">
                  {current.context}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Selected Input</span>
                <div className="text-base font-semibold text-slate-200 font-indic">
                  {current.phraseHi}
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#10B981] uppercase font-bold block">
                  Target Spoken Output (Tamil)
                </span>
                <div className="text-lg font-bold text-white font-indic mt-0.5">
                  "{current.targetTa}"
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Editorial Information */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] uppercase block">
              Situational Sound Deck
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              When you don't want to talk into your phone.
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              In noisy metro stations, chaotic bazaars, or quiet clinic corridors, speaking aloud into a microphone is awkward or ineffective. The Sound Deck triggers instant, localized spoken phrases with one tap.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  One-Tap Immediate Execution
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bypasses speech recognition latency entirely for frequent transit, billing, and health phrases.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Zero Typing or Setup
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Radial layout mapped to natural thumb reach for rapid street mobility.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Pre-Cached Sovereign Audio
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Audio buffers stored locally, ready to speak without any active cell connection.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
