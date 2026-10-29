import React, { useState } from "react";
import { ShieldAlert, Volume2 } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function OfflineModeSection() {
  const [playingId, setPlayingId] = useState(null);

  const handleSpeak = (id, phrase) => {
    setPlayingId(id);
    soundFx.playNaturalBhashaSound(phrase);
    setTimeout(() => setPlayingId(null), 2400);
  };

  return (
    <section id="offline" className="py-28 relative">
      
      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-rose-500/06 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Offline Sovereign Simulation */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-4">
            
            {/* Network Telemetry Header */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-rose-400">
                  NETWORK STATUS: OFFLINE (SIMULATED)
                </span>
              </div>

              <span className="text-[10px] font-mono text-[#10B981] bg-emerald-950/40 px-2.5 py-1 rounded-full border border-[#10B981]/30">
                Local Cache Active (IndexedDB)
              </span>
            </div>

            {/* Emergency SOS Pod */}
            <div className="p-7 rounded-3xl bg-rose-950/20 border border-rose-500/30 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                    Critical Emergency SOS
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-900/40 text-rose-200 border border-rose-500/30">
                  Priority 0
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-bold text-white font-indic">
                "मुझे तुरंत डॉक्टर या एम्बुलेंस की ज़रूरत है।"
              </div>

              <p className="text-xs text-rose-300 font-indic">
                Target (Tamil): "எனக்கு உடனடியாக ஒரு மருத்துவர் அல்லது ஆம்புலன்ஸ் தேவை."
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleSpeak("emergency", "எனக்கு உடனடியாக ஒரு மருத்துவர் அல்லது ஆம்புலன்ஸ் தேவை.")}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition active:scale-95 shadow-lg shadow-rose-900/40 cursor-pointer"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${playingId === "emergency" ? "animate-pulse" : ""}`} />
                  <span>{playingId === "emergency" ? "Speaking Offline Audio..." : "Speak Emergency Audio"}</span>
                </button>
                <span className="text-[10px] font-mono text-slate-500">Latency: 0 ms</span>
              </div>
            </div>

            {/* Transit Direction Fallback Pod */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                  Transit Direction Fallback
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Offline Station Cache
                </span>
              </div>

              <div className="text-base font-semibold text-slate-200 font-indic">
                "मुझे नज़दीकी पुलिस स्टेशन या बस स्टैंड जाना है।"
              </div>

              <p className="text-xs text-slate-400 font-indic">
                Target (Kannada): "ನನಗೆ ಹತ್ತಿರದ ಪೊಲೀಸ್ ಠಾಣೆ ಅಥವಾ ಬಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ಹೋಗಬೇಕು."
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleSpeak("transit", "ನನಗೆ ಹತ್ತಿರದ ಪೊಲೀಸ್ ಠಾಣೆ ಅಥವಾ ಬಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ಹೋಗಬೇಕು.")}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${playingId === "transit" ? "animate-pulse" : ""}`} />
                  <span>{playingId === "transit" ? "Speaking..." : "Speak Cached Audio"}</span>
                </button>
                <span className="text-[10px] font-mono text-slate-500">IndexedDB: 500+ stored</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Editorial Information */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] uppercase block">
              Offline Resilience
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              No signal? <br />
              <span className="text-slate-300">No problem.</span>
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              When traveling through remote rural regions, deep underground metro stations, or mountain highway passes where cellular reception drops to zero, Bhasha switches seamlessly to its on-device cached index.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Local IndexedDB Engine
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pre-stores 500+ essential medical, police, transit, and emergency phrases on device storage.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  Zero Latency Playback
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Audio waveforms trigger immediately from client memory with 0ms network lag.
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/[0.04]">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider block">
                  High-Contrast SOS Mode
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bright visual screen flash with large typography in case audio cannot be heard over ambient noise.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
