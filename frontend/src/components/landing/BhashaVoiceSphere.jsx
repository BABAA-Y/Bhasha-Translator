import React, { useRef, useEffect } from "react";

const INDIC_GLYPHS = ["अ", "क", "க", "த", "ത", "న", "ಕ", "ವ", "ব", "ম", "മ", "ഭ", "સ", "જ"];

const SPHERE_LANGUAGES = [
  { script: "भाषा", lang: "HINDI", font: "'Noto Sans Devanagari'", color: "rgba(255, 153, 51, " },
  { script: "மொழி", lang: "TAMIL", font: "'Noto Sans Tamil'", color: "rgba(6, 182, 212, " },
  { script: "భాష", lang: "TELUGU", font: "'Noto Sans Telugu'", color: "rgba(16, 185, 129, " },
  { script: "ಭಾಷೆ", lang: "KANNADA", font: "'Noto Sans Kannada'", color: "rgba(255, 153, 51, " },
  { script: "ভাষা", lang: "BENGALI", font: "'Noto Sans Bengali'", color: "rgba(6, 182, 212, " },
  { script: "ഭാഷ", lang: "MALAYALAM", font: "'Noto Sans Malayalam'", color: "rgba(16, 185, 129, " },
  { script: "समजते", lang: "MARATHI", font: "'Noto Sans Devanagari'", color: "rgba(255, 153, 51, " },
];

export default function BhashaVoiceSphere() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Responsive Canvas Resolution
    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = Math.min(600, canvas.parentElement?.offsetWidth || 560);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.scale(dpr, dpr);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Particle cloud around the sphere
    const particleCount = 140;
    const baseRadius = 150;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radOffset = (Math.random() - 0.5) * 35;
      const r = baseRadius + radOffset;

      particles.push({
        baseX: r * Math.cos(theta) * Math.sin(phi),
        baseY: r * Math.sin(theta) * Math.sin(phi),
        baseZ: r * Math.cos(phi),
        size: Math.random() * 2 + 1,
        colorType: i % 3 === 0 ? "saffron" : i % 3 === 1 ? "cyan" : "emerald",
        glyph: i % 9 === 0 ? INDIC_GLYPHS[i % INDIC_GLYPHS.length] : null,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    // 3 Dynamic Orbital Wave Ribbons (Saffron, Cyan, Emerald)
    const ribbons = [
      {
        tiltX: 0.35,
        tiltZ: 0.65,
        color: "rgba(255, 153, 51, ",
        radius: 170,
        speed: 0.025,
        waveFreq: 4,
        waveAmp: 14,
      },
      {
        tiltX: -0.45,
        tiltZ: -0.55,
        color: "rgba(6, 182, 212, ",
        radius: 185,
        speed: -0.018,
        waveFreq: 5,
        waveAmp: 16,
      },
      {
        tiltX: 0.8,
        tiltZ: -0.2,
        color: "rgba(16, 185, 129, ",
        radius: 200,
        speed: 0.02,
        waveFreq: 3,
        waveAmp: 15,
      },
    ];

    let time = 0;
    let rotX = 0;
    let rotY = 0;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const centerX = width / 2;
      const centerY = height / 2;
      const sphereRadius = Math.min(width, height) * 0.28;

      if (!prefersReducedMotion) {
        time += 0.025;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation for 3D parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const scrollBoost = Math.min(scrollRef.current * 0.0005, 0.4);
      rotY += (prefersReducedMotion ? 0 : 0.006) + mouseRef.current.x * 0.0004 + scrollBoost * 0.01;
      rotX = mouseRef.current.y * 0.0006;

      // 1. Atmospheric Ambient Glow Behind Sphere
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        sphereRadius * 0.2,
        centerX,
        centerY,
        sphereRadius * 2.1
      );
      glowGrad.addColorStop(0, "rgba(255, 153, 51, 0.16)");
      glowGrad.addColorStop(0.35, "rgba(6, 182, 212, 0.1)");
      glowGrad.addColorStop(0.65, "rgba(16, 185, 129, 0.06)");
      glowGrad.addColorStop(1, "rgba(7, 11, 18, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Helper function for 3D rotation & projection
      const projectPoint = (x, y, z) => {
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const fov = 500;
        const scale = fov / (fov + z2);
        return {
          screenX: centerX + x1 * scale,
          screenY: centerY + y2 * scale,
          z: z2,
          scale,
        };
      };

      // 2. RENDER BACK HALF OF WAVE RIBBONS (Behind the Sphere, z < 0)
      ribbons.forEach((ribbon) => {
        const segments = 90;
        ctx.beginPath();
        let started = false;

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const wave = Math.sin(theta * ribbon.waveFreq + time * ribbon.speed * 60) * ribbon.waveAmp;
          const r = ribbon.radius * (sphereRadius / baseRadius) + wave;

          let rx = r * Math.cos(theta);
          let ry = r * Math.sin(theta);
          let rz = 0;

          const ty1 = ry * Math.cos(ribbon.tiltX) - rz * Math.sin(ribbon.tiltX);
          const tz1 = rz * Math.cos(ribbon.tiltX) + ry * Math.sin(ribbon.tiltX);
          const tx2 = rx * Math.cos(ribbon.tiltZ) - ty1 * Math.sin(ribbon.tiltZ);
          const ty2 = ty1 * Math.cos(ribbon.tiltZ) + rx * Math.sin(ribbon.tiltZ);

          const p = projectPoint(tx2, ty2, tz1);

          if (p.z < 0) {
            if (!started) {
              ctx.moveTo(p.screenX, p.screenY);
              started = true;
            } else {
              ctx.lineTo(p.screenX, p.screenY);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = `${ribbon.color}0.35)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // 3. RENDER DARK 3D CORE SPHERE
      const lightOffsetX = centerX - sphereRadius * 0.35 + mouseRef.current.x * 0.08;
      const lightOffsetY = centerY - sphereRadius * 0.35 + mouseRef.current.y * 0.08;

      const sphereGrad = ctx.createRadialGradient(
        lightOffsetX,
        lightOffsetY,
        sphereRadius * 0.05,
        centerX,
        centerY,
        sphereRadius
      );
      sphereGrad.addColorStop(0, "#1E293B"); // Light specular highlight
      sphereGrad.addColorStop(0.25, "#0F172A"); // Dark obsidian surface
      sphereGrad.addColorStop(0.7, "#0A0F1D"); // Deep shadow
      sphereGrad.addColorStop(1, "#070B12"); // Edge shadow

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Atmospheric rim luminescence (Saffron top-left, Cyan top-right, Emerald bottom)
      ctx.lineWidth = 2;
      const rimGrad = ctx.createLinearGradient(
        centerX - sphereRadius,
        centerY - sphereRadius,
        centerX + sphereRadius,
        centerY + sphereRadius
      );
      rimGrad.addColorStop(0, "rgba(255, 153, 51, 0.6)");
      rimGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.45)");
      rimGrad.addColorStop(1, "rgba(16, 185, 129, 0.5)");
      ctx.strokeStyle = rimGrad;
      ctx.stroke();

      // -----------------------------------------------------------------
      // SUBTLE MULTILINGUAL INDIC DEMONSTRATION INSIDE SPHERE CORE
      // Cycles: Hindi -> Tamil -> Telugu -> Kannada -> Bengali -> Malayalam -> Marathi
      // -----------------------------------------------------------------
      const langPeriod = 2.8; // seconds per language
      const totalLangs = SPHERE_LANGUAGES.length;
      const cycleTime = (time * 0.45) % (totalLangs * langPeriod);
      const currentIndex = Math.floor(cycleTime / langPeriod) % totalLangs;
      const nextIndex = (currentIndex + 1) % totalLangs;
      const progress = (cycleTime % langPeriod) / langPeriod; // 0 to 1

      let curAlpha = 1;
      let nextAlpha = 0;
      if (progress > 0.75) {
        const fadeProg = (progress - 0.75) / 0.25;
        curAlpha = 1 - fadeProg;
        nextAlpha = fadeProg;
      }

      const pulse = Math.sin(time * 2.5) * 0.12 + 0.88;

      // Draw active script
      if (curAlpha > 0.01) {
        const cur = SPHERE_LANGUAGES[currentIndex];
        ctx.save();
        ctx.font = `bold ${Math.floor(sphereRadius * 0.36)}px ${cur.font}, 'Plus Jakarta Sans', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha * 0.92 * pulse})`;
        ctx.shadowColor = `${cur.color}0.7)`;
        ctx.shadowBlur = 18;
        ctx.fillText(cur.script, centerX, centerY - 6);
        ctx.shadowBlur = 0;

        // Subtle language tag inside sphere core
        ctx.font = `bold ${Math.max(9, Math.floor(sphereRadius * 0.09))}px 'Plus Jakarta Sans', monospace, sans-serif`;
        ctx.fillStyle = `${cur.color}${curAlpha * 0.75})`;
        ctx.fillText(cur.lang, centerX, centerY + sphereRadius * 0.3);
        ctx.restore();
      }

      // Cross-fade into next script
      if (nextAlpha > 0.01) {
        const next = SPHERE_LANGUAGES[nextIndex];
        ctx.save();
        ctx.font = `bold ${Math.floor(sphereRadius * 0.36)}px ${next.font}, 'Plus Jakarta Sans', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(255, 255, 255, ${nextAlpha * 0.92 * pulse})`;
        ctx.shadowColor = `${next.color}0.7)`;
        ctx.shadowBlur = 18;
        ctx.fillText(next.script, centerX, centerY - 6);
        ctx.shadowBlur = 0;

        ctx.font = `bold ${Math.max(9, Math.floor(sphereRadius * 0.09))}px 'Plus Jakarta Sans', monospace, sans-serif`;
        ctx.fillStyle = `${next.color}${nextAlpha * 0.75})`;
        ctx.fillText(next.lang, centerX, centerY + sphereRadius * 0.3);
        ctx.restore();
      }

      ctx.restore();

      // 4. RENDER FRONT HALF OF WAVE RIBBONS (In front of sphere, z >= 0)
      ribbons.forEach((ribbon) => {
        const segments = 90;
        ctx.beginPath();
        let started = false;

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const wave = Math.sin(theta * ribbon.waveFreq + time * ribbon.speed * 60) * ribbon.waveAmp;
          const r = ribbon.radius * (sphereRadius / baseRadius) + wave;

          let rx = r * Math.cos(theta);
          let ry = r * Math.sin(theta);
          let rz = 0;

          const ty1 = ry * Math.cos(ribbon.tiltX) - rz * Math.sin(ribbon.tiltX);
          const tz1 = rz * Math.cos(ribbon.tiltX) + ry * Math.sin(ribbon.tiltX);
          const tx2 = rx * Math.cos(ribbon.tiltZ) - ty1 * Math.sin(ribbon.tiltZ);
          const ty2 = ty1 * Math.cos(ribbon.tiltZ) + rx * Math.sin(ribbon.tiltZ);

          const p = projectPoint(tx2, ty2, tz1);

          if (p.z >= 0) {
            if (!started) {
              ctx.moveTo(p.screenX, p.screenY);
              started = true;
            } else {
              ctx.lineTo(p.screenX, p.screenY);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = `${ribbon.color}0.9)`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = `${ribbon.color}0.6)`;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 5. RENDER 3D SPHERICAL PARTICLES & FLOATING GLYPHS
      const projectedParticles = particles.map((p) => {
        const wave = Math.sin(time * 2 + p.phase) * 6;
        const norm = (baseRadius + wave) / baseRadius;
        const px = p.baseX * norm * (sphereRadius / baseRadius);
        const py = p.baseY * norm * (sphereRadius / baseRadius);
        const pz = p.baseZ * norm * (sphereRadius / baseRadius);

        const proj = projectPoint(px, py, pz);
        return {
          ...p,
          ...proj,
          alpha: Math.max(0.15, (proj.z + baseRadius) / (2 * baseRadius)),
        };
      });

      // Sort by depth
      projectedParticles.sort((a, b) => a.z - b.z);

      projectedParticles.forEach((p) => {
        let col = "255, 153, 51";
        if (p.colorType === "cyan") col = "6, 182, 212";
        if (p.colorType === "emerald") col = "16, 185, 129";

        // Draw particle
        ctx.fillStyle = `rgba(${col}, ${p.alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, p.size * p.scale, 0, Math.PI * 2);
        ctx.fill();

        // Subtle floating Indic script particles
        if (p.glyph && p.z > 0) {
          ctx.font = `${Math.floor(12 * p.scale)}px 'Plus Jakarta Sans', sans-serif`;
          ctx.fillStyle = `rgba(248, 250, 252, ${p.alpha * 0.8})`;
          ctx.fillText(p.glyph, p.screenX + 4, p.screenY - 4);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.targetX = e.clientX - rect.left - rect.width / 2;
    mouseRef.current.targetY = e.clientY - rect.top - rect.height / 2;
    mouseRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
    mouseRef.current.isHovered = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex items-center justify-center select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px] xl:w-[620px] xl:h-[620px] cursor-grab active:cursor-grabbing transition-transform duration-300"
      />
    </div>
  );
}
