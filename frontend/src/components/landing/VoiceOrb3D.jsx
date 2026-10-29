import React, { useRef, useEffect, useState } from "react";

const INDIAN_GLYPHS = ["अ", "क", "க", "ம", "ব", "ল", "త", "న", "ಕ", "ವ", "म", "भ"];

export default function VoiceOrb3D({ state = "idle", onTriggerVoice }) {
  const canvasRef = useRef(null);
  const [orbState, setOrbState] = useState(state);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });

  useEffect(() => {
    setOrbState(state);
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Handle high DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 420;
    const height = 420;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Generate 3D spherical particles
    const particleCount = 280;
    const radius = 120;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral sphere distribution
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      particles.push({
        baseX: radius * Math.cos(theta) * Math.sin(phi),
        baseY: radius * Math.sin(theta) * Math.sin(phi),
        baseZ: radius * Math.cos(phi),
        x: 0,
        y: 0,
        z: 0,
        size: Math.random() * 2 + 1,
        glyph: Math.random() > 0.85 ? INDIAN_GLYPHS[Math.floor(Math.random() * INDIAN_GLYPHS.length)] : null,
        glyphAlpha: 0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let rotX = 0;
    let rotY = 0;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      rotY += 0.008 + mousePos.current.x * 0.0005;
      rotX = mousePos.current.y * 0.0008;

      const centerX = width / 2;
      const centerY = height / 2;

      // Color scheme based on state
      let primaryColor = "255, 153, 51"; // Electric Saffron (#FF9933)
      let waveAmp = 6;
      let waveSpeed = 2;

      if (orbState === "listening") {
        primaryColor = "16, 185, 129"; // Emerald (#10B981)
        waveAmp = 18;
        waveSpeed = 4;
      } else if (orbState === "processing") {
        primaryColor = "6, 182, 212"; // Neon Cyan (#06B6D4)
        waveAmp = 12;
        waveSpeed = 6;
      } else if (orbState === "speaking") {
        primaryColor = "255, 153, 51";
        waveAmp = 22;
        waveSpeed = 3.5;
      }

      // Center subtle glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius * 1.3);
      glowGrad.addColorStop(0, `rgba(${primaryColor}, 0.18)`);
      glowGrad.addColorStop(0.5, `rgba(${primaryColor}, 0.05)`);
      glowGrad.addColorStop(1, "rgba(7, 11, 18, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Sort particles by depth Z for correct layering
      const projected = particles.map((p) => {
        // Audio wave displacement
        const wave = Math.sin(time * waveSpeed + p.phase) * waveAmp;
        const currentRadius = radius + wave;

        // Spherical normalization
        const norm = currentRadius / radius;
        const px = p.baseX * norm;
        const py = p.baseY * norm;
        const pz = p.baseZ * norm;

        // 3D rotation Y
        const x1 = px * Math.cos(rotY) - pz * Math.sin(rotY);
        const z1 = pz * Math.cos(rotY) + px * Math.sin(rotY);

        // 3D rotation X
        const y2 = py * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = z1 * Math.cos(rotX) + py * Math.sin(rotX);

        // Perspective projection
        const fov = 340;
        const scale = fov / (fov + z2);
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y2 * scale;
        const depthAlpha = Math.max(0.15, (z2 + radius) / (2 * radius));

        return {
          screenX,
          screenY,
          scale,
          z: z2,
          alpha: depthAlpha,
          size: p.size * scale,
          glyph: p.glyph,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      // Draw subtle connecting orbital lattice lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i += 4) {
        const p1 = projected[i];
        for (let j = i + 1; j < Math.min(i + 4, projected.length); j++) {
          const p2 = projected[j];
          const dist = Math.hypot(p1.screenX - p2.screenX, p1.screenY - p2.screenY);
          if (dist < 45) {
            ctx.strokeStyle = `rgba(${primaryColor}, ${0.12 * p1.alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.stroke();
          }
        }
      }

      // Draw particles and Indian glyph accents
      projected.forEach((p) => {
        // Point particle
        ctx.fillStyle = `rgba(${primaryColor}, ${p.alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Authentic Indian Script Glyph emerging when hovered or active
        if (p.glyph && (mousePos.current.isHovered || orbState !== "idle")) {
          ctx.font = `${Math.floor(9 * p.scale)}px 'Plus Jakarta Sans', sans-serif`;
          ctx.fillStyle = `rgba(248, 250, 252, ${p.alpha * 0.75})`;
          ctx.fillText(p.glyph, p.screenX + 3, p.screenY - 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [orbState]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current.targetX = (e.clientX - rect.left) - rect.width / 2;
    mousePos.current.targetY = (e.clientY - rect.top) - rect.height / 2;
    mousePos.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    mousePos.current.targetX = 0;
    mousePos.current.targetY = 0;
    mousePos.current.isHovered = false;
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none group">
      
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          const nextState = orbState === "idle" ? "listening" : orbState === "listening" ? "processing" : orbState === "processing" ? "speaking" : "idle";
          setOrbState(nextState);
          if (onTriggerVoice) onTriggerVoice(nextState);
        }}
        className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] cursor-pointer drop-shadow-[0_0_50px_rgba(255,153,51,0.15)] transition-transform duration-300 group-hover:scale-105"
      />

      {/* State Indicator Pill */}
      <div className="absolute -bottom-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0F1D]/80 border border-white/10 backdrop-blur-md shadow-lg">
        <span
          className={`w-2 h-2 rounded-full ${
            orbState === "listening"
              ? "bg-[#10B981] animate-ping"
              : orbState === "processing"
              ? "bg-[#06B6D4] animate-spin"
              : orbState === "speaking"
              ? "bg-[#FF9933] animate-pulse"
              : "bg-[#FF9933]/70"
          }`}
        />
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
          State: <span className="text-white font-bold">{orbState}</span>
        </span>
        <span className="text-[9px] text-[#94A3B8] font-mono border-l border-white/10 pl-2">
          Click orb to test
        </span>
      </div>

    </div>
  );
}
