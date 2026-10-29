import React, { useState } from "react";
import { FileText, CheckCircle, Volume2 } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function DocumentUnderstandingSection() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlaySummary = () => {
    setIsPlayingAudio(true);
    soundFx.playNaturalBhashaSound("ஆवेदक तमिलनाडु का निवासी होना चाहिए, वार्षिक आय 2 लाख से कम और अंतिम तिथि 15 नवंबर है।");
    setTimeout(() => setIsPlayingAudio(false), 2600);
  };

  return (
    <section id="documents" className="py-28 relative">
      
      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-[#FF9933]/06 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Information & Storytelling */}
          <div className="lg:col-span-5 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] uppercase block">
              Document Clarity
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              Understand official documents, <br />
              <span className="text-slate-300">not just words.</span>
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              Government circulars, hospital discharge summaries, bank loan agreements, and utility notices often contain dense bureaucratic terminology. Bhasha distills raw text into clear, actionable bullet points in everyday regional speech.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Action Items Isolated
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Highlights crucial deadlines, maximum income caps, and mandatory identity proofs.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Bureaucratic Jargon Simplified
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Replaces confusing legal clauses with straightforward, conversational instructions.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Spoken Mother-Tongue Briefing
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generates an audible 30-second spoken summary for citizens who cannot read fluently.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Document Understanding Experience */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top: Sarkari Circular Scan */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FF9933]" />
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                    Official Notification (Tamil Nadu Scheme)
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-950/40 text-[#10B981] border border-[#10B981]/25">
                  Verified Scan
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 font-mono text-xs">
                <div className="font-semibold text-slate-200 font-indic">
                  விண்ணப்ப காலம் மற்றும் தகுதி விதிகள்:
                </div>
                <p className="text-slate-400 leading-relaxed font-indic">
                  விண்ணப்பதாரர் தமிழ்நாட்டில் வசிப்பவராக இருக்க வேண்டும். குடும்ப ஆண்டு வருமானம் ரூ. 2,00,000-க்குள் இருக்க வேண்டும். விண்ணப்பங்கள் சமர்ப்பிக்க கடைசி தேதி: 15 நவம்பர்.
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                <span>Script: Tamil</span>
                <span>•</span>
                <span>Category: Welfare Notification</span>
              </div>
            </div>

            {/* Bottom: Bhasha Plain Language Extraction */}
            <div className="p-7 rounded-3xl bg-[#0F172A]/80 border border-[#FF9933]/30 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FF9933] uppercase">
                  Bhasha Plain Language Breakdown (Hindi)
                </span>
                
                <button
                  type="button"
                  onClick={handlePlaySummary}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Volume2 className={`w-3.5 h-3.5 text-[#10B981] ${isPlayingAudio ? "animate-pulse" : ""}`} />
                  <span>{isPlayingAudio ? "Playing Summary..." : "Hear Audio Brief"}</span>
                </button>
              </div>

              <div className="space-y-2.5 text-xs font-indic">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/5">
                  <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">निवास प्रमाण:</strong> आवेदक को तमिलनाडु का स्थायी निवासी होना चाहिए।
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/5">
                  <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">आय सीमा:</strong> परिवार की वार्षिक आय ₹2,00,000 से कम होनी चाहिए।
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                  <CheckCircle className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#FF9933]">अंतिम तिथि (Deadline):</strong> 15 नवंबर से पहले फॉर्म जमा करना अनिवार्य है।
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
