import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import NaturalSpeechSection from "./NaturalSpeechSection";
import MeaningContextSection from "./MeaningContextSection";
import RealWorldScenarios from "./RealWorldScenarios";
import QuickPhrases3D from "./QuickPhrases3D";

export default function HorizontalProductStory() {
  const containerRef = useRef(null);

  // Track vertical scroll progress inside this 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform vertical progress (0 to 1) into horizontal translation (-0% to -75%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={containerRef} className="relative hidden lg:block h-[400vh]">
      
      {/* Sticky Fullscreen Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#070B12]">
        
        {/* Top Storyline Progress Tracker */}
        <div className="max-w-7xl mx-auto px-8 w-full pt-6 pb-2 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#94A3B8] uppercase">
              Horizontal Story Flow
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>[VOICE]</span>
            <span>→</span>
            <span>[UNDERSTAND]</span>
            <span>→</span>
            <span>[TRANSLATE]</span>
            <span>→</span>
            <span>[SPEAK]</span>
          </div>
        </div>

        {/* Horizontal Moving Ribbon Container */}
        <motion.div
          style={{ x }}
          className="flex flex-row items-center w-[400vw] h-[85vh] pl-8 pr-16 select-none"
        >
          
          {/* PANEL 1: Natural Speech & Audio Beam */}
          <div className="w-[100vw] px-8 shrink-0 flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <NaturalSpeechSection />
            </div>
          </div>

          {/* PANEL 2: Meaning Context & Split Sound Prism */}
          <div className="w-[100vw] px-8 shrink-0 flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <MeaningContextSection />
            </div>
          </div>

          {/* PANEL 3: Real World Ground Scenarios */}
          <div className="w-[100vw] px-8 shrink-0 flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <RealWorldScenarios />
            </div>
          </div>

          {/* PANEL 4: Desi Sound Deck */}
          <div className="w-[100vw] px-8 shrink-0 flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <QuickPhrases3D />
            </div>
          </div>

        </motion.div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="max-w-7xl mx-auto px-8 w-full pb-4 z-20">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-1 bg-gradient-to-r from-[#06B6D4] via-[#10B981] to-[#FF9933] rounded-full"
          />
        </div>

      </div>

    </div>
  );
}
