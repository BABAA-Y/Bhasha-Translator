import React, { useState } from "react";
import { Mic, Volume2, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function LiveTranslatorCard({ onOpenFullApp }) {
  const [hudState, setHudState] = useState("idle"); // 'idle', 'listening', 'processing', 'speaking'
  const [currentScenario, setCurrentScenario] = useState(0);

  const scenarios = [
    {
      fromLang: "Hindi",
      fromNative: "हिन्दी",
      toLang: "Tamil",
      toNative: "தமிழ்",
      speechText: "भैया, यहाँ रोक देना।",
      translatedText: "அண்ணா, இங்கே நிறுத்துங்கள்.",
      phonetic: "Anna, ingē niruthungal.",
      context: "Auto / Ride",
    },
    {
      fromLang: "Bengali",
      fromNative: "বাংলা",
      toLang: "Hindi",
      toNative: "हिन्दी",
      speechText: "আমার খুব মাথা ব্যথা করছে।",
      translatedText: "मेरे सिर में बहुत तेज़ दर्द हो रहा है।",
      phonetic: "Mere sir me bahut tez dard ho raha hai.",
      context: "Healthcare",
    },
    {
      fromLang: "Kannada",
      fromNative: "ಕನ್ನಡ",
      toLang: "Telugu",
      toNative: "తెలుగు",
      speechText: "ಇಲ್ಲಿಂದ ಮೆಟ್ರೋ ಎಷ್ಟು ದೂರ?",
      translatedText: "ఇక్కడి నుంచి మెట్రో ఎంత దూరం?",
      phonetic: "Ikkadi nunchi metro entha dooram?",
      context: "Transit",
    },
  ];

  const current = scenarios[currentScenario];

  const handleSimulateTurn = () => {
    setHudState("listening");
    soundFx.playRipplePulse();

    setTimeout(() => {
      setHudState("processing");
      setTimeout(() => {
        setHudState("speaking");
        soundFx.playNaturalBhashaSound(current.translatedText);
        setTimeout(() => {
          setHudState("idle");
        }, 2200);
      }, 700);
    }, 1100);
  };

  const handleCycleScenario = (e) => {
    e.stopPropagation();
    setCurrentScenario((prev) => (prev + 1) % scenarios.length);
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-5 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 hover:border-white/20">
      
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF9933]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#06B6D4]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Holographic Navigation Bar */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] relative z-10">
        
        {/* Living AI Mini Orb Status */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            {/* Fluid Mini Orb */}
            <div
              className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                hudState === "listening"
                  ? "bg-[#10B981] scale-125 shadow-[0_0_15px_#10B981]"
                  : hudState === "processing"
                  ? "bg-[#06B6D4] animate-pulse shadow-[0_0_15px_#06B6D4]"
                  : hudState === "speaking"
                  ? "bg-[#FF9933] scale-125 shadow-[0_0_15px_#FF9933]"
                  : "bg-slate-400/80 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
              }`}
            />
            {hudState === "listening" && (
              <span className="absolute w-6 h-6 rounded-full border border-[#10B981] animate-ping" />
            )}
            {hudState === "speaking" && (
              <span className="absolute w-6 h-6 rounded-full border border-[#FF9933] animate-ping" />
            )}
          </div>

          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-bold">
            {hudState === "idle" && "Vachana Ready"}
            {hudState === "listening" && "Listening..."}
            {hudState === "processing" && "Resolving Context..."}
            {hudState === "speaking" && "Synthesizing Speech"}
          </span>
        </div>

        {/* Category Pill with Switch */}
        <button
          onClick={handleCycleScenario}
          className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white flex items-center gap-1 transition"
        >
          <span>{current.context}</span>
          <ArrowRight className="w-2.5 h-2.5 text-[#FF9933]" />
        </button>
      </div>

      {/* Floating Chat Pods Area */}
      <div className="py-5 space-y-3 relative z-10">
        
        {/* Floating Input Pod (Person A) */}
        <div className="flex flex-col items-start max-w-[90%]">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#94A3B8] mb-1 pl-1">
            <span>{current.fromLang}</span>
            <span>•</span>
            <span className="text-slate-400">{current.fromNative}</span>
          </div>

          <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-xs sm:text-sm font-semibold text-white backdrop-blur-md shadow-sm transition-all">
            "{current.speechText}"
          </div>
        </div>

        {/* Dynamic Transition Flow Line */}
        <div className="flex items-center justify-center my-1">
          <div className="h-4 w-px bg-gradient-to-b from-white/10 via-[#06B6D4]/40 to-white/10" />
        </div>

        {/* Floating Output Pod (Person B - Translated) */}
        <div className="flex flex-col items-end ml-auto max-w-[92%]">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF9933] mb-1 pr-1">
            <span>{current.toLang}</span>
            <span>•</span>
            <span className="text-[#10B981]">{current.toNative}</span>
            {hudState === "speaking" && (
              <Volume2 className="w-3 h-3 text-[#FF9933] animate-pulse" />
            )}
          </div>

          <div
            onClick={() => soundFx.playNaturalBhashaSound(current.translatedText)}
            className="group px-4 py-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#FF9933]/15 to-[#06B6D4]/15 hover:from-[#FF9933]/25 hover:to-[#06B6D4]/25 border border-[#FF9933]/30 text-xs sm:text-sm font-bold text-white backdrop-blur-md shadow-md transition-all cursor-pointer flex items-center gap-2"
            title="Click to replay voice"
          >
            <span>"{current.translatedText}"</span>
            <Volume2 className="w-3.5 h-3.5 text-[#FF9933] shrink-0 opacity-80 group-hover:opacity-100 transition" />
          </div>

          <span className="text-[10px] font-mono text-[#94A3B8] pr-1 mt-1 italic">
            {current.phonetic}
          </span>
        </div>

      </div>

      {/* Holographic Controls Footer */}
      <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3 relative z-10">
        
        {/* Interactive Speech Simulation Pill */}
        <button
          onClick={handleSimulateTurn}
          disabled={hudState !== "idle"}
          className={`flex-1 py-2.5 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
            hudState === "listening"
              ? "bg-[#10B981] text-slate-950 shadow-[0_0_20px_#10B981]"
              : hudState === "processing"
              ? "bg-[#06B6D4] text-slate-950"
              : hudState === "speaking"
              ? "bg-[#FF9933] text-slate-950 shadow-[0_0_20px_#FF9933]"
              : "bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 hover:border-[#FF9933]/40"
          }`}
        >
          {hudState === "listening" ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
              <span>Listening to Voice...</span>
            </>
          ) : hudState === "processing" ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Resolving Context...</span>
            </>
          ) : hudState === "speaking" ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-bounce" />
              <span>Speaking in Tamil...</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>Simulate Voice Turn</span>
            </>
          )}
        </button>

        {/* Full App Launcher */}
        <button
          onClick={onOpenFullApp}
          className="py-2.5 px-4 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition"
        >
          Full App
        </button>

      </div>

    </div>
  );
}
