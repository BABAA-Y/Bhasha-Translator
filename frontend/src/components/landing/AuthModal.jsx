import React, { useState } from "react";
import { X, Mail, Phone, Lock, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function AuthModal({ isOpen, onClose, initialMode = "login", onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [authMethod, setAuthMethod] = useState("email"); // 'email' or 'phone'
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(mode === "login" ? "Welcome back to Bhasha!" : "Account created successfully!");
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            name: email.split("@")[0] || "User",
            identifier: email || phone,
          });
        }
        onClose();
        setSuccessMsg("");
      }, 1000);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-md rounded-2xl glass-panel border border-white/10 p-6 sm:p-8 shadow-2xl bg-[#0A0F1D] text-slate-100 overflow-hidden">
        
        {/* Glow ambient */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FF9933]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF9933] to-[#06B6D4] mx-auto flex items-center justify-center font-black text-white text-lg shadow-lg mb-3">
            B
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {mode === "login" ? "Log in to Bhasha" : "Create your account"}
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1">
            {mode === "login" ? "Access your saved translation sessions" : "Join the Acoustic Bharat voice revolution"}
          </p>
        </div>

        {/* Success Alert */}
        {successMsg ? (
          <div className="p-4 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-mono flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        ) : (
          <>
            {/* Social Logins (Google & GitHub) */}
            <div className="space-y-2 mb-5">
              <button
                type="button"
                onClick={() => handleSubmit({ preventDefault: () => {} })}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2.5 transition active:scale-[0.99]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 6.3 10.1 6.3z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSubmit({ preventDefault: () => {} })}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2.5 transition active:scale-[0.99]"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0A0F1D] px-2 text-[10px] font-mono text-slate-500 uppercase">
                Or with {authMethod}
              </span>
              <div className="border-t border-white/10 w-full" />
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#070B12] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-400 block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#070B12] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#FF9933]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#FF9933] to-[#e68524] text-white flex items-center justify-center gap-2 hover:opacity-95 transition shadow-lg shadow-[#FF9933]/20 mt-2"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{mode === "login" ? "Log in" : "Create account"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Switch Mode Footer */}
            <div className="mt-5 text-center text-xs text-slate-400 pt-3 border-t border-white/10">
              {mode === "login" ? (
                <p>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-[#FF9933] font-bold hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-[#FF9933] font-bold hover:underline"
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
