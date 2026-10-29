import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowLeftRight, Volume2, Mic, MicOff, Loader2, Zap } from "lucide-react";

import Header from "../Header";
import LanguageSelector from "../LanguageSelector";
import MicButton from "../MicButton";
import TranslationCard from "../TranslationCard";
import QuickCards from "../QuickCards";

import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import { translateVoice, translateText, fetchQuickCards } from "../../services/api";
import { getLanguage } from "../../constants/languages";

export default function LiveTranslatorApp({ onBackToLanding, user }) {
  const [activeTab, setActiveTab] = useState("split");
  const [personALang, setPersonALang] = useState("hi"); // Hindi
  const [personBLang, setPersonBLang] = useState("ta"); // Tamil

  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quickCards, setQuickCards] = useState([]);

  // Latest turn for each speaker
  const [turnForB, setTurnForB] = useState(null);
  const [turnForA, setTurnForA] = useState(null);

  const { isRecording, startRecording, stopRecording } = useAudioRecorder();
  const audioPlayerRef = useRef(null);

  // Load quick cards
  useEffect(() => {
    fetchQuickCards().then((data) => setQuickCards(data));
  }, []);

  const handleSwap = () => {
    const temp = personALang;
    setPersonALang(personBLang);
    setPersonBLang(temp);
  };

  const playAudio = (audioUrl) => {
    if (!audioUrl || !audioPlayerRef.current) return;
    audioPlayerRef.current.src = audioUrl;
    audioPlayerRef.current.play().catch((e) => console.log("Audio play notice:", e));
  };

  const handleStartSpeak = async (speaker) => {
    if (isLoading || isRecording) return;
    try {
      setActiveSpeaker(speaker);
      await startRecording();
    } catch (err) {
      setActiveSpeaker(null);
    }
  };

  const handleStopSpeak = async (speaker) => {
    if (!isRecording) return;
    const audioBlob = await stopRecording();
    if (!audioBlob) {
      setActiveSpeaker(null);
      return;
    }

    setIsLoading(true);
    const srcLang = speaker === "A" ? personALang : personBLang;
    const tgtLang = speaker === "A" ? personBLang : personALang;

    try {
      const data = await translateVoice(audioBlob, srcLang, tgtLang);
      if (data.transcript) {
        const turnData = {
          original: data.transcript,
          translated: data.translated_text,
          audioUrl: data.audio_base64,
        };

        if (speaker === "A") {
          setTurnForB(turnData);
        } else {
          setTurnForA(turnData);
        }

        if (data.audio_base64) {
          playAudio(data.audio_base64);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Translation request failed. Please check backend connection.");
    } finally {
      setIsLoading(false);
      setActiveSpeaker(null);
    }
  };

  const handleQuickPhrase = async (text) => {
    setIsLoading(true);
    try {
      const data = await translateText(text, personALang, personBLang);
      const turnData = {
        original: text,
        translated: data.translated_text,
        audioUrl: data.audio_base64,
      };
      setTurnForB(turnData);
      if (data.audio_base64) {
        playAudio(data.audio_base64);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col justify-between relative selection:bg-[#FF9933]/30">
      <audio ref={audioPlayerRef} className="hidden" />

      {/* Top Bar with Back to Landing Page Button */}
      <div className="bg-[#0A0F1D] border-b border-white/10 px-4 py-2.5 flex items-center justify-between z-30">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF9933] hover:text-[#ffaa4d] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
          <span>Bhasha Engine Active</span>
          {user && (
            <span className="border-l border-white/10 pl-2 text-white">
              Hi, {user.name}
            </span>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-md w-full mx-auto flex flex-col bg-[#070B12] border-x border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Sub Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "split" ? (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* TOP SECTION: SPEAKER B (Rotated 180° for person facing you) */}
            <div className="flex-1 bg-slate-900/40 p-4 flex flex-col justify-between border-b border-slate-800 rotate-180 transition">
              <div className="flex items-center justify-between">
                <LanguageSelector
                  value={personBLang}
                  onChange={setPersonBLang}
                  label="Partner"
                />
              </div>

              <TranslationCard
                speakerName={getLanguage(personALang).name}
                originalText={turnForB?.original}
                translatedText={turnForB?.translated}
                audioUrl={turnForB?.audioUrl}
                onPlayAudio={playAudio}
                placeholder="Spoken translation for your partner will appear here"
              />

              <MicButton
                isRecording={isRecording && activeSpeaker === "B"}
                isLoading={isLoading && activeSpeaker === "B"}
                onPressStart={() => handleStartSpeak("B")}
                onPressEnd={() => handleStopSpeak("B")}
                label="Hold to Speak"
                colorScheme="indigo"
              />
            </div>

            {/* DIVIDER BAR */}
            <div className="h-9 bg-slate-900 border-y border-slate-800 flex items-center justify-between px-4">
              <span className="text-[11px] text-slate-400 font-medium">Face-to-Face Split</span>
              <button
                onClick={handleSwap}
                className="px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700 transition"
                title="Swap Languages"
              >
                <ArrowLeftRight className="w-3 h-3 text-indigo-400" />
                <span>Swap</span>
              </button>
              <span className="text-[10px] text-slate-500 font-mono">Gnani AI</span>
            </div>

            {/* BOTTOM SECTION: SPEAKER A (Normal upright for you) */}
            <div className="flex-1 bg-slate-950 p-4 flex flex-col justify-between">
              <TranslationCard
                speakerName={getLanguage(personBLang).name}
                originalText={turnForA?.original}
                translatedText={turnForA?.translated}
                audioUrl={turnForA?.audioUrl}
                onPlayAudio={playAudio}
                placeholder="Partner's translated voice will appear here"
              />

              <div className="flex flex-col items-center">
                <MicButton
                  isRecording={isRecording && activeSpeaker === "A"}
                  isLoading={isLoading && activeSpeaker === "A"}
                  onPressStart={() => handleStartSpeak("A")}
                  onPressEnd={() => handleStopSpeak("A")}
                  label="Hold to Speak"
                  colorScheme="emerald"
                />

                <div className="mt-3">
                  <LanguageSelector
                    value={personALang}
                    onChange={setPersonALang}
                    label="You"
                  />
                </div>
              </div>
            </div>

          </div>
        ) : (
          <QuickCards
            cards={quickCards}
            targetLang={personBLang}
            onSelectPhrase={handleQuickPhrase}
            isLoading={isLoading}
          />
        )}

        {/* Simple Footer */}
        <footer className="py-2 px-4 bg-slate-950 border-t border-slate-800 text-center text-[10px] text-slate-500">
          Bhasha • Powered by Gnani Prisma & Timbre v3
        </footer>

      </div>

    </div>
  );
}
