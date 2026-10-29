import React from "react";
import { Zap, LayoutTemplate } from "lucide-react";

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow">
          भा
        </div>
        <div>
          <h1 className="text-sm font-bold text-white flex items-center gap-1.5">
            Bhasha
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
              Gnani AI
            </span>
          </h1>
          <p className="text-[10px] text-slate-400">Indic Voice Translator</p>
        </div>
      </div>

      <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
        <button
          onClick={() => setActiveTab("split")}
          className={`px-3 py-1 text-xs font-medium rounded-md transition ${
            activeTab === "split"
              ? "bg-indigo-600 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Conversation
        </button>
        <button
          onClick={() => setActiveTab("cards")}
          className={`px-3 py-1 text-xs font-medium rounded-md transition flex items-center gap-1 ${
            activeTab === "cards"
              ? "bg-indigo-600 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Zap className="w-3 h-3 text-amber-400" />
          Quick Cards
        </button>
      </div>
    </header>
  );
}
