import React, { useState } from "react";

export default function VoiceEnergyStream() {
  const [activeNode, setActiveNode] = useState("understand");

  const nodes = [
    {
      id: "listen",
      number: "01",
      title: "LISTEN",
      sublabel: "Raw Speech",
      desc: "Captures irregular telephonic and street audio without clipping.",
      color: "#06B6D4",
      positionPercent: 12,
      metrics: "16kHz Mono",
    },
    {
      id: "understand",
      number: "02",
      title: "UNDERSTAND",
      sublabel: "Speech Intelligence",
      desc: "Prisma STT strips hesitations and identifies language boundaries in Hinglish.",
      color: "#10B981",
      positionPercent: 40,
      metrics: "Vachana v3 STT",
    },
    {
      id: "translate",
      number: "03",
      title: "TRANSLATE",
      sublabel: "Context + Meaning",
      desc: "Resolves colloquial street intent, honorifics (Anna, Bhaiya, Ji).",
      color: "#FF9933",
      positionPercent: 68,
      metrics: "Indic Semantic Engine",
    },
    {
      id: "speak",
      number: "04",
      title: "SPEAK",
      sublabel: "Natural Voice",
      desc: "Timbre v3 synthesizes authentic human speech in local native dialect.",
      color: "#F59E0B",
      positionPercent: 92,
      metrics: "Timbre v3.0 (Shivani)",
    },
  ];

  const currentNode = nodes.find((n) => n.id === activeNode) || nodes[1];

  return (
    <div className="relative w-full py-6 select-none flex flex-col justify-center">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. CONTINUOUS LUMINOUS AUDIO BEAM (SVG)                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative w-full h-32 flex items-center justify-center">
        
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 800 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#10B981" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#FF9933" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
            </linearGradient>

            <filter id="streamGlow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Soft outer bloom */}
          <path
            d="M 20 60 Q 120 20, 220 60 T 420 60 Q 560 90, 680 60 T 780 60"
            fill="none"
            stroke="url(#streamGrad)"
            strokeWidth="10"
            opacity="0.15"
            filter="url(#streamGlow)"
          />

          {/* Luminous Core Stream Path */}
          <path
            d="M 20 60 C 80 15, 140 95, 220 60 C 300 25, 360 85, 420 60 C 500 35, 580 85, 680 60 L 780 60"
            fill="none"
            stroke="url(#streamGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#streamGlow)"
          />

          {/* Waveform Morphology Pulses */}
          <path
            d="M 40 60 Q 70 35, 100 60 Q 140 85, 180 60 Q 240 40, 300 60 Q 380 75, 420 60 Q 500 45, 580 60 L 760 60"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeDasharray="6 10"
            opacity="0.5"
          />
        </svg>

        {/* ------------------------------------------------------------------ */}
        {/* 2. FOUR FLOATING INTERACTIVE LIGHT NODES                           */}
        {/* ------------------------------------------------------------------ */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;

          return (
            <div
              key={node.id}
              style={{ left: `${node.positionPercent}%` }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 group cursor-pointer"
              onClick={() => setActiveNode(node.id)}
            >
              {/* Outer Glow Halo */}
              {isActive && (
                <span
                  className="absolute w-8 h-8 rounded-full animate-ping pointer-events-none opacity-40"
                  style={{ backgroundColor: node.color }}
                />
              )}

              {/* Node Orb Core */}
              <div
                className={`w-6 h-6 rounded-full bg-slate-950 border-2 transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? "border-white scale-125 shadow-[0_0_20px_rgba(255,153,51,0.6)]"
                    : "border-slate-400 hover:border-white hover:scale-110"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
              </div>

              {/* Label Under Node */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-wider font-bold text-slate-300 whitespace-nowrap uppercase">
                {node.title}
              </span>
            </div>
          );
        })}

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. LIGHTWEIGHT FLOATING STAGE DETAIL (Appears below beam, NO box)  */}
      {/* ------------------------------------------------------------------ */}
      <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
        <div>
          <span className="text-[#FF9933] font-bold uppercase mr-2">
            STAGE {currentNode.number}: {currentNode.title}
          </span>
          <span className="text-slate-400 font-normal">
            — {currentNode.desc}
          </span>
        </div>

        <span className="text-[10px] text-slate-500 shrink-0 ml-4">
          [{currentNode.metrics}]
        </span>
      </div>

    </div>
  );
}
