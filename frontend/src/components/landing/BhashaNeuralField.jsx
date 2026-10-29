import React, { useRef, useEffect } from "react";

const PALETTE = [
  { r: 255, g: 153, b: 51 }, // Saffron / Orange #FF9933 (40%)
  { r: 255, g: 153, b: 51 },
  { r: 6, g: 182, b: 212 },   // Cyan #06B6D4 (35%)
  { r: 6, g: 182, b: 212 },
  { r: 16, g: 185, b: 129 },  // Emerald #10B981 (25%)
];

export default function BhashaNeuralField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Responsive particle count & configuration
    const getParticleCount = () => {
      const w = window.innerWidth;
      if (w < 768) return 42;       // Mobile
      if (w < 1024) return 68;      // Tablet
      return 115;                   // Desktop
    };

    const getMaxDistance = () => {
      return window.innerWidth < 768 ? 75 : 105;
    };

    const getInteractionRadius = () => {
      return window.innerWidth < 768 ? 0 : 160;
    };

    // Device Pixel Ratio scaling for sharp rendering
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
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
      lastActiveTime: 0,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
      mouse.lastActiveTime = performance.now();
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Scroll tracking & velocity perturbation
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      // Clamp scroll impulse
      scrollVelocity += Math.max(-15, Math.min(15, delta)) * 0.04;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initialize particles
    const particleCount = getParticleCount();
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        baseRadius: Math.random() < 0.85 ? Math.random() * 1.1 + 0.8 : Math.random() * 0.9 + 1.8,
        baseAlpha: Math.random() < 0.8 ? Math.random() * 0.16 + 0.12 : Math.random() * 0.18 + 0.28,
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
            const alpha = (1 - dist / maxDist) * 0.08;
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

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Mouse idle fade out after 3 seconds of inactivity
      const isMouseActive = mouse.active && (performance.now() - mouse.lastActiveTime < 3000);

      // Scroll velocity dampening (exponential return to rest)
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      const maxDist = getMaxDistance();
      const maxDistSq = maxDist * maxDist;
      const interactRadius = getInteractionRadius();
      const interactRadiusSq = interactRadius * interactRadius;

      // 1. Subtle Radial Glow at Cursor Position
      if (isMouseActive && mouse.x > 0 && mouse.y > 0) {
        const glowRadius = 200;
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        cursorGlow.addColorStop(0, "rgba(6, 182, 212, 0.07)");
        cursorGlow.addColorStop(0.45, "rgba(255, 153, 51, 0.025)");
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

      // 2. Draw Organic Neural Network Connections (Capped at 2 per node to avoid spiderwebs)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (p1.connections >= 2) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p2.connections >= 2) continue;

          const dx = p2.x - p1.x;
          if (Math.abs(dx) > maxDist) continue;
          const dy = p2.y - p1.y;
          if (Math.abs(dy) > maxDist) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            // Ultra-thin, organic, gentle fade with distance
            const alphaRatio = 1 - dist / maxDist;
            const lineAlpha = alphaRatio * 0.09;

            // Soft blend line between the two node colors
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

      // 3. Update & Render Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient Brownian drift + subtle sine oscillation
        p.x += p.vx + Math.cos(time + p.phase) * 0.1;
        p.y += p.vy + Math.sin(time + p.phase) * 0.1 - scrollVelocity;

        // Wrap around boundaries smoothly
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        let currentAlpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.04;
        let currentRadius = p.baseRadius;

        // Mouse disturbance (gentle deflection & slight illumination)
        if (isMouseActive && interactRadiusSq > 0) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < interactRadiusSq && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (1 - mDist / interactRadius);
            
            // Very soft push away from cursor
            p.x += (mdx / mDist) * force * 0.65;
            p.y += (mdy / mDist) * force * 0.65;

            // Subtle illumination near cursor
            currentAlpha = Math.min(0.65, currentAlpha + force * 0.28);
            currentRadius = p.baseRadius + force * 0.5;
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

    // Handle window resize dynamically
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
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
