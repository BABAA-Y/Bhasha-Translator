import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { getLanguage } from "../constants/languages";

const DEFAULT_CATEGORIES = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "travel",
    label: "🛺 Travel",
  },
  {
    id: "payment",
    label: "💳 Payment",
  },
  {
    id: "emergency",
    label: "🏥 Emergency",
  },
];

const DEFAULT_PHRASES = [
  { hi: "नमस्ते, आप कैसे हैं?", en: "Hello, how are you?", category: "all" },
  { hi: "भैया मीटर से चलोगे?", en: "Brother, will you go by meter?", category: "travel" },
  { hi: "रेलवे स्टेशन चलोगे?", en: "Will you go to the railway station?", category: "travel" },
  { hi: "यहाँ रोक दीजिए।", en: "Please stop here.", category: "travel" },
  { hi: "ऑनलाइन पेमेंट चलेगा?", en: "Do you accept online payment / UPI?", category: "payment" },
  { hi: "कुल कितना रुपया हुआ?", en: "How much is the total?", category: "payment" },
  { hi: "कैश नहीं है मेरे पास।", en: "I don't have cash on me.", category: "payment" },
  { hi: "दवाई की दुकान कहाँ है?", en: "Where is the pharmacy / medical shop?", category: "emergency" },
  { hi: "यह दवाई कब खानी है?", en: "When should I take this medicine?", category: "emergency" },
  { hi: "कृपया मेरी मदद करें।", en: "Please help me.", category: "emergency" },
  { hi: "धन्यवाद!", en: "Thank you!", category: "all" },
];

export default function QuickCards({
  cards = [],
  sourceLang = "hi",
  targetLang = "ta",
  onSelectPhrase,
  isLoading = false,
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const targetLangObj = getLanguage(targetLang);
  const sourceLangObj = getLanguage(sourceLang);

  // Flatten phrases with categories
  const allPhrases = [];
  if (cards && cards.length > 0) {
    cards.forEach((cat) => {
      const catKey = cat.id?.includes("travel")
        ? "travel"
        : cat.id?.includes("payment")
        ? "payment"
        : cat.id?.includes("emergency")
        ? "emergency"
        : "all";

      if (cat.phrases) {
        cat.phrases.forEach((p) => {
          allPhrases.push({
            hi: p.hi,
            en: p.label || p.en || "",
            category: catKey,
          });
        });
      }
    });
  }

  const rawList = allPhrases.length > 0 ? allPhrases : DEFAULT_PHRASES;

  const filteredList =
    selectedCategory === "all"
      ? rawList
      : rawList.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-bold text-white font-display">
          Quick Phrases
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Tap any phrase to translate from {sourceLangObj.name} into {targetLangObj.name} and speak aloud.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {DEFAULT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-[#FF9933] text-slate-950 font-semibold shadow-sm"
                : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredList.map((phrase, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPhrase && onSelectPhrase(phrase.hi)}
            disabled={isLoading}
            className="text-left p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] active:bg-white/[0.09] border border-white/[0.08] hover:border-white/[0.15] transition flex items-center justify-between gap-3 cursor-pointer group disabled:opacity-50"
          >
            <div>
              <p className="text-base font-semibold text-white font-indic group-hover:text-[#FF9933] transition-colors">
                {phrase.hi}
              </p>
              {phrase.en && (
                <p className="text-xs text-slate-400 mt-0.5">
                  {phrase.en}
                </p>
              )}
            </div>

            <div className="w-8 h-8 rounded-lg bg-white/[0.05] group-hover:bg-[#FF9933]/20 text-slate-400 group-hover:text-[#FF9933] flex items-center justify-center shrink-0 transition">
              <Volume2 className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
