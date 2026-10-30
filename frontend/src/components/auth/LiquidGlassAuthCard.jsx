import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AtmosphericLanguageVisual from "./AtmosphericLanguageVisual";

export default function LiquidGlassAuthCard({ mode = "login", children }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, active: false });
  const [isFinePointer, setIsFinePointer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only enable interactive refraction highlight on fine-pointer devices
    if (typeof window !== "undefined" && window.matchMedia) {
      setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!isFinePointer || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-6 overflow-y-auto">
      
      {/* 1. TOP UTILITY BAR: Back to Home + Mode Switcher */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center z-20 mb-3 sm:mb-4 shrink-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.14] backdrop-blur-md transition-all duration-200 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Mode Switcher Pill */}
        <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs shadow-sm">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className={`px-3.5 py-1 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
              mode === "login"
                ? "bg-[#FF9933] text-slate-950 shadow-md shadow-[#FF9933]/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className={`px-3.5 py-1 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
              mode === "signup"
                ? "bg-[#FF9933] text-slate-950 shadow-md shadow-[#FF9933]/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* 2. IMMERSIVE SPLIT LAYOUT: Atmospheric Visual (Left) + Liquid Glass Panel (Right) */}
      <div className="w-full max-w-6xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center z-10">
        
        {/* LEFT COLUMN: Atmospheric Bhasha Language Visual */}
        <div className="lg:col-span-6 w-full hidden md:block">
          <AtmosphericLanguageVisual />
        </div>

        {/* RIGHT COLUMN: Premium Liquid-Glass Authentication Panel */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[460px] rounded-3xl sm:rounded-[32px] p-4 sm:p-7 z-10 transition-all duration-300"
            style={{
              backgroundColor: "rgba(10, 15, 29, 0.70)",
              backdropFilter: "blur(22px) saturate(180%) brightness(1.02)",
              WebkitBackdropFilter: "blur(22px) saturate(180%) brightness(1.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow:
                "0 24px 60px -15px rgba(0, 0, 0, 0.65), 0 0 1px 0 rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Top Specular Edge Bevel (Hairline ambient light catch) */}
            <div
              className="absolute top-0 inset-x-8 h-[1px] pointer-events-none rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.06) 15%, rgba(255, 255, 255, 0.22) 45%, rgba(6, 182, 212, 0.16) 75%, transparent 100%)",
              }}
            />

            {/* Subtle Interactive Pointer Refraction (Max 3.5% opacity) */}
            {isFinePointer && mousePos.active && (
              <div
                className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
                style={{
                  background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.035), transparent 70%)`,
                }}
              />
            )}

            {/* Ambient Acoustic Corner Tone */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[inherit]"
              style={{
                opacity: 0.5,
                background:
                  "radial-gradient(circle at 10% 10%, rgba(255, 153, 51, 0.025), transparent 50%), radial-gradient(circle at 90% 90%, rgba(6, 182, 212, 0.02), transparent 50%)",
              }}
            />

            {/* ========================================================================= */}
            {/* AUTHENTICATION PANEL HEADERS (Mode-Specific)                              */}
            {/* ========================================================================= */}
            <div className="relative text-left mb-4 select-none">
              
              {/* Mobile-only Bhasha Brand Badge */}
              <div className="md:hidden flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-[#FF9933] flex items-center justify-center font-bold text-slate-950 text-xs font-indic">
                  भा
                </div>
                <span className="font-extrabold text-sm tracking-widest text-white font-display">
                  BHASHA
                </span>
              </div>

              {mode === "login" ? (
                <>
                  <h2 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight font-display">
                    Welcome back.
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 font-normal mt-1 leading-relaxed">
                    Continue your conversations across India.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-[26px] font-extrabold text-white tracking-tight font-display">
                    Start speaking naturally.
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 font-normal mt-1 leading-relaxed">
                    Create your Bhasha account and make every conversation easier.
                  </p>
                </>
              )}

              {/* Minimal Divider */}
              <div className="w-12 h-[1px] bg-white/[0.08] mt-3" />
            </div>

            {/* ========================================================================= */}
            {/* CLERK EMBEDDED AUTH COMPONENT                                             */}
            {/* ========================================================================= */}
            <div className="relative min-h-0 flex flex-col justify-center transition-all duration-300">
              {children}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
