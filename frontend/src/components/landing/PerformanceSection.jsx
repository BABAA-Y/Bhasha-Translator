import React from "react";
import { Activity } from "lucide-react";

export default function PerformanceSection() {
  const metrics = [
    {
      label: "Audio Normalization (FFmpeg)",
      duration: "~45 ms",
      desc: "Converts browser Opus/WebM to 16kHz PCM WAV in-memory.",
      status: "Verified",
    },
    {
      label: "Gnani Prisma STT Transcription",
      duration: "~450 - 650 ms",
      desc: "Network turnaround to Gnani Vachana API endpoint.",
      status: "Benchmarked",
    },
    {
      label: "Colloquial Indic Translation",
      duration: "~180 - 280 ms",
      desc: "Low-latency inference via specialized Indic LLM.",
      status: "Benchmarked",
    },
    {
      label: "Gnani Timbre v3 Voice Synthesis",
      duration: "~380 - 550 ms",
      desc: "Neural speech generation returning 24kHz audio buffer.",
      status: "Benchmarked",
    },
  ];

  return (
    <section id="performance" className="py-28 relative">
      
      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-[#10B981]/06 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Information & Storytelling */}
          <div className="lg:col-span-5 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] uppercase block">
              Performance Metrics
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              Sub-second conversational turnaround.
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              Every millisecond matters when two people are standing face-to-face on a street corner or clinic counter. We measure and optimize each stage of the pipeline against real-world Indian networks.
            </p>

            <div className="pt-2">
              <div className="p-5 rounded-3xl bg-emerald-950/20 border border-[#10B981]/30 backdrop-blur-sm space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] font-bold uppercase">
                  <Activity className="w-4 h-4" />
                  <span>Target Voice Turnaround</span>
                </div>
                <div className="text-3xl font-extrabold text-white font-display">
                  ~1.2s – 1.8s Total
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  From last spoken syllable to first translated audio wave.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Latency Pipeline Breakdown */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase">Pipeline Latency Breakdown</span>
                <span className="text-[#10B981] font-bold">Bangalore Broadband Benchmarks</span>
              </div>

              <div className="space-y-4">
                {metrics.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-bold">{item.label}</span>
                      <span className="text-[#FF9933] font-bold">{item.duration}</span>
                    </div>

                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF9933] via-[#06B6D4] to-[#10B981] rounded-full"
                        style={{ width: `${(idx + 1) * 25}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{item.desc}</span>
                      <span className="text-[#10B981] font-mono text-[10px]">[{item.status}]</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
