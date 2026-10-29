import React, { useState } from "react";
import { Sparkles, Activity, Cpu, Languages, Volume2 } from "lucide-react";

export default function ContinuousAudioBeam() {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    {
      id: "listen",
      number: "01",
      title: "LISTEN",
      sublabel: "Raw Speech",
      desc: "Captures irregular noisy telephonic & street audio without clipping.",
      color: "from-cyan-400 to-cyan-500",
      glowColor: "rgba(6, 182, 212, 0.4)",
      waveformType: "noisy",
      positionPercent: 12,
      metrics: "16kHz Mono PCM",
    },
    {
      id: "understand",
      number: "02",
      title: "UNDERSTAND",
      sublabel: "Speech Intelligence",
      desc: "Prisma STT strips hesitations, identifies language boundaries in Hinglish.",
      color: "from-cyan-500 to-emerald-400",
      glowColor: "rgba(16, 185, 129, 0.4)",
      waveformType: "converging",
      positionPercent: 38,
      metrics: "Vachana v3 STT",
    },
    {
      id: "translate",
      number: "03",
      title: "TRANSLATE",
      sublabel: "Context + Meaning",
      desc: "Resolves colloquial intent, cultural honorifics (Anna, Bhaiya, Ji).",
      color: "from-emerald-400 to-[#FF9933]",
      glowColor: "rgba(255, 153, 51, 0.4)",
      waveformType: "structured",
      positionPercent: 65,
      metrics: "Indic Semantic Engine",
    },
    {
      id: "speak",
      number: "04",
      title: "SPEAK",
      sublabel: "Natural Voice",
      desc: "Timbre v3 synthesizes authentic human speech in local native dialect.",
      color: "from-[#FF9933] to-amber-300",
      glowColor: "rgba(251, 191, 36, 0.4)",
      waveformType: "smooth",
      positionPercent: 90,
      metrics: "Timbre v3.0 (Shivani)",
    },
  ];

  return (
    <div className="relative py-12 select-none">
      
      {/* ============================================================ */}
      {/* CONTINUOUS LUMINOUS AUDIO BEAM (SVG)                         */}
      {/* ============================================================ */}
      <div className="relative w-full h-36 flex items-center justify-center">
        
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Multi-stage Color Gradient Ribbon */}
            <linearGradient id="audioBeamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#10B981" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#FF9933" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
            </linearGradient>

            {/* Glowing Bloom Filter */}
            <filter id="beamGlow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Outer Soft Glow Ribbon */}
          <path
            d="M 20 60 
               Q 120 20, 200 60 
               T 380 60 
               Q 500 85, 650 60 
               T 980 60"
            fill="none"
            stroke="url(#audioBeamGradient)"
            strokeWidth="12"
            opacity="0.18"
            filter="url(#beamGlow)"
          />

          {/* Luminous Animated Core Wave Path */}
          <path
            d="M 20 60 
               C 80 15, 120 95, 200 60 
               C 270 30, 320 85, 380 60 
               C 460 35, 540 85, 650 60 
               C 740 45, 820 75, 900 60 
               L 980 60"
            fill="none"
            stroke="url(#audioBeamGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#beamGlow)"
            className="animate-pulse"
          />

          {/* Animated Waveform Pulses traveling through the beam */}
          <path
            d="M 50 60 Q 80 35, 120 60 Q 160 85, 200 60 Q 240 40, 280 60 Q 340 75, 380 60 Q 450 45, 520 60 Q 600 70, 650 60 Q 750 50, 850 60 L 960 60"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeDasharray="8 12"
            opacity="0.6"
            className="animate-pulse"
          />
        </svg>

        {/* ============================================================ */}
        {/* FOUR INTERACTIVE NODES (Progressive Disclosure)              */}
        {/* ============================================================ */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;

          return (
            <div
              key={node.id}
              style={{ left: `${node.positionPercent}%` }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 group"
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode(isActive ? null : node.id)}
            >
              {/* Node Orb Core */}
              <div className="relative flex items-center justify-center cursor-pointer">
                
                {/* Outer Ripple */}
                <span
                  className="absolute w-8 h-8 rounded-full border border-white/20 animate-ping pointer-events-none"
                  style={{ animationDuration: "3s" }}
                />

                {/* Node Button Ring */}
                <div
                  className={`w-6 h-6 rounded-full bg-slate-950 border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
                    isActive
                      ? "border-white scale-125 shadow-[0_0_20px_rgba(255,153,51,0.6)]"
                      : "border-slate-300/80 hover:border-white hover:scale-110"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${node.color}`}
                  />
                </div>

                {/* Minimal Node Title Label (Always Visible) */}
                <span className="absolute -bottom-6 text-[10px] font-mono tracking-wider font-bold text-slate-300 whitespace-nowrap uppercase">
                  {node.title}
                </span>
              </div>

              {/* PROGRESSIVE DISCLOSURE GLASS PILL (Appears on Hover / Click) */}
              {isActive && (
                <div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/15 shadow-2xl z-30 transition-all duration-300 animate-in fade-in zoom-in-95"
                >
                  {/* Micro connection line */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-white/15 rotate-45" />

                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#FF9933]">
                      STAGE {node.number}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                      {node.metrics}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-0.5">
                    {node.title} — <span className="text-[#06B6D4] font-normal">{node.sublabel}</span>
                  </h4>

                  <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
                    {node.desc}
                  </p>
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* Waveform Morphology Legend at bottom */}
      <div className="mt-8 flex items-center justify-between text-[11px] font-mono text-[#94A3B8] border-t border-white/[0.06] pt-4 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
          <span>Input: Irregular Noisy Wave</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>Processing: Filtered & Cleaned</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
          <span>Output: Harmonic Natural Sinusoid</span>
        </div>
      </div>

    </div>
  );
}
