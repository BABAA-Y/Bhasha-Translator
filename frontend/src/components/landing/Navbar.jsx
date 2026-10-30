import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Mic, Sparkles } from "lucide-react";

export default function Navbar({ onOpenDemo, onOpenAuth }) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [liquidSheenX, setLiquidSheenX] = useState(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    // Check user motion preferences
    if (typeof window !== "undefined" && window.matchMedia) {
      prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      setScrollY(currentY);

      // Continuous normalized progress from 0 (top of page) to 1 (100px down)
      const progress = Math.min(1, Math.max(0, currentY / 90));
      setScrollProgress(progress);
      setIsScrolled(currentY > 15);

      if (!prefersReducedMotion.current) {
        // Mark as actively scrolling
        setIsScrolling(true);

        // Fluid dynamic liquid shift proportional to scroll position & delta
        setLiquidSheenX((prev) => {
          const target = 10 + ((currentY * 0.35 + deltaY * 1.5) % 120);
          return Math.max(0, Math.min(140, target));
        });

        // Settle smoothly after scrolling stops
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 180);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call in case page is loaded scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-out ${
          isScrolled ? "pt-2.5 sm:pt-3.5" : "pt-4 sm:pt-6"
        }`}
      >
        <nav
          className={`pointer-events-auto relative mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
            isScrolled
              ? "max-w-6xl rounded-2xl md:rounded-full px-4 sm:px-6 py-2.5 sm:py-3"
              : "max-w-7xl rounded-2xl px-2 sm:px-4 py-3 sm:py-4"
          }`}
          style={{
            // Smooth dynamic frosted liquid glass styling
            backgroundColor: isScrolled
              ? `rgba(9, 14, 26, ${Math.min(0.64, 0.36 + scrollProgress * 0.28)})`
              : "rgba(7, 11, 18, 0)",
            backdropFilter: isScrolled
              ? `blur(${Math.max(8, Math.min(18, scrollProgress * 16))}px) saturate(${130 + Math.round(scrollProgress * 40)}%) brightness(1.02)`
              : "none",
            WebkitBackdropFilter: isScrolled
              ? `blur(${Math.max(8, Math.min(18, scrollProgress * 16))}px) saturate(${130 + Math.round(scrollProgress * 40)}%) brightness(1.02)`
              : "none",
            border: isScrolled
              ? `1px solid rgba(255, 255, 255, ${Math.min(0.09, 0.03 + scrollProgress * 0.06)})`
              : "1px solid rgba(255, 255, 255, 0)",
            boxShadow: isScrolled
              ? `0 16px 36px -12px rgba(0, 0, 0, ${Math.min(0.48, 0.18 + scrollProgress * 0.28)}), 0 0 1px 0 rgba(255, 255, 255, 0.06)`
              : "none",
          }}
        >
          {/* ========================================================================= */}
          {/* LIQUID GLASS OPTICAL ACCENTS                                              */}
          {/* ========================================================================= */}
          
          {/* Subtle Top Specular Light Bevel (Edge catching ambient photons) */}
          <div
            className="absolute top-0 inset-x-8 h-[1px] pointer-events-none rounded-full transition-opacity duration-500"
            style={{
              opacity: isScrolled ? (isScrolling ? 0.85 : 0.55) : 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 15%, rgba(255,255,255,0.16) 45%, rgba(6,182,212,0.12) 75%, transparent 100%)",
            }}
          />

          {/* Dynamic Liquid Refraction Sheen (Visible subtly only while scrolling) */}
          {!prefersReducedMotion.current && (
            <div
              className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden transition-opacity duration-300"
              style={{
                opacity: isScrolled && isScrolling ? 0.7 : 0,
              }}
            >
              <div
                className="absolute inset-y-0 w-2/5 transition-transform duration-150 ease-out"
                style={{
                  transform: `translateX(${liquidSheenX}%)`,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.025) 40%, rgba(6, 182, 212, 0.02) 60%, transparent 100%)",
                }}
              />
            </div>
          )}

          {/* Subtle Acoustic Tint Accent in the corners */}
          {isScrolled && (
            <div
              className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-700"
              style={{
                opacity: 0.6,
                background:
                  "radial-gradient(circle at 10% 50%, rgba(255, 153, 51, 0.02), transparent 40%), radial-gradient(circle at 90% 50%, rgba(6, 182, 212, 0.02), transparent 40%)",
              }}
            />
          )}

          {/* ========================================================================= */}
          {/* 1. LOGO: Minimal, Dignified & Pristine                                     */}
          {/* ========================================================================= */}
          <a
            href="#"
            className="flex items-center gap-2.5 group relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9933]/50 rounded-xl"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF9933] flex items-center justify-center font-bold text-slate-950 text-sm font-indic shadow-md shadow-[#FF9933]/20 group-hover:scale-105 transition-transform duration-200">
              भा
            </div>
            <span className="font-extrabold text-base tracking-widest text-white font-display drop-shadow-sm">
              BHASHA
            </span>
          </a>

          {/* ========================================================================= */}
          {/* 2. CENTER NAVIGATION LINKS: Clean, Editorial, Frosted Hover                */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-300 relative z-10">
            <a
              href="#features"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
            >
              Features
            </a>
            <a
              href="#capabilities"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
            >
              Capabilities
            </a>
          </div>

          {/* ========================================================================= */}
          {/* 3. RIGHT SIDE: AUTH + LIVE DEMO CTA                                       */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-3 relative z-10">
            <button
              type="button"
              onClick={() => onOpenAuth("login")}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth("signup")}
              className="text-xs font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.10] border border-white/[0.08] hover:border-white/[0.14] px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Sign up
            </button>

            <button
              type="button"
              onClick={onOpenDemo}
              className="btn-tactile px-4 py-2 rounded-xl text-xs font-bold text-slate-950 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5 text-slate-950" />
              <span>Try Live Demo</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 4. MOBILE MENU TOGGLE                                                     */}
          {/* ========================================================================= */}
          <div className="md:hidden flex items-center gap-2 relative z-10">
            <button
              type="button"
              onClick={onOpenDemo}
              className="btn-tactile text-xs font-bold text-slate-950 px-3 py-1.5 rounded-lg active:scale-95 transition cursor-pointer"
            >
              Demo
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 5. MOBILE FLOATING DROPDOWN CARD                                          */}
          {/* ========================================================================= */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-[calc(100%+8px)] left-0 right-0 bg-[#090E1A]/90 backdrop-blur-2xl border border-white/[0.09] rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-300 hover:text-white py-1 transition-colors"
              >
                Features
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-300 hover:text-white py-1 transition-colors"
              >
                Capabilities
              </a>

              <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("login");
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-center border border-white/[0.08] rounded-xl text-slate-300 hover:bg-white/[0.04] transition"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("signup");
                  }}
                  className="flex-1 py-2.5 text-xs font-bold text-center bg-[#FF9933] text-slate-950 rounded-xl active:scale-95 transition shadow-md shadow-[#FF9933]/20"
                >
                  Sign up
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
