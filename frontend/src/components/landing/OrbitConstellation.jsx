import React, { useState, useEffect, useRef } from "react";
import { Volume2, Play, Pause } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function OrbitConstellation() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState("both"); // "A", "B", or "both"
  const animTimeoutRef = useRef(null);

  // Measure scroll progress relative to viewport center
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const winH = window.innerHeight;
            // Progress goes 0 -> 1 as section moves into view
            const prog = Math.min(1, Math.max(0, (winH - rect.top) / (winH * 0.85)));
            setScrollProgress(prog);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interactive Live Audio Exchange Demo
  const handlePlayExchange = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveSpeaker("A");

    // Play Hindi phrase
    soundFx.playNaturalBhashaSound("भैया, यहाँ रोक देना।");

    // Transition to Bhasha Core and then Tamil Speaker
    animTimeoutRef.current = setTimeout(() => {
      setActiveSpeaker("B");
      soundFx.playNaturalBhashaSound("அண்ணா, இங்கே நிறுத்துங்கள்.");

      animTimeoutRef.current = setTimeout(() => {
        setIsPlaying(false);
        setActiveSpeaker("both");
      }, 2400);
    }, 2200);
  };

  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  // Determine stage based on scroll progress
  // 0-25%: quiet, 25-50%: Speaker A active, 50-70%: Bhasha pulse, 70-100%: fully connected
  const isAActive = isPlaying ? activeSpeaker === "A" || activeSpeaker === "both" : scrollProgress >= 0.25;
  const isBActive = isPlaying ? activeSpeaker === "B" || activeSpeaker === "both" : scrollProgress >= 0.65;
  const isCorePulse = isPlaying || (scrollProgress >= 0.45 && scrollProgress <= 0.85);

  return (
    <section
      id="constellation"
      ref={sectionRef}
      className="py-24 sm:py-32 relative overflow-hidden select-none bg-[#070B12]"
    >
      {/* Deep Atmospheric Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FF9933]/07 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#10B981]/06 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT: CONVERSATION ORBIT VISUAL                                           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex justify-center items-center relative">
            <div className="relative w-[340px] h-[380px] sm:w-[480px] sm:h-[540px] lg:w-[520px] lg:h-[580px] flex items-center justify-center">
              
              {/* Outer Ambient Glows */}
              <div
                className={`absolute top-4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FF9933]/15 rounded-full blur-[90px] pointer-events-none transition-opacity duration-700 ${
                  isAActive ? "opacity-100" : "opacity-30"
                }`}
              />
              <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#10B981]/15 rounded-full blur-[90px] pointer-events-none transition-opacity duration-700 ${
                  isBActive ? "opacity-100" : "opacity-30"
                }`}
              />

              {/* Dynamic SVG Conversation Orbit Field */}
              <svg
                viewBox="0 0 520 580"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              >
                <defs>
                  {/* Saffron to Emerald Gradient */}
                  <linearGradient id="orbitBridgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF9933" stopOpacity={isAActive ? "0.9" : "0.3"} />
                    <stop offset="50%" stopColor="#06B6D4" stopOpacity={isCorePulse ? "1" : "0.4"} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={isBActive ? "0.9" : "0.3"} />
                  </linearGradient>
                </defs>

                {/* Outer Circular Field Ring */}
                <circle
                  cx="260"
                  cy="290"
                  r="230"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeWidth="1.5"
                />

                {/* Inner Dashed Orbital Ring */}
                <circle
                  cx="260"
                  cy="290"
                  r="165"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                />

                {/* Central Audio Stream Line from Speaker A through Core to Speaker B */}
                <path
                  d="M 260 100 C 230 180, 230 250, 260 290 C 290 330, 290 400, 260 480"
                  fill="none"
                  stroke="url(#orbitBridgeGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />

                {/* Harmonic Lateral Wave Curves (Left & Right Flanks) */}
                <path
                  d="M 90 290 Q 140 260, 190 290 T 290 290 T 430 290"
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.25)"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
                <path
                  d="M 120 290 Q 170 310, 220 290 T 320 290 T 400 290"
                  fill="none"
                  stroke="rgba(255, 153, 51, 0.2)"
                  strokeWidth="1.2"
                />

                {/* Travelling Voice Pulses */}
                <circle
                  cx="260"
                  cy="195"
                  r={isAActive ? "4" : "2"}
                  fill="#FF9933"
                  className={isAActive ? "animate-ping" : ""}
                />
                <circle
                  cx="260"
                  cy="385"
                  r={isBActive ? "4" : "2"}
                  fill="#10B981"
                  className={isBActive ? "animate-ping" : ""}
                />
              </svg>

              {/* SPEAKER A (Hindi) - Top Arc */}
              <div className="absolute top-2 sm:top-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-20 pointer-events-auto w-full px-4">
                <div className="flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#FF9933]/10 border border-[#FF9933]/25 backdrop-blur-md">
                  <span className={`w-2 h-2 rounded-full bg-[#FF9933] ${isAActive ? "animate-pulse" : "opacity-60"}`} />
                  <span className="text-xs font-semibold text-[#FF9933] tracking-wide">Speaker A • Hindi</span>
                </div>
                <div
                  className={`text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-indic tracking-tight transition-all duration-500 ${
                    isAActive ? "scale-105 text-white drop-shadow-[0_0_25px_rgba(255,153,51,0.5)]" : "opacity-60 text-slate-300"
                  }`}
                >
                  "भैया, यहाँ रोक देना।"
                </div>
              </div>

              {/* CENTER: BHASHA LIVING NUCLEUS */}
              <div
                onClick={handlePlayExchange}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer group"
                title="Tap to hear live conversation exchange"
              >
                {/* Breathing Ambient Aura */}
                <div
                  className={`absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#FF9933]/25 via-cyan-400/20 to-[#10B981]/25 blur-xl pointer-events-none transition-all duration-500 ${
                    isCorePulse ? "scale-125 opacity-100" : "scale-90 opacity-40"
                  }`}
                />

                {/* Obsidian Core Circle */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#070B12] border-2 border-white/20 shadow-[0_0_35px_rgba(255,153,51,0.25)] flex flex-col items-center justify-center p-3 text-center transition-all duration-300 group-hover:scale-105 group-hover:border-white/40">
                  {/* Subtle rotating glow ring */}
                  <div
                    className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FF9933] via-[#06B6D4] to-[#10B981] opacity-35 blur-[2px] -z-10 animate-spin"
                    style={{ animationDuration: "14s" }}
                  />

                  <span className="text-2xl sm:text-3xl font-black text-white font-indic tracking-wider">
                    भाषा
                  </span>
                  <span className="text-[10px] tracking-widest text-[#FF9933] font-bold mt-0.5 uppercase">
                    BHASHA
                  </span>
                </div>
              </div>

              {/* SPEAKER B (Tamil) - Bottom Arc */}
              <div className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-20 pointer-events-auto w-full px-4">
                <div
                  className={`text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-indic tracking-tight transition-all duration-500 mb-2 ${
                    isBActive ? "scale-105 text-white drop-shadow-[0_0_25px_rgba(16,185,129,0.5)]" : "opacity-60 text-slate-300"
                  }`}
                >
                  "அண்ணா, இங்கே நிறுத்துங்கள்."
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 backdrop-blur-md">
                  <span className={`w-2 h-2 rounded-full bg-[#10B981] ${isBActive ? "animate-pulse" : "opacity-60"}`} />
                  <span className="text-xs font-semibold text-[#10B981] tracking-wide">Speaker B • Tamil</span>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: EDITORIAL STORY & INTERACTION                                      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-8 select-none">
            
            <div className="space-y-4">
              <span className="text-sm font-semibold tracking-wider text-[#FF9933] uppercase">
                Live conversation
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-black text-white font-display tracking-tight leading-[1.02]">
                Talk naturally. <br />
                <span className="text-slate-300">Bhasha follows.</span>
              </h2>
            </div>

            <p className="text-lg sm:text-xl text-slate-300 max-w-lg leading-relaxed font-normal">
              Place the phone between two people. Speak naturally in your own language — Bhasha handles the conversation in both directions.
            </p>

            {/* Seamless Language Transformation Showcase */}
            <div className="pt-2 space-y-4 max-w-lg">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933] animate-pulse shrink-0" />
                <span className="text-2xl sm:text-3xl font-extrabold text-[#FF9933] font-indic tracking-tight">
                  "भैया, यहाँ रोक देना।"
                </span>
              </div>

              {/* Connecting Bridge Line */}
              <div className="flex items-center gap-4 pl-4 py-1">
                <div className="w-px h-8 bg-gradient-to-b from-[#FF9933] via-cyan-400 to-[#10B981]" />
                <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                  Instant two-way voice translation
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                <span className="text-2xl sm:text-3xl font-extrabold text-[#10B981] font-indic tracking-tight">
                  "அண்ணா, இங்கே நிறுத்துங்கள்."
                </span>
              </div>

              <p className="text-sm text-slate-400 italic pt-1 pl-6">
                "Brother, please drop me off right here."
              </p>
            </div>

            {/* Interactive Audio Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePlayExchange}
                className="btn-tactile px-7 py-4 rounded-2xl text-sm font-bold text-slate-950 flex items-center gap-3 active:scale-95 transition cursor-pointer shadow-xl"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 text-slate-950" />
                    <span>Speaking exchange...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-slate-950" />
                    <span>Hear Live Exchange</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
