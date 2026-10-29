import React, { useState, useEffect } from "react";
import { Menu, X, Mic } from "lucide-react";

export default function Navbar({ onOpenDemo, onOpenAuth }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070B12]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO: Minimal & Dignified */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#FF9933] flex items-center justify-center font-bold text-slate-950 text-sm font-indic shadow-lg shadow-[#FF9933]/20 group-hover:scale-105 transition">
            भा
          </div>
          <span className="font-extrabold text-base tracking-widest text-white font-display">
            BHASHA
          </span>
        </a>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#capabilities" className="hover:text-white transition">Capabilities</a>
        </div>

        {/* RIGHT SIDE: AUTH + DEMO BUTTON */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenAuth("login")}
            className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-xl transition cursor-pointer"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => onOpenAuth("signup")}
            className="text-xs font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-4 py-2 rounded-xl transition cursor-pointer"
          >
            Sign up
          </button>
          
          <button
            type="button"
            onClick={onOpenDemo}
            className="btn-tactile px-4 py-2 rounded-xl text-xs font-bold text-slate-950 flex items-center gap-1.5 active:scale-95 transition cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-slate-950" />
            <span>Try Live Demo</span>
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenDemo}
            className="btn-tactile text-xs font-bold text-slate-950 px-3 py-1.5 rounded-lg"
          >
            Demo
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0F1D]/95 backdrop-blur-2xl border-b border-white/[0.08] px-6 py-5 space-y-4">
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white"
          >
            Features
          </a>
          <a 
            href="#capabilities" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white"
          >
            Capabilities
          </a>
          
          <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3">
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onOpenAuth("login"); }}
              className="flex-1 py-2.5 text-xs font-semibold text-center border border-white/[0.08] rounded-xl text-slate-300"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onOpenAuth("signup"); }}
              className="flex-1 py-2.5 text-xs font-bold text-center bg-[#FF9933] text-slate-950 rounded-xl"
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
