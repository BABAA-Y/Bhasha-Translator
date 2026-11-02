import React, { useState } from "react";
import { Volume2, Copy, Check, Sparkles, Radio } from "lucide-react";
import { getLanguage } from "../constants/languages";

export default function TranslationCard({
  speakerRole = "YOU", // "YOU" | "PARTNER"
  langCode = "hi",
  originalText = "",
  translatedText = "",
  audioUrl = null,
  onPlayAudio,
  isPlayingAudio = false,
  isRecording = false,
  isLoading = false,
  placeholder = "Spoken translation will appear here",
}) {
  const [copied, setCopied] = useState(false);
  const langObj = getLanguage(langCode);
  const isUser = speakerRole === "YOU";

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasContent = Boolean(translatedText || originalText);

  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between min-h-[220px] sm:min-h-[250px] ${
        isUser
          ? "border border-[#FF9933]/15 hover:border-[#FF9933]/30"
          : "border border-[#06B6D4]/15 hover:border-[#06B6D4]/30"
      }`}
      style={{
        backgroundColor: "rgba(10, 15, 29, 0.72)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        boxShadow:
          "0 18px 45px -12px rgba(0, 0, 0, 0.6), 0 0 1px 0 rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Top Specular Edge Bevel */}
      <div
        className="absolute top-0 inset-x-6 h-[1px] pointer-events-none rounded-full"
        style={{
          background: isUser
            ? "linear-gradient(90deg, transparent 0%, rgba(255, 153, 51, 0.1) 20%, rgba(255, 153, 51, 0.35) 50%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.1) 20%, rgba(6, 182, 212, 0.35) 50%, transparent 100%)",
        }}
      />

      {/* TOP HEADER ROW: Role Badge, Language, and Status */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase font-mono shadow-sm ${
              isUser
                ? "bg-[#FF9933]/15 text-[#FF9933] border border-[#FF9933]/30"
                : "bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30"
            }`}
          >
            {speakerRole}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-300 font-medium">
            <span className="font-semibold text-white">{langObj.native}</span>
            <span className="text-slate-500 font-mono text-[10px]">
              ({langObj.name})
            </span>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-1.5">
          {isRecording ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-rose-400 font-mono bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              Recording
            </span>
          ) : isLoading ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 animate-spin" />
              Processing
            </span>
          ) : hasContent ? (
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Synced
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-mono bg-white/[0.03] px-2 py-0.5 rounded-full">
              Ready
            </span>
          )}
        </div>
      </div>

      {/* CENTER WORKSPACE: Speech Transcription & Translation Output */}
      <div className="my-auto py-3 flex flex-col justify-center">
        {hasContent ? (
          <div className="space-y-2.5">
            {/* Primary Translation / Spoken Content in Large Readable Script */}
            <div className="relative group">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white font-indic tracking-tight leading-relaxed selection:bg-[#FF9933]/30">
                "{translatedText || originalText}"
              </h3>
            </div>

            {/* Translation Pipeline Breakdown: Original Spoken Transcript */}
            {originalText && translatedText && originalText !== translatedText && (
              <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-normal">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider shrink-0">
                    Source:
                  </span>
                  <span className="truncate italic font-indic text-slate-300 text-xs">
                    "{originalText}"
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-4 px-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${
                isUser
                  ? "bg-[#FF9933]/10 text-[#FF9933] border border-[#FF9933]/20"
                  : "bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20"
              }`}
            >
              <Radio className="w-4 h-4 opacity-70" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-300 max-w-xs leading-relaxed">
              {placeholder}
            </p>
            <p className="text-[10px] text-slate-500 font-mono mt-1">
              {isUser
                ? "Transcription in real-time"
                : "Spoken voice will synthesize automatically"}
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM ACTION BAR: Replay Voice & Copy Output */}
      <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {audioUrl && (
            <button
              type="button"
              onClick={() => onPlayAudio && onPlayAudio(audioUrl)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:bg-white/[0.15] border border-white/[0.1] text-xs font-semibold text-white transition-all cursor-pointer shadow-sm group"
              title="Replay Voice Audio"
            >
              <Volume2
                className={`w-3.5 h-3.5 text-[#FF9933] group-hover:scale-110 transition-transform ${
                  isPlayingAudio ? "animate-bounce" : ""
                }`}
              />
              <span className="text-[11px]">{isPlayingAudio ? "Playing..." : "Replay"}</span>
            </button>
          )}

          {hasContent && (
            <button
              type="button"
              onClick={() => handleCopy(translatedText || originalText)}
              className="p-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Copy translation text"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Engine Pipeline Badge */}
        <span className="text-[9px] text-slate-500 font-mono tracking-wider">
          {isUser ? "Gnani Prisma STT" : "Timbre Neural TTS"}
        </span>
      </div>
    </div>
  );
}
