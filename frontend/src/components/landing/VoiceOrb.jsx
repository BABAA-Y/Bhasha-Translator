import React from "react";

export default function VoiceOrb({ state = "idle", onClick }) {
  return (
    <div 
      onClick={onClick}
      className="relative flex items-center justify-center w-56 h-56 cursor-pointer select-none group"
    >
      {/* Outer subtle glow */}
      <div 
        className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
          state === "listening"
            ? "bg-emerald-500/25 scale-110"
            : state === "processing"
            ? "bg-cyan-500/25 animate-pulse"
            : state === "speaking"
            ? "bg-[#FF9933]/30 scale-115"
            : "bg-[#FF9933]/15 group-hover:bg-[#FF9933]/25"
        }`} 
      />

      {/* Outer Pulse Ring */}
      <div 
        className={`absolute inset-4 rounded-full border border-white/10 transition-all duration-500 ${
          state === "listening"
            ? "border-emerald-500/50 scale-105 animate-ping"
            : state === "speaking"
            ? "border-[#FF9933]/50 scale-105 animate-pulse"
            : "group-hover:border-white/20"
        }`}
      />

      {/* Middle Orbit Ring */}
      <div 
        className={`absolute inset-10 rounded-full border border-dashed transition-all duration-700 ${
          state === "listening"
            ? "border-emerald-400/40 animate-spin"
            : state === "processing"
            ? "border-cyan-400/50 animate-spin"
            : "border-white/10"
        }`}
        style={{ animationDuration: "12s" }}
      />

      {/* Core Glowing Sphere */}
      <div 
        className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          state === "listening"
            ? "bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-emerald-500/30 scale-110"
            : state === "processing"
            ? "bg-gradient-to-tr from-cyan-600 to-blue-500 shadow-cyan-500/30 animate-pulse"
            : state === "speaking"
            ? "bg-gradient-to-tr from-[#FF9933] to-amber-400 shadow-[#FF9933]/40 scale-110"
            : "bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/20 shadow-black/60 group-hover:scale-105"
        }`}
      >
        {/* Core glyph */}
        <span className="text-xl font-bold text-white font-mono">
          {state === "listening" ? "🎙" : state === "speaking" ? "🔊" : "भा"}
        </span>
      </div>

      {/* Bottom State Pill */}
      <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-slate-900/90 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-slate-300">
        Status: <span className="text-white font-semibold">{state}</span>
      </div>
    </div>
  );
}
