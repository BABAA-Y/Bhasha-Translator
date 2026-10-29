import React, { useState } from "react";
import { Volume2, Play, Pause, MapPin, Car, Stethoscope, ShoppingBag } from "lucide-react";
import { soundFx } from "../../services/soundEffects";

export default function RealWorldScenarios() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenarios = [
    {
      id: "auto",
      icon: Car,
      tag: "Ground Mobility",
      location: "Bengaluru, Karnataka",
      speakerA: {
        role: "North Indian Commuter",
        lang: "Hindi",
        script: '"भैया मीटर से चलोगे?"',
        phonetic: "Bhaiya meter se chaloge?",
      },
      speakerB: {
        role: "Auto Driver",
        lang: "Tamil / Kannada",
        script: '"அண்ணா, மீட்டருக்கு வருவீங்களா?"',
        phonetic: "Anna, meter-ku varuveengala?",
      },
      contextNote: "Resolves street traffic horns, loud ambient chatter, and local bargaining tone.",
    },
    {
      id: "clinic",
      icon: Stethoscope,
      tag: "Public Healthcare",
      location: "AIIMS OPD, New Delhi",
      speakerA: {
        role: "Patient from Siliguri",
        lang: "Bengali",
        script: '"আমার বুকে খুব চাপ লাগছে এবং শ্বাস নিতে কষ্ট হচ্ছে।"',
        phonetic: "Amar buke khub chaap lagchhe ebong shwas nite koshto hochhe.",
      },
      speakerB: {
        role: "Duty Physician",
        lang: "Hindi",
        script: '"मेरी छाती में भारीपन लग रहा है और सांस लेने में तकलीफ हो रही है।"',
        phonetic: "Meri chhati me bhaaripan lag raha hai aur saans lene me takleef ho rahi hai.",
      },
      contextNote: "Accurately translates acute medical distress and chest symptoms without distortion.",
    },
    {
      id: "market",
      icon: ShoppingBag,
      tag: "Local Commerce",
      location: "Bapu Bazaar, Jaipur",
      speakerA: {
        role: "Foreign / Non-Hindi Buyer",
        lang: "English",
        script: '"Can you pack two blue handicrafts and give me the final price?"',
        phonetic: "Can you pack two blue handicrafts and give me the final price?",
      },
      speakerB: {
        role: "Artisan Shopkeeper",
        lang: "Hindi",
        script: '"क्या आप दो नीले हस्तशिल्प पैक कर सकते हैं और सही दाम बता सकते हैं?"',
        phonetic: "Kya aap do neele hastshilp pack kar sakte hain aur sahi daam bata sakte hain?",
      },
      contextNote: "Enables direct street commerce and artisan bargaining without broker commission.",
    },
  ];

  const current = scenarios[activeScenario];
  const IconComponent = current.icon;

  const handleTogglePlay = () => {
    setIsPlaying(true);
    soundFx.playNaturalBhashaSound(current.speakerB.script);
    setTimeout(() => setIsPlaying(false), 2600);
  };

  return (
    <section id="scenarios" className="py-28 relative">
      
      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-[#06B6D4]/06 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Information & Field Navigation */}
          <div className="lg:col-span-5 space-y-6">
            
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] uppercase block">
              Ground Truth
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              Tested where real India speaks.
            </h2>

            <p className="text-base text-slate-400 leading-relaxed">
              Language barriers aren't theoretical—they happen at noisy auto stands, crowded hospital OPDs, and bustling artisan bazaars.
            </p>

            {/* Scenario Switcher Tabs */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap gap-2.5">
                {scenarios.map((sc, idx) => {
                  const ScIcon = sc.icon;
                  const isActive = activeScenario === idx;
                  return (
                    <button
                      type="button"
                      key={sc.id}
                      onClick={() => {
                        setActiveScenario(idx);
                        setIsPlaying(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                        isActive
                          ? "bg-[#FF9933] text-slate-950 border-[#FF9933] shadow-lg shadow-[#FF9933]/25"
                          : "bg-white/[0.03] text-slate-400 hover:text-white border-white/[0.08] hover:border-white/20"
                      }`}
                    >
                      <ScIcon className="w-3.5 h-3.5" />
                      <span>{sc.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location & Context Note */}
            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>Field Location: <strong className="text-white">{current.location}</strong></span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {current.contextNote}
              </p>
            </div>

          </div>

          {/* RIGHT: Two-Way Conversation Pods */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top Bar with Audio Trigger */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Two-Way Face-to-Face Stream</span>
              </div>

              <button
                type="button"
                onClick={handleTogglePlay}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2 transition cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#FF9933]" />
                    <span>Speaking Voice...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#10B981] fill-[#10B981]" />
                    <span>Play Field Audio</span>
                  </>
                )}
              </button>
            </div>

            {/* Pod 1: Speaker A */}
            <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FF9933] uppercase">
                  Speaker A ({current.speakerA.lang})
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {current.speakerA.role}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-white font-indic leading-relaxed">
                {current.speakerA.script}
              </div>

              <p className="text-xs text-slate-400 font-mono italic">
                {current.speakerA.phonetic}
              </p>
            </div>

            {/* Pod 2: Speaker B */}
            <div className="p-7 rounded-3xl bg-[#10B981]/[0.03] border border-[#10B981]/25 backdrop-blur-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#10B981] uppercase">
                  Speaker B ({current.speakerB.lang})
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {current.speakerB.role}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-white font-indic leading-relaxed">
                {current.speakerB.script}
              </div>

              <p className="text-xs text-slate-400 font-mono italic">
                {current.speakerB.phonetic}
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
