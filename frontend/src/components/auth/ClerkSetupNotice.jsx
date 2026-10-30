import React, { useState } from "react";
import { KeyRound, Check, ExternalLink, ArrowRight } from "lucide-react";

export default function ClerkSetupNotice({ mode = "login" }) {
  const [inputKey, setInputKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleApplyKey = (e) => {
    e.preventDefault();
    if (inputKey.trim().startsWith("pk_test_") || inputKey.trim().startsWith("pk_live_")) {
      localStorage.setItem("clerk_temp_pub_key", inputKey.trim());
      setSaved(true);
      setTimeout(() => {
        window.location.reload();
      }, 600);
    }
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-300">
      
      {/* Informative Notification Badge */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center space-y-2">
        <div className="w-9 h-9 rounded-xl bg-[#FF9933]/15 text-[#FF9933] mx-auto flex items-center justify-center">
          <KeyRound className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-bold text-white">
          {mode === "login" ? "Clerk Sign In Ready" : "Clerk Sign Up Ready"}
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
          Add your Clerk Publishable Key in <code className="text-[#FF9933] bg-white/[0.04] px-1.5 py-0.5 rounded font-mono text-[11px]">frontend/.env</code> to activate live authentication.
        </p>
      </div>

      {/* Quick Key Activation Form (Optional instant test without rebooting) */}
      <form onSubmit={handleApplyKey} className="space-y-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 text-left">
            Connect Publishable Key
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="pk_test_..."
              className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#FF9933]/70 focus:ring-1 focus:ring-[#FF9933]/40 text-white placeholder:text-slate-500 rounded-xl text-xs py-2.5 px-3.5 outline-none transition-all font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!inputKey.trim()}
          className="btn-tactile w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none transition-all"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              <span>Key Saved! Initializing...</span>
            </>
          ) : (
            <>
              <span>Activate Clerk Live Flow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Direct link to Clerk Dashboard */}
      <div className="pt-2 text-center border-t border-white/[0.06]">
        <a
          href="https://dashboard.clerk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#FF9933] transition-colors"
        >
          <span>Get key from Clerk Dashboard</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
}
