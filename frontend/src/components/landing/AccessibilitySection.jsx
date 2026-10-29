import React, { useState } from "react";
import { Mic, Type, Subtitles, Volume2, Check } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function AccessibilitySection() {
  const [activeMode, setActiveMode] = useState("captions");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayVoice = (text) => {
    setIsPlayingAudio(true);
    soundFx.playNaturalBhashaSound(text);
    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  return (
    <section id="accessibility" className="py-28 relative">
      
      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-[#06B6D4]/06 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Information & Storytelling */}
          <div className="lg:col-span-5 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] uppercase block">
              Universal Access
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              Communication shouldn't depend on how you speak.
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              For individuals with speech differences, stuttering, vocal fatigue, or hearing impairment, Bhasha provides voice-to-voice, text-to-voice, and high-contrast subtitles designed for inclusive interaction.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Vocal Diversity Calibration
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Speech recognition adapted to varied cadences, hesitations, and non-standard speech patterns.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Non-Verbal AAC Vocalizer
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Type or tap pre-formed intent chips to speak aloud through authentic Indian regional voices.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  High-Contrast Large Subtitles
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ultra-legible yellow-on-black typography for low-vision and hard-of-hearing elderly citizens.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Floating Accessibility Demonstration */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mode Selector Tabs */}
            <div className="grid grid-cols-3 gap-2.5">
              
              <button
                type="button"
                onClick={() => setActiveMode("captions")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeMode === "captions"
                    ? "bg-[#10B981]/15 border-[#10B981] shadow-lg shadow-[#10B981]/15 text-white"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 text-slate-400"
                }`}
              >
                <Subtitles className="w-4 h-4 mb-1.5 text-[#10B981]" />
                <div className="text-xs font-bold block">Live Subtitles</div>
                <span className="text-[10px] text-slate-500 font-mono">High Contrast</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("text")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeMode === "text"
                    ? "bg-[#06B6D4]/15 border-[#06B6D4] shadow-lg shadow-[#06B6D4]/15 text-white"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 text-slate-400"
                }`}
              >
                <Type className="w-4 h-4 mb-1.5 text-[#06B6D4]" />
                <div className="text-xs font-bold block">Text-to-Voice</div>
                <span className="text-[10px] text-slate-500 font-mono">Non-Verbal AAC</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("voice")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeMode === "voice"
                    ? "bg-[#FF9933]/15 border-[#FF9933] shadow-lg shadow-[#FF9933]/15 text-white"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 text-slate-400"
                }`}
              >
                <Mic className="w-4 h-4 mb-1.5 text-[#FF9933]" />
                <div className="text-xs font-bold block">Voice Duplex</div>
                <span className="text-[10px] text-slate-500 font-mono">Hands-Free</span>
              </button>

            </div>

            {/* Active Mode Experience */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              
              {activeMode === "captions" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/[0.06]">
                    <span>High-Contrast Subtitle Display</span>
                    <button
                      type="button"
                      onClick={() => handlePlayVoice("இந்த மருந்தை ஒரு நாளைக்கு இரண்டு முறை சாப்பிட்ட பிறகு எடுக்க வேண்டும்.")}
                      className="text-[#10B981] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? "animate-pulse" : ""}`} />
                      <span>{isPlayingAudio ? "Speaking..." : "Read Aloud"}</span>
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-black border border-yellow-400/40 text-center space-y-2">
                    <span className="text-[11px] font-mono text-yellow-400/80 block uppercase tracking-wider">
                      [Hindi Spoken Input Detected]
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-yellow-300 leading-snug font-indic">
                      "यह दवाई दिन में दो बार खाना खाने के बाद लेनी है।"
                    </div>
                    <div className="text-sm font-semibold text-slate-300 pt-2 border-t border-white/10 font-indic">
                      Tamil Translation: "இந்த மருந்தை ஒரு நாளைக்கு இரண்டு முறை சாப்பிட்ட பிறகு எடுக்க வேண்டும்."
                    </div>
                  </div>
                </div>
              )}

              {activeMode === "text" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/[0.06]">
                    <span>Non-Verbal AAC Vocalizer</span>
                    <span className="text-[#06B6D4]">Gnani Timbre Active</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">User Typed:</span>
                      <span className="text-sm font-bold text-white font-indic">"मुझे टिकट काउंटर जाना है।"</span>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-indigo-400 uppercase">Spoken Audio Output (Kannada)</span>
                        <div className="text-base font-bold text-white font-indic mt-0.5">
                          "ನನಗೆ ಟಿಕೆಟ್ ಕೌಂಟರ್‌ಗೆ ಹೋಗಬೇಕು."
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePlayVoice("ನನಗೆ ಟಿಕೆಟ್ ಕೌಂಟರ್‌ಗೆ ಹೋಗಬೇಕು.")}
                        className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition active:scale-95 cursor-pointer"
                        aria-label="Play synthesized voice"
                      >
                        <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-pulse" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeMode === "voice" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/[0.06]">
                    <span>Dual Microphone Split Screen</span>
                    <span className="text-[#FF9933]">Two-Way Duplex</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#FF9933] font-mono font-bold uppercase">
                        Hands-Free Conversation Mode
                      </span>
                      <p className="text-sm font-medium text-white mt-1 leading-relaxed">
                        Place your phone on the counter or table between two people. Bhasha auto-detects who is speaking and delivers translated voice automatically.
                      </p>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg bg-[#FF9933] text-slate-950 font-bold text-xs whitespace-nowrap">
                      Split UI Ready
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  Haptic Feedback on Speech Stop
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  Screen Reader (ARIA) Optimized
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  Slow Playback (0.75x) Option
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
