import React from "react";

export default function Footer({ onOpenDemo }) {
  return (
    <footer className="py-12 bg-[#070B12] border-t border-white/[0.06] text-xs font-mono text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-sm text-white tracking-wider">BHASHA</span>
          <p className="text-[11px] text-slate-500 mt-1">
            Real-time voice communication across Indian languages.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
          <a href="#product" className="hover:text-white transition">Product</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#scenarios" className="hover:text-white transition">Scenarios</a>
          <a href="#architecture" className="hover:text-white transition">Architecture</a>
          <button onClick={onOpenDemo} className="text-[#FF9933] hover:underline font-bold">
            Live Demo
          </button>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-slate-600">
          © {new Date().getFullYear()} Bhasha. Built with Gnani Prisma & Timbre.
        </div>

      </div>
    </footer>
  );
}
