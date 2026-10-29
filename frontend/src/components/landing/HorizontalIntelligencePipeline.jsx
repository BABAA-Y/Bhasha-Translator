import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Volume2, Play, Sparkles, ArrowRight, Check } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function HorizontalIntelligencePipeline({ onOpenDemo }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlayingLiteral, setIsPlayingLiteral] = useState(false);
  const [isPlayingBhasha, setIsPlayingBhasha] = useState(false);
  const [activeContextMode, setActiveContextMode] = useState("contextual"); // 'literal', 'natural', 'contextual'
  const [isPlayingFinal, setIsPlayingFinal] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Framer Motion Scroll-Linked Horizontal Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Maps vertical scroll [0, 1] to horizontal transform [0%, -80%]
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  // Track progress indicator
  const progressPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handlePlayLiteral = () => {
    setIsPlayingLiteral(true);
    soundFx.playLiteralRobotSound("Brother, will you walk by the instrument?");
    setTimeout(() => setIsPlayingLiteral(false), 2400);
  };

  const handlePlayBhasha = () => {
    setIsPlayingBhasha(true);
    soundFx.playNaturalBhashaSound("அண்ணா, மீட்டருக்கு வருவீங்களா?");
    setTimeout(() => setIsPlayingBhasha(false), 2400);
  };

  const handlePlayFinal = () => {
    setIsPlayingFinal(true);
    soundFx.playNaturalBhashaSound("அண்ணா, இங்கே நிறுத்துங்கள்.");
    setTimeout(() => setIsPlayingFinal(false), 2400);
  };

  return (
    <section
      id="pipeline-story"
      ref={containerRef}
      className={`relative ${isMobile ? "py-20" : "h-[420vh]"} bg-[#070B12]`}
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute top-1/3 left-1/3 w-[650px] h-[650px] bg-[#06B6D4]/05 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#FF9933]/06 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* STICKY HORIZONTAL VIEWPORT (Desktop) */}
      <div className={`${isMobile ? "relative" : "sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center"}`}>
        
        {/* Top Minimal Stage Tracker Header */}
        <div className="max-w-7xl mx-auto px-6 w-full pt-6 pb-4 flex items-center justify-between text-xs font-mono text-slate-400 select-none z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse" />
            <span className="text-white font-bold tracking-widest uppercase">
              The Intelligence Pipeline
            </span>
          </div>

          {!isMobile && (
            <div className="flex items-center gap-4">
              <span className="text-[11px] text-slate-500">Scroll down to travel through speech intelligence</span>
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ width: progressPercent }}
                  className="h-full bg-gradient-to-r from-[#06B6D4] via-[#10B981] to-[#FF9933]"
                />
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* HORIZONTAL CONTINUOUS TRACK                                               */}
        {/* ========================================================================= */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            style={isMobile ? {} : { x }}
            className={`flex ${isMobile ? "flex-col gap-24 px-6" : "w-[500vw] h-full items-center will-change-transform"}`}
          >

            {/* --------------------------------------------------------------------- */}
            {/* STAGE 01: LISTEN (Raw Audio -> Structured Speech)                     */}
            {/* --------------------------------------------------------------------- */}
            <div className={`${isMobile ? "w-full" : "w-screen h-full flex items-center px-12 lg:px-24 shrink-0"}`}>
              <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#06B6D4] uppercase block">
                    01 — Acoustic Ingestion
                  </span>

                  <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
                    Before Bhasha translates a word, <br />
                    <span className="text-slate-300">it listens to the person.</span>
                  </h2>

                  <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg">
                    Real street conversations across India happen amidst auto horns, railway announcements, and ambient chai stall chatter. Bhasha isolates human acoustic frequencies in real time.
                  </p>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  {/* Clean Visual Waveform Transition */}
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                        Ambient Input Contour
                      </span>
                      <div className="text-2xl sm:text-3xl font-bold text-white font-indic">
                        "भैया, यहाँ रोक देना।"
                      </div>
                    </div>

                    {/* Luminous Filtering Wave */}
                    <div className="h-16 flex items-center gap-1.5 justify-between px-2">
                      {[18, 42, 65, 30, 85, 45, 95, 60, 40, 80, 50, 70, 35, 90, 65, 40, 80, 55, 30, 75, 40, 20].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`w-1.5 rounded-full transition-all duration-500 ${
                            i < 6
                              ? "bg-slate-700" // Ambient noise
                              : i < 18
                              ? "bg-gradient-to-t from-[#06B6D4] to-[#10B981]" // Speech envelope
                              : "bg-slate-700"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/[0.06]">
                      <span className="text-[#06B6D4]">Noise Threshold Suppressed</span>
                      <span className="text-[#10B981]">Vocal Resonance Locked</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* STAGE 02: UNDERSTAND (Morphological Indian Intent)                    */}
            {/* --------------------------------------------------------------------- */}
            <div className={`${isMobile ? "w-full" : "w-screen h-full flex items-center px-12 lg:px-24 shrink-0"}`}>
              <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#10B981] uppercase block">
                    02 — Linguistic Anatomy
                  </span>

                  <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
                    People don't speak syntax. <br />
                    <span className="text-slate-300">They speak intent.</span>
                  </h2>

                  <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg">
                    Indian code-switching blends respect markers, local geography, and conversational shortcuts. Rather than rigid dictionary parsing, Bhasha dissects semantic fragments.
                  </p>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  {/* Semantic Fragment Dissection in Open Space */}
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-5">
                    
                    {/* Fragment 1: भैया */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white font-indic">भैया</div>
                        <span className="text-xs text-slate-400 font-mono">"Bhaiya"</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-[#FF9933] uppercase block">
                          Honorific Address
                        </span>
                        <span className="text-[11px] text-slate-400">Preserves cultural warmth & politeness</span>
                      </div>
                    </div>

                    {/* Fragment 2: यहाँ */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white font-indic">यहाँ</div>
                        <span className="text-xs text-slate-400 font-mono">"Yahan"</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase block">
                          Spatial Anchor
                        </span>
                        <span className="text-[11px] text-slate-400">Exact physical curb / drop location</span>
                      </div>
                    </div>

                    {/* Fragment 3: रोक देना */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white font-indic">रोक देना</div>
                        <span className="text-xs text-slate-400 font-mono">"Rok dena"</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-[#10B981] uppercase block">
                          Transit Intent
                        </span>
                        <span className="text-[11px] text-slate-400">Action: Smooth vehicle deceleration</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* STAGE 03: CONTEXT (Same Words. Different Meaning.)                    */}
            {/* --------------------------------------------------------------------- */}
            <div className={`${isMobile ? "w-full" : "w-screen h-full flex items-center px-12 lg:px-24 shrink-0"}`}>
              <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#FF9933] uppercase block">
                    03 — Meaning Transformation
                  </span>

                  <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
                    Same words. <br />
                    <span className="text-slate-300">Different meaning.</span>
                  </h2>

                  <p className="text-base text-slate-400 leading-relaxed">
                    A machine translates literally. A human translates situationally. Bhasha resolves the difference before speaking.
                  </p>

                  {/* Mode Selector Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setActiveContextMode("literal")}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                        activeContextMode === "literal"
                          ? "bg-rose-950/40 text-rose-300 border-rose-500/50 shadow-lg"
                          : "bg-white/[0.02] text-slate-400 border-white/[0.06] hover:text-white"
                      }`}
                    >
                      Literal Machine
                    </button>
                    <button
                      onClick={() => setActiveContextMode("contextual")}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                        activeContextMode === "contextual"
                          ? "bg-[#10B981]/20 text-[#10B981] border-[#10B981] shadow-lg"
                          : "bg-white/[0.02] text-slate-400 border-white/[0.06] hover:text-white"
                      }`}
                    >
                      Bhasha Contextual
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  {/* Motion Typography Comparison Container */}
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-6">
                    
                    <div className="pb-4 border-b border-white/[0.06]">
                      <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">
                        Spoken Phrase:
                      </span>
                      <div className="text-2xl font-bold text-white font-indic">
                        "भैया मीटर से चलोगे क्या?"
                      </div>
                    </div>

                    {activeContextMode === "literal" ? (
                      <div className="space-y-4 transition-all duration-300">
                        <div className="flex items-center justify-between text-xs font-mono text-rose-400">
                          <span>Standard AI Output</span>
                          <span>[Mechanical Error]</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-mono font-bold text-rose-200 leading-snug">
                          "Brother, will you walk by the instrument?"
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-mono">
                          Fault: Misinterprets "meter" as laboratory measurement and "chaloge" as literal walking.
                        </p>
                        <button
                          onClick={handlePlayLiteral}
                          className="px-5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-rose-200 text-xs font-mono font-bold flex items-center gap-2 transition"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${isPlayingLiteral ? "animate-pulse" : ""}`} />
                          <span>{isPlayingLiteral ? "Speaking Robotic Tone..." : "Hear Robotic Translation"}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4 transition-all duration-300">
                        <div className="flex items-center justify-between text-xs font-mono text-[#10B981]">
                          <span>Bhasha Sovereign Output</span>
                          <span>[Street Tamil Vernacular]</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-white leading-snug font-indic">
                          "அண்ணா, மீட்டருக்கு வருவீங்களா?"
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-mono">
                          Meaning: Respectful street Tamil ("Anna, meter-ku varuveengala?") instantly understood by auto drivers in Chennai & Bengaluru.
                        </p>
                        <button
                          onClick={handlePlayBhasha}
                          className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#0ea372] text-slate-950 text-xs font-mono font-bold flex items-center gap-2 transition shadow-lg shadow-[#10B981]/25"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${isPlayingBhasha ? "animate-bounce" : ""}`} />
                          <span>{isPlayingBhasha ? "Speaking Natural Tamil..." : "Hear Bhasha Tamil Voice"}</span>
                        </button>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* STAGE 04: TRANSLATE (Cinematic Indic Language Stream)                 */}
            {/* --------------------------------------------------------------------- */}
            <div className={`${isMobile ? "w-full" : "w-screen h-full flex items-center px-12 lg:px-24 shrink-0"}`}>
              <div className="max-w-5xl mx-auto w-full space-y-8">
                
                <div className="max-w-xl space-y-4">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#FF9933] uppercase block">
                    04 — Cross-India Translation
                  </span>

                  <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
                    Language is not code. <br />
                    <span className="text-slate-300">It is culture flowing across state lines.</span>
                  </h2>
                </div>

                {/* Flowing Typographic Language Stream Across Screen */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                  
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-2 group hover:border-[#FF9933]/40 transition">
                    <span className="text-xs font-mono font-bold text-[#FF9933] uppercase block">
                      Tamil (தமிழ்)
                    </span>
                    <div className="text-xl font-bold text-white font-indic">
                      "இங்கே நிறுத்துங்கள்."
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Chennai / Madurai Transit</span>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-2 group hover:border-[#06B6D4]/40 transition">
                    <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase block">
                      Bengali (বাংলা)
                    </span>
                    <div className="text-xl font-bold text-white font-indic">
                      "এখানে থামিয়ে দিন।"
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Kolkata / Howrah Drop</span>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-2 group hover:border-[#10B981]/40 transition">
                    <span className="text-xs font-mono font-bold text-[#10B981] uppercase block">
                      Telugu (తెలుగు)
                    </span>
                    <div className="text-xl font-bold text-white font-indic">
                      "ఇక్కడ ఆపండి."
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Hyderabad Commute</span>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-2 group hover:border-amber-400/40 transition">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase block">
                      Kannada (ಕನ್ನಡ)
                    </span>
                    <div className="text-xl font-bold text-white font-indic">
                      "ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ."
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Bengaluru Street Auto</span>
                  </div>

                </div>

              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* STAGE 05: SPEAK (Human Voice Resonance)                               */}
            {/* --------------------------------------------------------------------- */}
            <div className={`${isMobile ? "w-full" : "w-screen h-full flex items-center px-12 lg:px-24 shrink-0"}`}>
              <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-sm font-mono font-bold tracking-widest text-[#10B981] uppercase block">
                    05 — Sovereign Synthesis
                  </span>

                  <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
                    Speech that sounds human. <br />
                    <span className="text-slate-300">Not like a machine.</span>
                  </h2>

                  <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg">
                    Powered by Gnani Timbre v3 neural synthesis. Generates natural regional pitch, authentic inflection, and warm cadences that make listeners comfortable.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4">
                    <button
                      onClick={onOpenDemo}
                      className="btn-tactile px-8 py-4 rounded-2xl text-sm font-bold text-slate-950 flex items-center gap-2.5 active:scale-95 transition"
                    >
                      <span>Open Face-to-Face Translator</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl text-center space-y-6 shadow-2xl">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#10B981] font-bold block">
                      Target Vocal Output (Tamil)
                    </span>

                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-indic leading-snug">
                      "அண்ணா, இங்கே நிறுத்துங்கள்."
                    </div>

                    {/* Audio Play Trigger */}
                    <div className="pt-2 flex justify-center">
                      <button
                        onClick={handlePlayFinal}
                        className={`px-8 py-4 rounded-2xl font-mono text-sm font-bold transition-all duration-300 flex items-center gap-3 border shadow-xl ${
                          isPlayingFinal
                            ? "bg-[#10B981] text-slate-950 border-[#10B981] shadow-[#10B981]/30 scale-105"
                            : "bg-white/[0.06] hover:bg-white/[0.12] text-white border-white/20 hover:border-white/40"
                        }`}
                      >
                        <Volume2 className={`w-4 h-4 ${isPlayingFinal ? "animate-bounce" : "text-[#FF9933]"}`} />
                        <span>{isPlayingFinal ? "Playing Neural Voice..." : "Hear Tamil Output"}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 font-mono">
                      24kHz Linear PCM • Synthesized via Gnani Timbre v3
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </div>

      </div>

    </section>
  );
}
