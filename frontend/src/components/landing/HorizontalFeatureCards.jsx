import React, { useRef, useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

// 7 Cinematic Feature Demonstrations with Preserved Full Content
const FEATURES = [
  {
    id: "live",
    title: ["LIVE", "CONVERSATION"],
    subtitle: "Two people. Two languages. One continuous conversation.",
    accent: "#FF9933",
    accentLight: "rgba(255, 153, 51, 0.12)",
    renderContent: () => (
      <div className="my-auto py-3 space-y-4">
        {/* Speaker A */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-slate-400">Speaker A (Hindi)</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#FF9933] font-indic tracking-tight">
              "भैया, यहाँ रोक देना।"
            </div>
          </div>
          {/* Animated audio bars */}
          <div className="flex items-center gap-1 h-6 px-2.5 rounded-full bg-white/[0.03]">
            {[40, 75, 100, 60, 90, 45, 80].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                className="w-1 rounded-full bg-[#FF9933] animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Neural Transmission Bridge */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-8 h-px bg-white/10" />
          <span className="text-[11px] text-slate-400">Zero-Latency Speech Stream</span>
          <span className="w-8 h-px bg-white/10" />
        </div>

        {/* Speaker B */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#10B981]/[0.08] border border-[#10B981]/20">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-[#10B981]">Speaker B (Tamil)</span>
            <div className="text-xl sm:text-2xl font-extrabold text-[#10B981] font-indic tracking-tight">
              "இங்கே நிறுத்துங்கள்."
            </div>
          </div>
          <span className="text-xs text-slate-400 italic">"Drop me off right here"</span>
        </div>
      </div>
    )
  },
  {
    id: "context",
    title: ["CONTEXT", "AWARE"],
    subtitle: "Meaning, not dictionary words.",
    accent: "#10B981",
    accentLight: "rgba(16, 185, 129, 0.12)",
    renderContent: () => (
      <div className="my-auto py-2 space-y-3.5">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
          <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold block">
            Literal Translation
          </span>
          <div className="text-sm sm:text-base text-slate-400 line-through opacity-70 font-medium">
            "Brother, will you walk by the meter?"
          </div>
        </div>

        <div className="flex items-center gap-2 pl-3">
          <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] text-xs font-bold">
            ↓
          </div>
          <span className="text-xs uppercase tracking-wider text-[#10B981] font-bold">Bhasha Context</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#10B981]/[0.08] border border-[#10B981]/20 space-y-1">
          <div className="text-base sm:text-lg font-bold text-white">
            "Anna, can you drop me here?"
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-[#10B981] font-indic tracking-tight">
            "அண்ணா, மீட்டருக்கு வருவீங்களா?"
          </div>
        </div>
      </div>
    )
  },
  {
    id: "hinglish",
    title: ["HINGLISH &", "CODE-SWITCHING"],
    subtitle: "Hindi grammar with English loanwords, naturally combined.",
    accent: "#06B6D4",
    accentLight: "rgba(6, 182, 212, 0.12)",
    renderContent: () => (
      <div className="my-auto py-2 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold tracking-wider text-slate-400">
          <span className="text-[#FF9933]">Hindi vernacular</span>
          <span className="text-[#06B6D4]">English technical</span>
        </div>

        <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-snug">
          <span className="text-[#FF9933] font-indic">"भैया, </span>
          <span className="text-[#06B6D4] underline decoration-[#06B6D4]/40 underline-offset-6">online payment </span>
          <span className="text-[#06B6D4] underline decoration-[#06B6D4]/40 underline-offset-6">QR code </span>
          <span className="text-[#FF9933] font-indic">चलेगा क्या?"</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Seamlessly parses mixed vocabulary without hesitation or grammar collapse.
        </p>
      </div>
    )
  },
  {
    id: "voice",
    title: ["NATURAL", "VOICE"],
    subtitle: "Conversational cadence and breath, not machine speech.",
    accent: "#F59E0B",
    accentLight: "rgba(245, 158, 11, 0.12)",
    renderContent: () => (
      <div className="my-auto py-2 space-y-4">
        <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="text-base sm:text-lg font-bold text-white font-indic">
            "ஒரு ஸ்ட்ராங் டீயும் தண்ணீரும் கொடுங்கள்."
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              soundFx.playNaturalBhashaSound("ஒரு ஸ்ட்ராங் டீயும் தண்ணீரும் கொடுங்கள்.");
            }}
            className="w-11 h-11 rounded-2xl bg-[#10B981] text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer shadow-md shrink-0"
            aria-label="Hear natural voice"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Living Waveform Signal */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-12 w-full px-2 overflow-hidden">
          {[20, 45, 80, 100, 60, 90, 45, 80, 100, 70, 95, 50, 85, 40, 75, 90, 60, 30, 85, 50, 70, 95, 35].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
              className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-[#10B981]/30 to-[#10B981] animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  },
  {
    id: "street",
    title: ["STREET &", "TRANSIT"],
    subtitle: "Everyday Indian moments: platforms, auto stands, and bazaars.",
    accent: "#FBBF24",
    accentLight: "rgba(251, 191, 36, 0.12)",
    renderContent: () => (
      <div className="my-auto py-1 space-y-3">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-amber-400 block">Railway Platform</span>
            <div className="text-sm sm:text-base font-bold text-white font-indic mt-0.5">"Platform 4 kidhar hai?"</div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Tamil Output</span>
            <div className="text-sm sm:text-base font-bold text-[#10B981] font-indic mt-0.5">"பிளாட்பார்ம் 4 எந்த பக்கம்?"</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-cyan-400 block">Street Market</span>
            <div className="text-sm sm:text-base font-bold text-white font-indic mt-0.5">"Bhaiya, kul kitna hua?"</div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Kannada Output</span>
            <div className="text-sm sm:text-base font-bold text-[#10B981] font-indic mt-0.5">"ಇದು ಎಷ್ಟು ರೂಪಾಯಿ?"</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "camera",
    title: ["CAMERA", "TRANSLATOR"],
    subtitle: "Point your camera at street signs, menus, and notice boards.",
    accent: "#06B6D4",
    accentLight: "rgba(6, 182, 212, 0.12)",
    renderContent: () => (
      <div className="relative p-5 rounded-2xl bg-black/40 border border-white/10 my-auto overflow-hidden">
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#06B6D4]/80" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#06B6D4]/80" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#06B6D4]/80" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#06B6D4]/80" />

        {/* Scanning beam */}
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent shadow-[0_0_15px_#06B6D4] animate-pulse mb-3" />

        <div className="space-y-1.5">
          <span className="text-xs text-slate-400 font-medium">Hotel Entrance Signboard</span>
          <div className="text-base sm:text-lg font-bold text-amber-200 font-indic">
            "प्रवेश केवल अतिथियों के लिए"
          </div>
          <div className="pt-2 border-t border-white/10 text-base sm:text-lg font-bold text-[#10B981]">
            → Entry for guests only
          </div>
        </div>
      </div>
    )
  },
  {
    id: "explain",
    title: ["EXPLAIN", "THIS"],
    subtitle: "Unpacks colloquial expressions that literal translators get wrong.",
    accent: "#FF9933",
    accentLight: "rgba(255, 153, 51, 0.12)",
    renderContent: () => (
      <div className="my-auto py-2 space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <div className="text-2xl sm:text-3xl font-extrabold text-white font-indic tracking-tight">
          "जुगाड़ कर लेंगे"
        </div>
        
        <div className="text-base sm:text-lg font-bold text-[#FF9933]">
          "We'll figure something out."
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/10">
          An iconic Indian expression: finding an ingenious, practical workaround with whatever resources you have.
        </p>
      </div>
    )
  }
];

export default function HorizontalFeatureCards({ onOpenDemo }) {
  const containerRef = useRef(null);
  const [continuousProgress, setContinuousProgress] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef(null);

  const [viewport, setViewport] = useState({
    isMobile: false,
    isTablet: false
  });

  // Responsive geometry detector
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setViewport({
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map vertical scroll distance: Orbit -> Freeze at EXPLAIN THIS -> Next Section Overlays
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScrollable = rect.height - vh;
      if (totalScrollable <= 0) return;

      const scrollPastTop = -rect.top;
      const clampedFraction = Math.max(0, Math.min(1, scrollPastTop / totalScrollable));

      // The next section (#capabilities) has -mt-[100vh].
      // It starts rising from the bottom of the viewport when scrollPastTop = totalScrollable - vh
      // and fully covers the screen when scrollPastTop = totalScrollable.
      const overlaySpanFraction = vh / totalScrollable;
      const overlayStartFraction = 1.0 - overlaySpanFraction;

      // Track progressive overlay transition for background blur & dimming (0 -> 1)
      if (clampedFraction >= overlayStartFraction) {
        const t = (clampedFraction - overlayStartFraction) / overlaySpanFraction;
        setTransitionProgress(Math.max(0, Math.min(1, t)));
      } else {
        setTransitionProgress(0);
      }

      // Before the overlay starts, provide a dedicated frozen hold phase for EXPLAIN THIS:
      const holdSpanFraction = 0.08; // ~450-550px of frozen hold
      const orbitEndFraction = Math.max(0.40, overlayStartFraction - holdSpanFraction);
      const startBufferFraction = 0.04; // ~200-250px of initial entry rest
      const orbitSpanFraction = orbitEndFraction - startBufferFraction;

      let target = 0;
      if (clampedFraction <= startBufferFraction) {
        // Card 0 (LIVE CONVERSATION) is centered and settled
        target = 0;
      } else if (clampedFraction < orbitEndFraction) {
        // Smooth continuous right-to-left orbit progression through cards 0 -> 6
        const progressRatio = (clampedFraction - startBufferFraction) / orbitSpanFraction;
        target = progressRatio * (FEATURES.length - 1);
      } else {
        // FROZEN: Card 6 (EXPLAIN THIS) is locked in dead center!
        // Stays completely static during BOTH the hold phase AND while the next section rises over it!
        target = FEATURES.length - 1; // 6.0
      }

      targetProgressRef.current = target;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Spring-like smoothed interpolation loop (120fps hardware glide)
    const tick = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        // Continuous spring lerp factor: 0.09 for calm, weighted, cinematic motion without jumping
        const next = current + diff * 0.09;
        currentProgressRef.current = next;
        setContinuousProgress(next);
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const { isMobile, isTablet } = viewport;
  const maxIndex = FEATURES.length - 1; // 6
  const activeCardIndex = Math.min(maxIndex, Math.max(0, Math.round(continuousProgress)));
  const activeFeature = FEATURES[activeCardIndex];

  // Semicircular Arc Geometry Parameters
  // Invisible horizontal circle centered around viewport
  // x = sin(angle) * Rx
  // y = -(1 - cos(angle)) * Ry
  const angleStep = (isMobile ? 38 : isTablet ? 32 : 32) * (Math.PI / 180);
  const Rx = isMobile ? 380 : isTablet ? 600 : 760;
  const Ry = isMobile ? 35 : isTablet ? 110 : 150;

  // Progressive blur, dimming, and recession of frozen wheel as next section overlays
  const exitBlur = transitionProgress * 12; // 0px -> 12px progressive blur
  const exitOpacity = 1.0 - transitionProgress * 0.65; // 1.0 -> 0.35 progressive dimming
  const exitScale = 1.0 - transitionProgress * 0.04; // 1.0 -> 0.96 spatial recession

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative bg-transparent overflow-x-clip"
      style={{ height: `${isMobile ? 600 : 780}vh` }}
    >
      {/* ========================================================================= */}
      {/* PINNED STAGE: Pins in viewport while user scrolls through the orbit       */}
      {/* Unclipped vertically so cards freely travel along their 3D curved arc     */}
      {/* Progressive blur (0->12px) and dimming (1->0.35) during overlay phase     */}
      {/* ========================================================================= */}
      <div
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-x-clip bg-transparent select-none z-10"
        style={{
          opacity: exitOpacity.toFixed(2),
          filter: exitBlur > 0.05 ? `blur(${exitBlur.toFixed(1)}px)` : undefined,
          transform: `scale(${exitScale.toFixed(3)})`,
          willChange: transitionProgress > 0 ? "filter, opacity, transform" : undefined
        }}
      >
        
        {/* Section Header: Pure Editorial Statement with Zero Clutter */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-20 sm:pt-16 pb-2 select-none shrink-0 z-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.05]">
            Built for the way <br />
            <span className="text-slate-400">India actually speaks.</span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* TRUE 3D SEMICIRCULAR ORBIT STAGE (UNCLIPPED OVERFLOW-VISIBLE)             */}
        {/* ========================================================================= */}
        <div
          className="flex-1 flex items-center justify-center relative w-full overflow-visible min-h-0"
          style={{ perspective: "1500px" }}
        >
          {/* Subtle Semicircular Orbital Guide Arc */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-visible">
            <svg
              className="w-[1200px] h-[340px] overflow-visible opacity-20 pointer-events-none"
              viewBox="0 0 1200 340"
              fill="none"
            >
              <defs>
                <linearGradient id="orbitalArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
                  <stop offset="25%" stopColor="#06B6D4" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FF9933" stopOpacity="0.7" />
                  <stop offset="75%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 60,60 Q 600,240 1140,60"
                stroke="url(#orbitalArcGrad)"
                strokeWidth="1.5"
                strokeDasharray="6 8"
              />
            </svg>
          </div>

          <div className="relative w-full max-w-7xl h-[480px] sm:h-[500px] flex items-center justify-center overflow-visible">
            {FEATURES.map((feature, i) => {
              // Continuous offset distance from the center of the orbit
              const offset = i - continuousProgress;
              const absOffset = Math.abs(offset);
              const isStrictActive = absOffset <= 0.25;

              // Arc angle in radians
              const angle = offset * angleStep;

              // Semicircular horizontal and vertical coordinates
              const x = Math.sin(angle) * Rx;
              const y = -(1 - Math.cos(angle)) * Ry;

              // 3D Depth coordinate: center card at 80px, side cards recede to -20px, far cards to -120px
              const z = 80 - absOffset * 100;

              // Tangent rotation: cards tilt along the arc curvature
              const rotY = -(Math.sin(angle)) * 20;

              // Continuous scale: center card at 1.0, near side at 0.91, far at 0.82
              let scale = 1.0;
              if (absOffset <= 0.15) {
                scale = 1.0;
              } else if (absOffset <= 1.0) {
                scale = 1.0 - ((absOffset - 0.15) / 0.85) * 0.09;
              } else if (absOffset <= 2.0) {
                scale = 0.91 - ((absOffset - 1.0) / 1.0) * 0.09;
              } else {
                scale = Math.max(0.70, 0.82 - (absOffset - 2.0) * 0.08);
              }

              // Continuous blur: strictly 0px at center, 2.5px on near side, 5.5px on far side
              let blur = 0;
              if (absOffset <= 0.15) {
                blur = 0;
              } else if (absOffset <= 1.0) {
                blur = ((absOffset - 0.15) / 0.85) * 2.5;
              } else if (absOffset <= 2.0) {
                blur = 2.5 + (absOffset - 1.0) * 3.0;
              } else {
                blur = Math.min(6.0, 5.5 + (absOffset - 2.0) * 1.5);
              }

              // Continuous opacity: 1.0 at center, ~0.50 on near side, ~0.15 on far side, 0 at 2.6
              let opacity = 1.0;
              if (isMobile) {
                if (absOffset <= 0.15) {
                  opacity = 1.0;
                } else if (absOffset <= 0.7) {
                  opacity = 1.0 - ((absOffset - 0.15) / 0.55) * 0.75;
                } else if (absOffset <= 1.0) {
                  opacity = Math.max(0, 0.25 - ((absOffset - 0.7) / 0.3) * 0.25);
                } else {
                  opacity = 0;
                }
              } else {
                if (absOffset <= 0.15) {
                  opacity = 1.0;
                } else if (absOffset <= 1.0) {
                  opacity = 1.0 - ((absOffset - 0.15) / 0.85) * 0.50;
                } else if (absOffset <= 2.0) {
                  opacity = 0.50 - ((absOffset - 1.0) / 1.0) * 0.35;
                } else {
                  opacity = Math.max(0, 0.15 - ((absOffset - 2.0) / 0.6) * 0.15);
                }
              }

              // Continuous brightness / contrast: subtle darkening for depth
              const brightness = Math.max(0.70, 1 - absOffset * 0.12);

              // Z-Index: Active card always on top with strictly enforced stacking context
              const zIndex = Math.round(50 - absOffset * 20);

              // Dynamic surface opacity: center card is solid 0.94, side cards 0.50
              const bgOpacity = Math.max(0.50, 0.94 - absOffset * 0.44);

              return (
                <div
                  key={feature.id}
                  style={{
                    position: "absolute",
                    width: isMobile ? "min(90vw, 350px)" : "520px",
                    height: isMobile ? "440px" : "480px",
                    zIndex,
                    opacity,
                    filter: `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(2)})`,
                    transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
                    pointerEvents: isStrictActive ? "auto" : "none",
                    willChange: "transform, opacity, filter"
                  }}
                  className="transition-shadow"
                >
                  {/* Floating Translucent Smoked Glass Panel Body */}
                  <div
                    className={`relative w-full h-full rounded-[32px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden backdrop-blur-xl border transition-all duration-300 ${
                      isStrictActive
                        ? "shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]"
                        : "shadow-[0_12px_30px_-10px_rgba(0,0,0,0.50)]"
                    }`}
                    style={{
                      backgroundColor: `rgba(10, 15, 29, ${bgOpacity.toFixed(2)})`,
                      borderColor: isStrictActive ? "rgba(255, 153, 51, 0.35)" : "rgba(255, 255, 255, 0.05)",
                      boxShadow: isStrictActive
                        ? `0 24px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px -12px ${feature.accentLight}`
                        : undefined
                    }}
                  >
                    {/* Top Specular Glass Reflection */}
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none" />

                    {/* Card Header: Pure Editorial Typography */}
                    <div className="space-y-1.5 relative z-10">
                      <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white font-display tracking-tight leading-[1.02]">
                        {feature.title[0]} <br />
                        {feature.title[1]}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed pt-1">
                        {feature.subtitle}
                      </p>
                    </div>

                    {/* Card Feature Content / Dialogue */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                      {feature.renderContent()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stage Padding */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full shrink-0 pb-8 sm:pb-12" />
      </div>
    </section>
  );
}
