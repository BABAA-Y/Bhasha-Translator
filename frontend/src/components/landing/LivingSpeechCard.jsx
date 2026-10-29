import React, { useState, useEffect, useRef } from "react";
import { Volume2, Play, Pause } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function LivingSpeechCard() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);

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

  // 3D Tilt effect on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });

    // Subtle 3D tilt
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Canvas waveform rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = 200);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = 200;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      timeRef.current += isPlaying ? 0.055 : 0.02;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // Ribbon waves
      const ribbons = isPlaying
        ? [
            { color: "rgba(255, 153, 51, 0.9)", width: 3, amp: 38 },
            { color: "rgba(16, 185, 129, 0.8)", width: 2.5, amp: 30 },
            { color: "rgba(6, 182, 212, 0.7)", width: 2, amp: 24 },
          ]
        : [
            { color: "rgba(255, 153, 51, 0.55)", width: 2, amp: 18 },
            { color: "rgba(6, 182, 212, 0.4)", width: 1.5, amp: 14 },
            { color: "rgba(16, 185, 129, 0.35)", width: 1.5, amp: 12 },
          ];

      ribbons.forEach((ribbon, i) => {
        ctx.beginPath();
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.width;

        const centerY = height * 0.5 + (i - 1) * 8;
        const mouseAmp = (1 - Math.abs(mousePos.y - 0.5) * 2) * 12;
        const totalAmp = ribbon.amp + mouseAmp;

        for (let x = 0; x <= width; x += 3) {
          const progress = x / width;
          const envelope = Math.sin(progress * Math.PI); // Taper edges smoothly

          const freq1 = 0.015 + i * 0.004;
          const freq2 = 0.03 + i * 0.005;

          const yOffset =
            (Math.sin(x * freq1 + t * 1.6 + i) * 0.65 +
              Math.cos(x * freq2 - t * 1.2 + i * 0.8) * 0.35) *
            totalAmp *
            envelope;

          const y = centerY + yOffset;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isPlaying, mousePos]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="relative w-full rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0A0F1D]/80 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl flex flex-col justify-between min-h-[440px] select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF9933]/05 via-transparent to-[#10B981]/05 pointer-events-none" />

      {/* Top: Spoken Input Statement */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="text-3xl sm:text-4xl font-extrabold text-white font-indic tracking-tight">
          "{sample.source}"
        </div>

        {/* Minimal Audio Play Trigger */}
        <button
          type="button"
          onClick={handlePlayVoice}
          className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 border shadow-lg cursor-pointer ${
            isPlaying
              ? "bg-[#10B981] text-slate-950 border-[#10B981] shadow-[#10B981]/30 scale-105"
              : "bg-white/[0.06] hover:bg-white/[0.12] text-white border-white/15"
          }`}
          aria-label="Play translated voice"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-slate-950" />
              <span>Speaking...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#FF9933] fill-[#FF9933]" />
              <span>Transform</span>
            </>
          )}
        </button>
      </div>

      {/* Center: Large Animated Waveform */}
      <div className="relative z-10 my-6 h-[180px] w-full flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
      </div>

      {/* Bottom: Natural Tamil Speech Output */}
      <div className="relative z-10 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="text-3xl sm:text-4xl font-extrabold text-[#10B981] font-indic tracking-tight">
          "{sample.translated}"
        </div>

        <span className="text-xs text-slate-400 italic">
          "{sample.meaning}"
        </span>
      </div>
    </div>
  );
}
