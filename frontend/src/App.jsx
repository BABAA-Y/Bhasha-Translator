import React, { useState } from "react";

// Persistent Global Particle Background Layer
import GlobalParticleBackground from "./components/landing/GlobalParticleBackground";

// Landing Page Components (4 Refined High-Impact Sections)
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import HorizontalFeatureCards from "./components/landing/HorizontalFeatureCards";
import CircularFeatureNavigator from "./components/landing/CircularFeatureNavigator";
import ShortFinalCTA from "./components/landing/ShortFinalCTA";
import AuthModal from "./components/landing/AuthModal";

// Reusable Scroll Reveal Observer Hook
import { useScrollReveal } from "./hooks/useScrollReveal";

// Full Working Live Translator App
import LiveTranslatorApp from "./components/app/LiveTranslatorApp";

export default function App() {
  const [view, setView] = useState("landing"); // 'landing' or 'app'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  // Activate subtle scroll reveal for major landing sections
  useScrollReveal();

  const handleOpenAuth = (mode = "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenDemo = () => {
    setView("app");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToLanding = () => {
    setView("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-[#F8FAFC] overflow-x-clip selection:bg-[#FF9933]/30 selection:text-white relative">
      {/* Persistent Global Particle Network Background - Fixed across entire page */}
      <GlobalParticleBackground />

      {view === "app" ? (
        <div className="relative z-10">
          <LiveTranslatorApp
            onBackToLanding={handleBackToLanding}
            user={user}
          />
        </div>
      ) : (
        <div className="relative z-10">
          {/* Sticky Top Navbar */}
          <Navbar
            onOpenDemo={handleOpenDemo}
            onOpenAuth={handleOpenAuth}
          />

          {/* Main Flow: 4 Cohesive Sections with Zero Empty Gaps */}
          <main>
            {/* 1. HERO with tightened height, rotating Indic text & 3D Voice Sphere */}
            <Hero onOpenDemo={handleOpenDemo} />

            {/* 2. HORIZONTAL MOVING FEATURE DEMONSTRATIONS */}
            <HorizontalFeatureCards onOpenDemo={handleOpenDemo} />

            {/* 4. CIRCULAR FEATURE NAVIGATOR (8 Capabilities + Interactive Working Demos) */}
            <CircularFeatureNavigator onOpenDemo={handleOpenDemo} />

            {/* 5. SHORT FINAL CTA with language baseline */}
            <ShortFinalCTA onOpenDemo={handleOpenDemo} />
          </main>

          {/* Minimalist Single-Line Baseline */}
          <footer className="py-6 border-t border-white/[0.06] text-center text-xs text-slate-500 font-medium bg-transparent">
            Bhasha • Built for The Great Indian AI Challenge • Gnani.ai
          </footer>

          {/* Auth Modal (Login / Signup) */}
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            initialMode={authMode}
            onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
          />
        </div>
      )}
    </div>
  );
}
