import React, { useState } from "react";
import { Mic, Volume2, ArrowDown, Sparkles } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function FloatingVoiceHUD({ onOpenFullApp }) {
  const [hudState, setHudState] = useState("idle"); // 'idle', 'listening', 'processing', 'speaking'
  const [scenarioIdx, setScenarioIdx] = useState(0);

  const scenarios = [
    {
      hi: "भैया, यहाँ रोक देना।",
      hiPhonetic: "Bhaiya, yahan rok dena.",
      fromLang: "Hindi",
      ta: "அண்ணா, இங்கே நிறுத்துங்கள்.",
      taPhonetic: "Anna, ingē niruthungal.",
      toLang: "Tamil",
      tag: "Transit Request",
    },
    {
      hi: "मेरे सिर में बहुत तेज़ दर्द है।",
      hiPhonetic: "Mere sir me bahut tez dard hai.",
      fromLang: "Hindi",
      ta: "எனக்கு தலைவலி அதிகமாக இருக்கிறது.",
      taPhonetic: "Enakku thalaivali adhigamāga irukkiradhu.",
      toLang: "Tamil",
      tag: "Medical OPD",
    },
    {
      hi: "भैया, कुल कितना रुपया हुआ?",
      hiPhonetic: "Bhaiya, kul kitna rupaya hua?",
      fromLang: "Hindi",
      ta: "மொத்தம் எவ்வளவு ஆச்சுங்க?",
      taPhonetic: "Motham evvalavu aachunga?",
      toLang: "Tamil",
      tag: "Bazaar Payment",
    },
  ];

  const current = scenarios[scenarioIdx];

  const handleSimulate = () => {
    setHudState("listening");
    soundFx.playRipplePulse();

    setTimeout(() => {
      setHudState("processing");
      setTimeout(() => {
        setHudState("speaking");
        soundFx.playNaturalBhashaSound(current.ta);
        setTimeout(() => {
          setHudState("idle");
        }, 2200);
      }, 700);
    }, 1100);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setScenarioIdx((prev) => (prev + 1) % scenarios.length);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center select-none py-4">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. LIVING VOICE ORB (Floating directly in space, NO card)          */}
      {/* ------------------------------------------------------------------ */}
      <div 
        onClick={handleSimulate}
        className="relative flex items-center justify-center cursor-pointer mb-6 group"
        title="Click to trigger voice turn"
      >
        {/* Atmospheric Backlight */}
        <div 
          className={`absolute w-36 h-36 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
            hudState === "listening"
              ? "bg-emerald-500/35 scale-125"
              : hudState === "processing"
              ? "bg-cyan-500/30 animate-pulse"
              : hudState === "speaking"
              ? "bg-[#FF9933]/40 scale-130"
              : "bg-[#FF9933]/20 group-hover:bg-[#FF9933]/30"
          }`}
        />

        {/* Outer Orbital Pulse */}
        <div 
          className={`w-28 h-28 rounded-full border border-dashed transition-all duration-700 flex items-center justify-center ${
            hudState === "listening"
              ? "border-emerald-400/60 animate-spin"
              : hudState === "processing"
              ? "border-cyan-400/60 animate-spin"
              : hudState === "speaking"
              ? "border-[#FF9933]/60 scale-105"
              : "border-white/10 group-hover:border-white/20"
          }`}
          style={{ animationDuration: "14s" }}
        >
          {/* Inner Core */}
          <div 
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${
              hudState === "listening"
                ? "bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-emerald-500/50 scale-110"
                : hudState === "processing"
                ? "bg-gradient-to-tr from-cyan-600 to-blue-500 shadow-cyan-500/40 animate-pulse"
                : hudState === "speaking"
                ? "bg-gradient-to-tr from-[#FF9933] to-amber-400 shadow-[#FF9933]/50 scale-115"
                : "bg-slate-900 border border-white/15 shadow-black/80 group-hover:scale-105"
            }`}
          >
            {hudState === "listening" ? (
              <Mic className="w-6 h-6 animate-pulse" />
            ) : hudState === "speaking" ? (
              <Volume2 className="w-6 h-6 animate-bounce" />
            ) : (
              <span className="font-mono font-bold text-sm text-[#FF9933]">भा</span>
            )}
          </div>
        </div>

        {/* State Label Pill */}
        <div className="absolute -bottom-3 px-3 py-0.5 rounded-full bg-slate-900/80 border border-white/10 text-[9px] font-mono tracking-wider text-slate-300 backdrop-blur-md">
          {hudState === "idle" && "Click Orb to Speak"}
          {hudState === "listening" && "Listening to Voice..."}
          {hudState === "processing" && "Resolving Meaning..."}
          {hudState === "speaking" && "Speaking in Tamil..."}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. FLOATING CONVERSATION PODS (Floating directly over background)  */}
      {/* ------------------------------------------------------------------ */}
      <div className="w-full space-y-4 my-2">
        
        {/* Input Pod: Speaker A (Left Asymmetric Floating Pill) */}
        <div className="flex flex-col items-start max-w-[85%]">
          <span className="text-[10px] font-mono text-slate-400 mb-1 pl-2">
            Hindi • {current.tag}
          </span>
          <div className="glass-pill px-5 py-3 rounded-2xl rounded-tl-sm text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:border-white/20">
            "{current.hi}"
          </div>
        </div>

        {/* Luminous Connecting Vector */}
        <div className="flex items-center justify-center my-1">
          <div className="flex flex-col items-center gap-1 opacity-60">
            <span className="w-1 h-1 rounded-full bg-[#06B6D4]" />
            <span className="w-1 h-3 rounded-full bg-gradient-to-b from-[#06B6D4] to-[#FF9933]" />
            <span className="w-1 h-1 rounded-full bg-[#FF9933]" />
          </div>
        </div>

        {/* Output Pod: Speaker B (Right Asymmetric Floating Pill) */}
        <div className="flex flex-col items-end ml-auto max-w-[90%]">
          <span className="text-[10px] font-mono text-[#FF9933] mb-1 pr-2">
            Tamil Translation • Sovereign Voice
          </span>

          <div
            onClick={() => soundFx.playNaturalBhashaSound(current.ta)}
            className="group glass-pill px-5 py-3.5 rounded-2xl rounded-tr-sm text-base sm:text-lg font-bold text-white shadow-xl border-[#FF9933]/30 hover:border-[#FF9933]/60 cursor-pointer flex items-center gap-3 transition-all"
            title="Click to hear pronunciation"
          >
            <span>"{current.ta}"</span>
            <Volume2 className="w-4 h-4 text-[#FF9933] opacity-80 group-hover:opacity-100 shrink-0" />
          </div>

          <span className="text-[11px] font-mono text-slate-400 mt-1 pr-2 italic">
            {current.taPhonetic}
          </span>
        </div>

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. FLOATING MINIMAL WAVEFORM & SHORTCUT CONTROLS                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="w-full flex items-center justify-between pt-6 border-t border-white/[0.06] mt-4 text-xs">
        
        {/* Animated Waveform */}
        <div className="flex items-center gap-1 h-5">
          {hudState !== "idle" ? (
            <>
              <span className="w-0.5 bg-[#FF9933] rounded-full animate-wave-1"></span>
              <span className="w-0.5 bg-[#10B981] rounded-full animate-wave-2"></span>
              <span className="w-0.5 bg-[#06B6D4] rounded-full animate-wave-3"></span>
              <span className="w-0.5 bg-[#FF9933] rounded-full animate-wave-4"></span>
              <span className="w-0.5 bg-[#10B981] rounded-full animate-wave-5"></span>
              <span className="text-[10px] font-mono text-[#FF9933] ml-2">Audio stream active</span>
            </>
          ) : (
            <span className="text-[11px] font-mono text-slate-500">Audio ready</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleNext}
            className="text-[11px] font-mono text-slate-400 hover:text-white transition"
          >
            Next phrase →
          </button>

          <button
            onClick={onOpenFullApp}
            className="text-[11px] font-mono font-bold text-[#FF9933] hover:underline"
          >
            Full 2-Way App ↗
          </button>
        </div>

      </div>

    </div>
  );
}
