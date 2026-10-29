import React, { useRef, useEffect } from "react";

const PALETTE = [
  { r: 255, g: 153, b: 51 }, // Saffron #FF9933 (~40%)
  { r: 255, g: 153, b: 51 },
  { r: 6, g: 182, b: 212 },   // Cyan #06B6D4 (~35%)
  { r: 6, g: 182, b: 212 },
  { r: 16, g: 185, b: 129 },  // Emerald #10B981 (~25%)
];

export default function GlobalParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Responsive configuration
    const isMobile = () => window.innerWidth < 768;
    const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;

    const getParticleCount = () => {
      if (isMobile()) return 40;
      if (isTablet()) return 70;
      return 120; // Desktop
    };

    const getMaxDistance = () => (isMobile() ? 70 : 100);
    const getInteractRadius = () => (isMobile() ? 0 : 170);

    // Dynamic DPR-aware resizing
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Mouse tracking with smooth lerp
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      lastMoveTime: 0,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      mouse.lastMoveTime = performance.now();
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Initialize Multi-Depth Particles (Fixed Static Starfield Canvas)
    // 3 depth layers: 0 (distant), 1 (midground), 2 (foreground)
    const particleCount = getParticleCount();
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const layer = i < particleCount * 0.45 ? 0 : i < particleCount * 0.8 ? 1 : 2;
      const depth = layer === 0 ? 0.35 : layer === 1 ? 0.65 : 1.0;
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];

      const baseRadius =
        layer === 0
          ? Math.random() * 0.5 + 0.75
          : layer === 1
          ? Math.random() * 0.6 + 1.1
          : Math.random() * 0.8 + 1.7;

      const baseAlpha =
        layer === 0
          ? Math.random() * 0.08 + 0.08
          : layer === 1
          ? Math.random() * 0.12 + 0.14
          : Math.random() * 0.18 + 0.22;

      const speedScale = depth * 0.35;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedScale,
        vy: (Math.random() - 0.5) * speedScale,
        layer,
        depth,
        baseRadius,
        baseAlpha,
        color,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        connections: 0,
      });
    }

    // Static render for reduced motion users
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      const maxDist = getMaxDistance();

      // Static connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist && p1.connections < 2 && p2.connections < 2) {
            const alpha = (1 - dist / maxDist) * 0.08 * p1.depth * p2.depth;
            ctx.strokeStyle = `rgba(255, 153, 51, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            p1.connections++;
            p2.connections++;
          }
        }
      }

      // Static particles
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("scroll", handleScroll);
      };
    }

    // Dynamic 60/120fps Animation Loop
    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Mouse activity check (fade out influence after 2.5s stationary)
      const isMouseActive = mouse.active && performance.now() - mouse.lastMoveTime < 2500;

      ctx.clearRect(0, 0, width, height);

      const maxDist = getMaxDistance();
      const maxDistSq = maxDist * maxDist;
      const interactRadius = getInteractRadius();
      const interactRadiusSq = interactRadius * interactRadius;

      // 1. Subtle Radial Glow at Cursor Position
      if (isMouseActive && mouse.x > 0 && mouse.y > 0) {
        const glowRadius = 210;
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        cursorGlow.addColorStop(0, "rgba(6, 182, 212, 0.065)");
        cursorGlow.addColorStop(0.4, "rgba(255, 153, 51, 0.025)");
        cursorGlow.addColorStop(1, "rgba(7, 11, 18, 0)");

        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset connection counters
      for (let i = 0; i < particles.length; i++) {
        particles[i].connections = 0;
      }

      // 2. Draw Organic Neural Network Connections (Capped at 2 per particle)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (p1.connections >= 2) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.connections >= 2) continue;

          // Connect particles in compatible layers
          if (Math.abs(p1.layer - p2.layer) > 1) continue;

          const dx = p2.x - p1.x;
          if (Math.abs(dx) > maxDist) continue;
          const dy = p2.y - p1.y;
          if (Math.abs(dy) > maxDist) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alphaRatio = 1 - dist / maxDist;
            const lineAlpha = alphaRatio * 0.085 * Math.min(p1.depth, p2.depth);

            ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            p1.connections++;
            p2.connections++;
            if (p1.connections >= 2) break;
          }
        }
      }

      // 3. Update & Render Particles with Parallax & Proximity Response
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient drift + organic phase sway (Fixed Static Canvas)
        p.x += p.vx + Math.cos(time + p.phase) * (0.08 * p.depth);
        p.y += p.vy + Math.sin(time + p.phase) * (0.08 * p.depth);

        // Wrap around boundaries
        if (p.x < -15) p.x = width + 15;
        else if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        else if (p.y > height + 15) p.y = -15;

        let currentAlpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.03;
        let currentRadius = p.baseRadius;

        // Mouse disturbance: nearby particles deflect gently and brighten
        if (isMouseActive && interactRadiusSq > 0) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < interactRadiusSq && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (1 - mDist / interactRadius) * p.depth;

            // Soft physical push away
            p.x += (mdx / mDist) * force * 0.7;
            p.y += (mdy / mDist) * force * 0.7;

            // Subtle illumination
            currentAlpha = Math.min(0.65, currentAlpha + force * 0.28);
            currentRadius = p.baseRadius + force * 0.6;
          }
        }

        // Draw particle
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.04, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Tab visibility handling (pause animation when tab is inactive)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Dynamic resize handling
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
