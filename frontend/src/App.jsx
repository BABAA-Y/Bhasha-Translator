import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

// Persistent Global Particle Background Layer
import GlobalParticleBackground from "./components/landing/GlobalParticleBackground";

// Precision Theme-Matched Acoustic Cursor
import BhashaCursor from "./components/common/BhashaCursor";

// Landing Page Components
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import HorizontalFeatureCards from "./components/landing/HorizontalFeatureCards";
import CircularFeatureNavigator from "./components/landing/CircularFeatureNavigator";
import ShortFinalCTA from "./components/landing/ShortFinalCTA";
import AuthModal from "./components/landing/AuthModal";

// Liquid Glass Auth Pages
import AuthPage from "./pages/AuthPage";
import { bhashaClerkAppearance } from "./styles/clerkTheme";

// Reusable Scroll Reveal Observer Hook
import { useScrollReveal } from "./hooks/useScrollReveal";

// Full Working Live Translator App
import LiveTranslatorApp from "./components/app/LiveTranslatorApp";

// 1. Landing Page View Component
function LandingView({ isClerkConfigured }) {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  useScrollReveal();

  const handleOpenDemo = () => {
    navigate("/app");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenAuth = (mode = "login") => {
    navigate(mode === "login" ? "/login" : "/signup");
  };

  return (
    <div className="relative z-10">
      {/* Dynamic Frosted Liquid Glass Navbar */}
      <Navbar
        onOpenDemo={handleOpenDemo}
        onOpenAuth={handleOpenAuth}
        isClerkConfigured={isClerkConfigured}
      />

      {/* Main Flow: 4 Cohesive Sections */}
      <main>
        {/* 1. HERO with rotating Indic text & 3D Voice Sphere */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* 2. HORIZONTAL MOVING FEATURE DEMONSTRATIONS */}
        <HorizontalFeatureCards onOpenDemo={handleOpenDemo} />

        {/* 3. CIRCULAR FEATURE NAVIGATOR (8 Capabilities + Interactive Working Demos) */}
        <CircularFeatureNavigator onOpenDemo={handleOpenDemo} />

        {/* 4. SHORT FINAL CTA with language baseline */}
        <ShortFinalCTA onOpenDemo={handleOpenDemo} />
      </main>

      {/* Minimalist Single-Line Baseline */}
      <footer className="py-6 border-t border-white/[0.06] text-center text-xs text-slate-500 font-medium bg-transparent">
        Bhasha • Built for The Great Indian AI Challenge • Gnani.ai
      </footer>

      {/* Fallback Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
      />
    </div>
  );
}

// 2. Application Route Container
function AppContent({ isClerkConfigured }) {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<LandingView isClerkConfigured={isClerkConfigured} />} />
      <Route
        path="/login"
        element={<AuthPage mode="login" isClerkConfigured={isClerkConfigured} />}
      />
      <Route
        path="/signup"
        element={<AuthPage mode="signup" isClerkConfigured={isClerkConfigured} />}
      />
      <Route
        path="/app"
        element={
          <div className="relative z-10">
            <LiveTranslatorApp onBackToLanding={() => navigate("/")} />
          </div>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// 3. Optional Clerk Router Integration Wrapper
function ClerkWrapper({ children, clerkPubKey, isClerkConfigured }) {
  const navigate = useNavigate();

  if (!isClerkConfigured) {
    return children;
  }

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
      appearance={bhashaClerkAppearance}
    >
      {children}
    </ClerkProvider>
  );
}

// 4. Main App Root
export default function App() {
  const envKey =
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
    import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const localKey = typeof window !== "undefined" ? localStorage.getItem("clerk_temp_pub_key") : null;
  const clerkPubKey = (envKey && envKey.trim()) || (localKey && localKey.trim()) || "";

  const isClerkConfigured = Boolean(
    clerkPubKey &&
    (clerkPubKey.startsWith("pk_test_") || clerkPubKey.startsWith("pk_live_"))
  );

  return (
    <div className="min-h-screen bg-[#070B12] text-[#F8FAFC] overflow-x-clip selection:bg-[#FF9933]/30 selection:text-white relative">
      {/* Precision Theme-Matched Acoustic Cursor */}
      <BhashaCursor />

      {/* Persistent Global Particle Network Background - Fixed across entire page */}
      <GlobalParticleBackground />

      <BrowserRouter>
        <ClerkWrapper clerkPubKey={clerkPubKey} isClerkConfigured={isClerkConfigured}>
          <AppContent isClerkConfigured={isClerkConfigured} />
        </ClerkWrapper>
      </BrowserRouter>
    </div>
  );
}
