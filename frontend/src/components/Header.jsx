import React from "react";
import { ArrowLeft } from "lucide-react";

export default function Header({
  activeTab = "split",
  setActiveTab,
  onBackToLanding,
}) {
  return (
    <header className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/[0.06] bg-[#070B12]/80 backdrop-blur-md z-20">
      {/* Left: Clean Bhasha Logo & Brand */}
      <div className="flex items-center gap-2.5 select-none">
        <div className="w-7 h-7 rounded-lg bg-[#FF9933] flex items-center justify-center font-bold text-slate-950 text-xs font-indic shadow-sm">
          भा
        </div>
        <span className="font-bold text-sm tracking-wide text-white font-display">
          Bhasha
        </span>
      </div>

      {/* Center: Conversation / Quick Cards Toggle */}
      <div className="flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
        <button
          type="button"
          onClick={() => setActiveTab("split")}
          className={`px-3.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
            activeTab === "split"
              ? "bg-[#FF9933] text-slate-950 font-semibold shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Conversation
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cards")}
          className={`px-3.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
            activeTab === "cards"
              ? "bg-[#FF9933] text-slate-950 font-semibold shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Quick Cards
        </button>
      </div>

      {/* Right: Back to Landing Page */}
      <div>
        <button
          type="button"
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer px-2.5 py-1 rounded-lg hover:bg-white/[0.05]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Back</span>
        </button>
      </div>
    </header>
  );
}
