import React, { useState, useEffect, useRef } from "react";
import { Volume2, Play, Pause } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function HeroSoundField() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);

  // Spoken sample in the hero
  const sample = {
    source: "भैया, यहाँ रोक देना।",
    sourceLang: "Hindi",
    translated: "அண்ணா, இங்கே நிறுத்துங்கள்.",
    targetLang: "Tamil",
    meaning: "Bhaiya, please drop me off right here."
  };

  const handlePlayVoice = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    soundFx.playNaturalBhashaSound(sample.translated);

    setTimeout(() => {
      setIsPlaying(false);
    }, 2400);
  };

  // Canvas-based Living Audio Waveform & Energy Field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = 360;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      timeRef.current += isPlaying ? 0.05 : 0.018;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // Atmospheric background gradient on the canvas
      const bgGlow = ctx.createRadialGradient(
        width * mousePos.x,
        height * mousePos.y,
        10,
        width * 0.5,
        height * 0.5,
        width * 0.6
      );
      bgGlow.addColorStop(0, isPlaying ? "rgba(255, 153, 51, 0.15)" : "rgba(6, 182, 212, 0.08)");
      bgGlow.addColorStop(0.5, isPlaying ? "rgba(16, 185, 129, 0.06)" : "rgba(255, 153, 51, 0.04)");
      bgGlow.addColorStop(1, "transparent");

      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw 4 harmonic sound ribbons
      const ribbonCount = 4;
      const colors = isPlaying
        ? [
            "rgba(255, 153, 51, 0.85)", // Saffron
            "rgba(16, 185, 129, 0.75)", // Emerald
            "rgba(6, 182, 212, 0.65)",  // Cyan
            "rgba(245, 158, 11, 0.55)", // Amber
          ]
        : [
            "rgba(255, 153, 51, 0.45)",
            "rgba(6, 182, 212, 0.35)",
            "rgba(16, 185, 129, 0.30)",
            "rgba(148, 163, 184, 0.20)",
          ];

      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        ctx.strokeStyle = colors[r];
        ctx.lineWidth = isPlaying ? 3 : 2;

        const baseAmp = isPlaying ? 48 : 22;
        const mouseAmpBoost = (1 - Math.abs(mousePos.y - 0.5) * 2) * 15;
        const amplitude = baseAmp + r * 6 + mouseAmpBoost;
        const centerY = height * 0.52 + (r - 1.5) * 12;

        for (let x = 0; x <= width; x += 4) {
          const progress = x / width;
          // Smooth taper at the edges
          const envelope = Math.sin(progress * Math.PI);

          const freq1 = 0.012 + r * 0.003;
          const freq2 = 0.024 + r * 0.004;

          const yOffset =
            (Math.sin(x * freq1 + t * 1.5 + r * 1.2) * 0.6 +
              Math.cos(x * freq2 - t * 1.2 + r) * 0.4) *
            amplitude *
            envelope;

          const y = centerY + yOffset;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPlaying, mousePos]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0A0F1D]/60 backdrop-blur-xl p-8 sm:p-10 select-none shadow-2xl flex flex-col justify-between min-h-[380px]"
    >
      {/* Living Interactive Waveform Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Top Bar: Spoken Specimen Input */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase block mb-1">
            Raw Spoken Input
          </span>
          <div className="text-xl sm:text-2xl font-bold text-white tracking-wide font-indic">
            "{sample.source}"
          </div>
        </div>

        <button
          onClick={handlePlayVoice}
          className={`px-5 py-2.5 rounded-full text-xs font-bold font-mono transition-all duration-300 flex items-center gap-2 border shadow-lg ${
            isPlaying
              ? "bg-[#10B981] text-slate-950 border-[#10B981] shadow-[#10B981]/30 scale-105"
              : "bg-white/[0.06] hover:bg-white/[0.12] text-white border-white/20 hover:border-white/40"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-slate-950" />
              <span>Speaking Tamil...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#FF9933] fill-[#FF9933]" />
              <span>Hear Bhasha</span>
            </>
          )}
        </button>
      </div>

      {/* Center Reactive Audio Waveform Indicator */}
      <div className="relative z-10 my-auto py-8 text-center pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block mb-2">
          {isPlaying ? "Neural Resonance Active" : "Move cursor across wave to perturb sound field"}
        </span>
        <div className="h-1 flex items-center justify-center gap-1.5 opacity-60">
          <span className="w-8 h-0.5 bg-[#06B6D4] rounded-full" />
          <span className="w-16 h-0.5 bg-[#FF9933] rounded-full" />
          <span className="w-8 h-0.5 bg-[#10B981] rounded-full" />
        </div>
      </div>

      {/* Bottom Bar: Natural Regional Interpretation */}
      <div className="relative z-10 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#10B981] uppercase block mb-0.5">
            Natural Tamil Voice Synthesis
          </span>
          <div className="text-xl sm:text-2xl font-bold text-white font-indic">
            "{sample.translated}"
          </div>
        </div>

        <span className="text-xs text-slate-400 italic font-mono">
          "{sample.meaning}"
        </span>
      </div>
    </div>
  );
}
