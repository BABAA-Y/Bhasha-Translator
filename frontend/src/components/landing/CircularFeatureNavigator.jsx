import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Mic, Sparkles, Languages, Volume2, MapPin, 
  ShieldAlert, Camera, MessageSquareQuote, ArrowRight 
} from "lucide-react";
import { soundFx } from "../../services/soundEffects";

// Color helper for dynamic alpha blending
function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 8 Dynamic Capability Shapes Configuration (Subtle & clean geometries, no cartoonish clippings)
const CAPABILITY_SHAPES = {
  live: {
    name: "radial-circle",
    getBorderRadius: (isMobile) => (isMobile ? "24px" : "48px"),
    ambientBlur: "blur(35px)"
  },
  context: {
    name: "technical-square",
    getBorderRadius: () => "8px",
    ambientBlur: "blur(30px)"
  },
  hinglish: {
    name: "hex-chamfer",
    getBorderRadius: (isMobile) => (isMobile ? "18px 6px 18px 6px" : "28px 6px 28px 6px"),
    ambientBlur: "blur(35px)"
  },
  voice: {
    name: "horizontal-capsule",
    getBorderRadius: (isMobile) => (isMobile ? "24px" : "64px"),
    ambientBlur: "blur(35px)"
  },
  travel: {
    name: "asymmetric-ticket",
    getBorderRadius: (isMobile) => (isMobile ? "20px 6px 20px 6px" : "28px 8px 28px 8px"),
    ambientBlur: "blur(35px)"
  },
  emergency: {
    name: "shield",
    getBorderRadius: (isMobile) => (isMobile ? "18px 18px 28px 28px" : "22px 22px 36px 36px"),
    ambientBlur: "blur(30px)"
  },
  camera: {
    name: "lens-viewfinder",
    getBorderRadius: () => "18px",
    ambientBlur: "blur(35px)"
  },
  explain: {
    name: "speech-bubble",
    getBorderRadius: (isMobile) => (isMobile ? "20px 20px 20px 6px" : "28px 28px 28px 6px"),
    ambientBlur: "blur(35px)"
  }
};

export default function CircularFeatureNavigator({ onOpenDemo }) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [currentAngleState, setCurrentAngleState] = useState(0);
  const [revealProgress, setRevealProgress] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);

  // Screen size listener
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 8 Major Capabilities with bespoke shapes & themes
  const capabilities = useMemo(() => [
    {
      id: "live",
      label: "Live Conversation",
      icon: Mic,
      color: "#EC4899", // 01 Pink / Rose
      shape: "radial-circle",
      headline: "Face-to-Face Dual Audio Stream",
      description: "Place your phone between two people. Bhasha listens, understands regional cadence, and speaks translated voice automatically without button confusion.",
      demo: {
        type: "dialogue",
        sourceLang: "Hindi",
        sourceText: "भैया, यहाँ रोक देना",
        targetLang: "Tamil",
        targetText: "அண்ணா, இங்கே நிறுத்துங்கள்.",
        meaning: "Brother, please drop me off right here."
      }
    },
    {
      id: "context",
      label: "Context Aware",
      icon: Sparkles,
      color: "#FF9933", // 02 Bhasha Orange
      shape: "technical-square",
      headline: "Meaning Over Literal Word Swaps",
      description: "Understands street idioms, respect markers (Bhaiya, Anna, Chetta), and situational transit phrasing rather than rigid textbook dictionary translations.",
      demo: {
        type: "context_morph",
        literal: "Brother, will you walk by the meter?",
        context: "Anna, can you drop me here?",
        native: "அண்ணா, மீட்டருக்கு வருவீங்களா?"
      }
    },
    {
      id: "hinglish",
      label: "Hinglish & Code-Switching",
      icon: Languages,
      color: "#8B5CF6", // 03 Violet
      shape: "hex-chamfer",
      headline: "Conversational Code-Switching",
      description: "Handles natural Indian speech mixing Hindi grammar, English technical loanwords, and regional dialect without audio dropouts or transcription failures.",
      demo: {
        type: "code_switch",
        vernacular: "Bhaiya, ",
        loanwords: "online payment QR code ",
        vernacularEnd: "चलेगा क्या?",
        subtext: "Accurately parses mixed vocabulary without hesitation."
      }
    },
    {
      id: "voice",
      label: "Natural Voice",
      icon: Volume2,
      color: "#10B981", // 04 Emerald
      shape: "horizontal-capsule",
      headline: "Authentic Human Cadence",
      description: "Neural voice synthesis with natural human breath and local cadence, avoiding the flat robotic timbre of legacy translators.",
      demo: {
        type: "audio_playback",
        phrase: "ஒரு ஸ்ட்ராங் டீயும் தண்ணீரும் கொடுங்கள்.",
        phonetic: "Oru strong tea-yum thanneerum kodungal.",
        meaning: "Please give me one strong tea and a glass of water."
      }
    },
    {
      id: "travel",
      label: "India Travel / Street & Transit",
      icon: MapPin,
      color: "#06B6D4", // 05 Cyan / Teal
      shape: "asymmetric-ticket",
      headline: "Everyday Indian Transit Phrasing",
      description: "Designed for railway platforms, auto stands, street markets, and metro ticket counters without formal textbook phrasing.",
      demo: {
        type: "transit_split",
        spotA: "Railway Platform",
        inputA: "Platform 4 kidhar hai?",
        outputA: "பிளாட்பார்ம் 4 எந்த பக்கம்?",
        spotB: "Street Market",
        inputB: "Bhaiya, kul kitna hua?",
        outputB: "ಇದು ಎಷ್ಟು ರೂಪಾಯಿ?"
      }
    },
    {
      id: "emergency",
      label: "Offline Emergency",
      icon: ShieldAlert,
      color: "#EF4444", // 06 Red / Coral
      shape: "shield",
      headline: "Sovereign On-Device Standby",
      description: "Critical transit phrases pre-cached for emergency clinics, police desks, and railway platforms when you lose cellular connectivity.",
      demo: {
        type: "emergency_sos",
        status: "Offline Standby",
        query: "Emergency: Mujhe doctor ki zaroorat hai",
        translated: "எனக்கு ஒரு மருத்துவர் தேவை (Doctor needed urgently)"
      }
    },
    {
      id: "camera",
      label: "Camera Translator",
      icon: Camera,
      color: "#F59E0B", // 07 Amber / Gold
      shape: "lens-viewfinder",
      headline: "Real-Time Visual Script OCR",
      description: "Point your camera at street signboards, restaurant menus, platform directions, or prescription labels for immediate overlay translation.",
      demo: {
        type: "camera_ocr",
        signOriginal: "ಪ್ರವೇಶ ದ್ವಾರ ೪",
        signTranslated: "Exit Gate 4 (Hindi: निकास द्वार 4)"
      }
    },
    {
      id: "explain",
      label: "Explain This",
      icon: MessageSquareQuote,
      color: "#3B82F6", // 08 Blue
      shape: "speech-bubble",
      headline: "Colloquial Meaning Over Literal Swaps",
      description: "Unpacks regional metaphors, street idioms, and culturally nuanced expressions that literal machine translation misinterprets.",
      demo: {
        type: "explain_idiom",
        phrase: "जुगाड़ कर लेंगे",
        meaning: "We'll figure out an ingenious, practical workaround.",
        context: "Iconic Indian expression representing resourcefulness and agility under constraints."
      }
    }
  ], []);

  const active = capabilities[activeNodeIndex] || capabilities[0];
  const currentShape = CAPABILITY_SHAPES[active.id] || CAPABILITY_SHAPES.context;
  const radius = isMobile ? 104 : 172;
  const focalAngle = isMobile ? Math.PI / 2 : 0; // 6 o'clock on mobile, 3 o'clock on desktop

  // Smooth rAF lerp loop for fluid, non-jerky rotation
  useEffect(() => {
    let animId;
    let lastRenderAngle = 0;

    const tick = () => {
      const diff = targetAngleRef.current - currentAngleRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentAngleRef.current += diff * 0.12;
      } else {
        currentAngleRef.current = targetAngleRef.current;
      }

      if (Math.abs(currentAngleRef.current - lastRenderAngle) > 0.0008) {
        lastRenderAngle = currentAngleRef.current;
        setCurrentAngleState(currentAngleRef.current);

        // Find capability closest to focal position
        const focal = isMobile ? Math.PI / 2 : 0;
        let closestIdx = 0;
        let minDistance = Infinity;

        for (let i = 0; i < capabilities.length; i++) {
          const nodeAngle = (i * (2 * Math.PI / capabilities.length)) + currentAngleRef.current;
          let angleDiff = (nodeAngle - focal) % (2 * Math.PI);
          if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
          if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
          const dist = Math.abs(angleDiff);

          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = i;
          }
        }

        setActiveNodeIndex(closestIdx);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isMobile, capabilities.length]);

  // Scroll listener for sticky pin & continuous scroll-driven rotation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollDist = rect.height - vh;

      // 1. Reveal progress for entering overlay
      if (rect.top >= vh) {
        setRevealProgress(0);
      } else if (rect.top <= 0) {
        setRevealProgress(1);
      } else {
        const p = (vh - rect.top) / vh;
        setRevealProgress(Math.max(0, Math.min(1, p)));
      }

      // 2. Scroll-driven continuous orbit rotation
      if (scrollDist > 0 && rect.top <= 0 && rect.top >= -scrollDist) {
        const scrollFraction = Math.max(0, Math.min(1, -rect.top / scrollDist));
        const focal = isMobile ? Math.PI / 2 : 0;
        const totalAngleSweep = 7 * (2 * Math.PI / capabilities.length);
        targetAngleRef.current = focal - (scrollFraction * totalAngleSweep);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, capabilities.length]);

  // Node selection handler with shortest-path rotation
  const handleSelectNode = (idx) => {
    setActiveNodeIndex(idx);
    const focal = isMobile ? Math.PI / 2 : 0;
    const targetBase = focal - idx * (2 * Math.PI / capabilities.length);
    
    // Choose shortest angular path
    const twoPi = 2 * Math.PI;
    const k = Math.round((currentAngleRef.current - targetBase) / twoPi);
    targetAngleRef.current = targetBase + k * twoPi;
  };

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      style={{ height: isMobile ? "280vh" : "360vh" }}
      className="relative z-20 -mt-[100vh] bg-[#070B12] rounded-t-[40px] sm:rounded-t-[56px] border-t border-white/[0.08] shadow-[0_-30px_80px_rgba(0,0,0,0.95)]"
    >
      {/* Sticky Viewport Stage */}
      <div 
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-4 sm:py-8 select-none"
        style={{
          opacity: Math.min(1, revealProgress * 1.4),
          transform: `translateY(${((1 - revealProgress) * 70).toFixed(1)}px)`,
          willChange: revealProgress < 1 ? "opacity, transform" : undefined
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full max-h-[96vh] flex flex-col justify-between">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-4 sm:mb-8 space-y-2 shrink-0">
            <span className="text-xs font-semibold tracking-wider text-[#FF9933] uppercase">
              Interactive Product Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-[1.05]">
              Engineered for India.
            </h2>
            <p className="hidden sm:block text-sm sm:text-base text-slate-300">
              Scroll down to orbit through system capabilities, or select any node directly.
            </p>
          </div>

          {/* Dynamic 2-Column Product Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center flex-1 my-auto">
            
            {/* ========================================================================= */}
            {/* LEFT: MINIMAL PHYSICAL ORBIT DIAL                                         */}
            {/* ========================================================================= */}
            <div className="lg:col-span-6 flex justify-center items-center relative py-1 sm:py-4">
              <div 
                className="relative flex items-center justify-center"
                style={{
                  width: isMobile ? "236px" : "390px",
                  height: isMobile ? "236px" : "390px"
                }}
              >
                
                {/* Thin Outer Orbit Guide Ring */}
                <div className="absolute inset-0 rounded-full border border-white/[0.06] pointer-events-none" />
                
                {/* Thin Inner Reference Ring */}
                <div className="absolute inset-7 sm:inset-14 rounded-full border border-dashed border-white/[0.03] pointer-events-none" />

                {/* CENTER: FIXED BHASHA CORE DIAL (Clean, stable anchor; no decorative sub-labels) */}
                <div className="relative z-20 flex items-center justify-center select-none pointer-events-auto">
                  
                  {/* Layer 1: Soft restrained ambient aura */}
                  <div 
                    className="absolute -inset-3 sm:-inset-5 rounded-full pointer-events-none transition-all duration-700 ease-out"
                    style={{
                      background: `radial-gradient(circle, ${hexToRgba(active.color, 0.15)} 0%, ${hexToRgba(active.color, 0.04)} 45%, transparent 75%)`,
                      filter: "blur(14px)",
                      opacity: 0.8
                    }}
                  />

                  {/* Layer 2: Solid Dark Navy Center Enclosure with Synchronized Accent Rim */}
                  <div 
                    className="relative z-10 w-22 h-22 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center p-2 sm:p-3 text-center transition-all duration-500"
                    style={{
                      backgroundColor: "rgba(10, 15, 29, 0.96)",
                      border: `1px solid ${hexToRgba(active.color, 0.25)}`,
                      boxShadow: `0 0 14px ${hexToRgba(active.color, 0.12)}, 0 12px 28px rgba(0, 0, 0, 0.7)`
                    }}
                  >
                    {/* Precision inner bezel line */}
                    <div className="absolute inset-1 rounded-full border border-white/[0.05] pointer-events-none" />

                    {/* Crisp Typography */}
                    <span className="relative z-10 text-xl sm:text-3xl font-black text-white font-indic tracking-wide drop-shadow-sm">
                      भाषा
                    </span>
                    <span className="relative z-10 text-[9px] sm:text-[11px] tracking-[0.25em] text-slate-300 font-bold mt-0.5 uppercase">
                      BHASHA
                    </span>
                  </div>
                </div>

                {/* ORBITING CAPABILITY NODES (8 Nodes) */}
                {capabilities.map((cap, idx) => {
                  const Icon = cap.icon;
                  
                  // Compute node angle along orbit
                  const angle = (idx * (2 * Math.PI / capabilities.length)) + currentAngleState;
                  
                  // Angular distance to focal point
                  let diff = (angle - focalAngle) % (2 * Math.PI);
                  if (diff < -Math.PI) diff += 2 * Math.PI;
                  if (diff > Math.PI) diff -= 2 * Math.PI;
                  const dist = Math.abs(diff);
                  
                  // Proximity weight (1.0 at focal point, 0.0 at 45 deg away)
                  const proximity = Math.max(0, 1 - dist / (Math.PI / 4));
                  const isStrictActive = proximity > 0.85;

                  const scale = 1.0 + 0.08 * proximity;
                  const nodeOpacity = 0.45 + 0.55 * proximity;

                  const bgColor = isStrictActive
                    ? hexToRgba(cap.color, 0.08)
                    : "#0B1324";
                  
                  const borderColor = isStrictActive
                    ? cap.color
                    : "rgba(148, 163, 184, 0.10)";
                  
                  const iconColor = isStrictActive
                    ? cap.color
                    : "#64748B";
                  
                  const boxShadow = isStrictActive
                    ? `0 0 12px ${hexToRgba(cap.color, 0.22)}, 0 4px 12px rgba(0, 0, 0, 0.4)`
                    : "none";

                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);

                  return (
                    <button
                      type="button"
                      key={cap.id}
                      onClick={() => handleSelectNode(idx)}
                      onMouseEnter={() => handleSelectNode(idx)}
                      style={{
                        width: isMobile ? "34px" : "44px",
                        height: isMobile ? "34px" : "44px",
                        transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scale.toFixed(3)})`,
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                        borderWidth: isStrictActive ? "1.5px" : "1px",
                        borderStyle: "solid",
                        color: iconColor,
                        opacity: nodeOpacity,
                        boxShadow: boxShadow,
                        willChange: "transform, opacity"
                      }}
                      className="absolute z-30 rounded-xl flex items-center justify-center cursor-pointer transition-colors duration-200"
                      title={cap.label}
                      aria-label={cap.label}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform" />
                    </button>
                  );
                })}

              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT: CLEAN DYNAMIC CAPABILITY PANEL (PURE PRODUCT INTERFACE)            */}
            {/* ========================================================================= */}
            <div className="lg:col-span-6 w-full relative">
              
              {/* Very Subtle Ambient Glow behind active panel */}
              <div 
                className="absolute -inset-8 rounded-full pointer-events-none transition-all duration-700 ease-out -z-10"
                style={{
                  background: `radial-gradient(circle, ${hexToRgba(active.color, 0.06)} 0%, transparent 70%)`,
                  filter: currentShape.ambientBlur
                }}
              />

              {/* Dynamic Shape Surface Panel with Smooth Geometric Transitions */}
              <div 
                className="relative p-6 sm:p-8 space-y-5 overflow-hidden transition-all duration-500 ease-out"
                style={{
                  backgroundColor: "rgba(10, 15, 29, 0.94)",
                  borderRadius: currentShape.getBorderRadius(isMobile),
                  border: `1px solid ${hexToRgba(active.color, 0.16)}`,
                  boxShadow: `0 0 0 1px ${hexToRgba(active.color, 0.08)}, 0 20px 60px rgba(0, 0, 0, 0.40)`
                }}
              >
                
                {/* Capability Header (Icon + Category + Title) */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500"
                    style={{
                      backgroundColor: "rgba(10, 15, 29, 0.92)",
                      border: `1px solid ${hexToRgba(active.color, 0.28)}`,
                      color: active.color,
                      boxShadow: `0 0 14px ${hexToRgba(active.color, 0.12)}`
                    }}
                  >
                    <active.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: active.color }}
                      />
                      <span 
                        className="text-xs font-semibold uppercase tracking-wider transition-colors duration-500"
                        style={{ color: active.color }}
                      >
                        {active.label}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-display tracking-tight">
                      {active.headline}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {active.description}
                </p>

                {/* DYNAMIC FEATURE DEMONSTRATION WIDGET (Clean content, zero presentation annotations) */}
                <div 
                  className="p-4 sm:p-5 rounded-2xl space-y-3 transition-colors duration-500"
                  style={{
                    backgroundColor: "#070B14",
                    border: "1px solid rgba(148, 163, 184, 0.06)"
                  }}
                >
                  
                  {/* 1. Live Dialogue Demo */}
                  {active.demo.type === "dialogue" && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span style={{ color: active.color }} className="font-medium">Hindi Input</span>
                        <span className="font-medium text-slate-400">Tamil Output</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-base sm:text-lg font-bold text-white font-indic">
                          "{active.demo.sourceText}"
                        </span>
                        <span className="text-slate-500 font-mono">→</span>
                        <span className="text-base sm:text-lg font-bold font-indic text-right" style={{ color: active.color }}>
                          "{active.demo.targetText}"
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 italic">
                        "{active.demo.meaning}"
                      </p>
                    </div>
                  )}

                  {/* 2. Context Aware Demo */}
                  {active.demo.type === "context_morph" && (
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400 line-through opacity-70">
                        "{active.demo.literal}"
                      </div>
                      <div className="text-base sm:text-lg font-bold font-indic" style={{ color: active.color }}>
                        "{active.demo.native}"
                      </div>
                      <p className="text-xs text-slate-300">
                        "{active.demo.context}"
                      </p>
                    </div>
                  )}

                  {/* 3. Hinglish Code Switch Demo */}
                  {active.demo.type === "code_switch" && (
                    <div className="space-y-2">
                      <div className="text-base sm:text-lg font-bold leading-relaxed text-white">
                        <span className="font-indic">"{active.demo.vernacular}</span>
                        <span style={{ color: active.color }} className="font-semibold">{active.demo.loanwords}</span>
                        <span className="font-indic">{active.demo.vernacularEnd}"</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {active.demo.subtext}
                      </p>
                    </div>
                  )}

                  {/* 4. Natural Voice Demo */}
                  {active.demo.type === "audio_playback" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-base sm:text-lg font-bold text-white font-indic">
                          "{active.demo.phrase}"
                        </span>
                        <button
                          type="button"
                          onClick={() => soundFx.playNaturalBhashaSound(active.demo.phrase)}
                          className="px-3.5 py-1.5 rounded-full text-slate-950 active:scale-95 transition cursor-pointer shrink-0 font-semibold text-xs flex items-center gap-1.5"
                          style={{
                            backgroundColor: active.color,
                            boxShadow: `0 2px 10px ${hexToRgba(active.color, 0.35)}`
                          }}
                          title="Play natural audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-1 h-3 pt-0.5">
                        {[30, 60, 95, 45, 80, 100, 65, 85, 40, 75, 90, 50, 70, 35].map((h, i) => (
                          <span
                            key={i}
                            style={{ 
                              height: `${h}%`, 
                              animationDelay: `${i * 0.06}s`,
                              backgroundColor: active.color
                            }}
                            className="w-1 rounded-full opacity-70"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 italic">
                        "{active.demo.meaning}"
                      </p>
                    </div>
                  )}

                  {/* 5. Transit Split Demo */}
                  {active.demo.type === "transit_split" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02]">
                        <span className="text-xs sm:text-sm font-bold text-white font-indic">
                          "{active.demo.inputA}"
                        </span>
                        <span className="text-xs sm:text-sm font-bold font-indic text-right" style={{ color: active.color }}>
                          "{active.demo.outputA}"
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02]">
                        <span className="text-xs sm:text-sm font-bold text-white font-indic">
                          "{active.demo.inputB}"
                        </span>
                        <span className="text-xs sm:text-sm font-bold font-indic text-right" style={{ color: active.color }}>
                          "{active.demo.outputB}"
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 6. Emergency SOS Demo */}
                  {active.demo.type === "emergency_sos" && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-rose-400">
                        {active.demo.status}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-white">
                        "{active.demo.query}"
                      </div>
                      <div className="text-sm sm:text-base font-bold text-rose-300 font-indic">
                        → "{active.demo.translated}"
                      </div>
                    </div>
                  )}

                  {/* 7. Camera OCR Demo */}
                  {active.demo.type === "camera_ocr" && (
                    <div className="space-y-1.5">
                      <div className="text-base sm:text-lg font-bold text-amber-200 font-indic">
                        "{active.demo.signOriginal}"
                      </div>
                      <div className="text-sm sm:text-base font-bold" style={{ color: active.color }}>
                        → {active.demo.signTranslated}
                      </div>
                    </div>
                  )}

                  {/* 8. Explain Idiom Demo */}
                  {active.demo.type === "explain_idiom" && (
                    <div className="space-y-1.5">
                      <div className="text-xl sm:text-2xl font-black text-white font-indic tracking-tight">
                        "{active.demo.phrase}"
                      </div>
                      <div className="text-sm sm:text-base font-semibold" style={{ color: active.color }}>
                        {active.demo.meaning}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pt-0.5">
                        {active.demo.context}
                      </p>
                    </div>
                  )}

                </div>

                {/* Bottom Action Trigger */}
                <div className="pt-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={onOpenDemo}
                    className="text-xs font-semibold hover:text-white flex items-center gap-1.5 transition-colors duration-300 cursor-pointer"
                    style={{ color: active.color }}
                  >
                    <span>Try Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
