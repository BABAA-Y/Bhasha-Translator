import React from "react";
import { Mic, Radio, Cpu, Sparkles, Languages, Volume2, Speaker, ShieldCheck, Zap } from "lucide-react";

export default function ArchitecturePipeline() {
  const nodes = [
    {
      step: "01",
      icon: Mic,
      label: "MIC INPUT",
      desc: "16kHz Mono PCM Audio Stream via Web Audio API",
      tech: "MediaRecorder / Opus",
    },
    {
      step: "02",
      icon: Radio,
      label: "CLIENT VAD",
      desc: "Filters street horns & ambient background noise",
      tech: "Acoustic Silence Detection",
    },
    {
      step: "03",
      icon: Cpu,
      label: "GNANI PRISMA STT",
      desc: "Transcribes Hindi, Tamil, Bengali & Hinglish",
      tech: "Vachana API v3 Endpoint",
    },
    {
      step: "04",
      icon: Sparkles,
      label: "DESI NLU & CONTEXT",
      desc: "Resolves colloquial slang & cultural intent",
      tech: "Indic Prompting Engine",
    },
    {
      step: "05",
      icon: Languages,
      label: "LLM TRANSLATION",
      desc: "Semantic translation in street vernacular",
      tech: "Low-latency Indic LLM",
    },
    {
      step: "06",
      icon: Volume2,
      label: "GNANI TIMBRE TTS",
      desc: "Authentic Indian human voice synthesis",
      tech: "Timbre v3 (Shivani Voice)",
    },
    {
      step: "07",
      icon: Speaker,
      label: "SPEAKER PLAYBACK",
      desc: "Automatic playback to conversation partner",
      tech: "24kHz Linear PCM",
    },
  ];

  return (
    <section id="architecture" className="py-28 relative">
      
      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#FF9933]/06 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Continuous Modular Pipeline */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-3">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <div
                    key={node.step}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#FF9933]/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-slate-500 font-bold">
                          STEP {node.step}
                        </span>
                        <div className="p-1.5 rounded-lg bg-white/5 text-[#FF9933] group-hover:bg-[#FF9933] group-hover:text-slate-950 transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-display">
                        {node.label}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        {node.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/[0.04]">
                      <span className="text-[9px] font-mono text-[#06B6D4] block truncate">
                        {node.tech}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#FF9933]" />
                Async HTTPX Streaming
              </span>
              <span className="flex items-center gap-2 text-[#10B981]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Voice Audio Storage
              </span>
            </div>

          </div>

          {/* RIGHT: Information Storytelling */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] uppercase block">
              System Architecture
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              Engineered for conversational speed.
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              A modular, asynchronous voice pipeline built specifically for Indian voice characteristics. Audio flows through client VAD, Gnani's Prisma speech recognition, colloquial Indic NLU, and Timbre voice synthesis in real-time.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Gnani Prisma STT Core
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Trained on diverse Indian accents, local telephone audio, and background street chatter.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Colloquial Indic NLU
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Translates intent rather than raw syntax, preserving cultural respect and colloquial idioms.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Gnani Timbre v3 Neural TTS
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Delivers warm, natural human speech in Tamil, Hindi, Kannada, Telugu, and Bengali.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
