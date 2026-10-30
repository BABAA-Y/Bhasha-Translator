import { dark } from "@clerk/themes";

export const bhashaClerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#FF9933",
    colorText: "#F8FAFC",
    colorTextSecondary: "#94A3B8",
    colorBackground: "transparent",
    colorInputBackground: "rgba(255, 255, 255, 0.04)",
    colorInputText: "#FFFFFF",
    colorNeutral: "#94A3B8",
    colorShimmer: "rgba(255, 153, 51, 0.2)",
    borderRadius: "14px",
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    fontSize: "0.875rem",
  },
  elements: {
    card: "bg-transparent shadow-none border-0 p-0 text-white w-full",
    rootBox: "w-full",
    cardBox: "w-full shadow-none bg-transparent border-0",
    header: "hidden", // We render the clean Bhasha identity outside/above
    headerTitle: "text-white font-extrabold text-xl font-display",
    headerSubtitle: "text-slate-400 text-xs",
    socialButtonsBlockButton:
      "bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/[0.08] hover:border-white/[0.16] text-slate-200 rounded-xl transition-all duration-200 text-xs font-semibold py-2 h-10 flex items-center justify-center gap-2 cursor-pointer shadow-sm",
    socialButtonsBlockButtonText: "text-slate-200 font-semibold text-xs",
    socialButtonsProviderIcon: "w-4 h-4",
    dividerRow: "my-3.5",
    dividerLine: "bg-white/[0.08] h-[1px]",
    dividerText: "text-slate-500 text-[11px] font-semibold uppercase tracking-wider px-3",
    formButtonPrimary:
      "btn-tactile bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EA580C] text-slate-950 font-bold rounded-xl shadow-lg shadow-[#FF9933]/20 hover:scale-[1.01] active:scale-[0.98] transition-all text-xs py-2.5 h-10.5 cursor-pointer w-full mt-2",
    formFieldInput:
      "bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] focus:border-[#FF9933]/70 focus:ring-1 focus:ring-[#FF9933]/40 text-white placeholder:text-slate-500 rounded-xl text-xs py-2 px-3.5 h-10 transition-all duration-200 outline-none w-full",
    formFieldLabel: "text-slate-300 text-xs font-medium mb-1 flex justify-between items-center",
    formFieldHintText: "hidden", // Completely remove "Optional" hints from form fields
    formFieldAction: "text-[#FF9933] hover:text-[#FFAE5C] text-xs font-medium transition-colors cursor-pointer",
    formFieldErrorText: "text-rose-400 text-[11px] mt-1 font-medium",
    formFieldSuccessText: "text-emerald-400 text-[11px] mt-1 font-medium",
    footerAction: "bg-transparent border-0 pt-2 flex justify-center items-center gap-1.5",
    footerActionText: "text-slate-400 text-xs",
    footerActionLink: "text-[#FF9933] hover:text-[#FFAE5C] font-semibold text-xs transition-colors cursor-pointer ml-1",
    footerPages: "hidden",
    footerAction__development: "hidden",
    developmentBadge: "hidden",
    identityPreviewText: "text-white text-xs font-medium",
    identityPreviewEditButton: "text-[#FF9933] hover:text-[#FFAE5C] text-xs font-medium",
    otpCodeFieldInput:
      "bg-white/[0.04] border border-white/[0.08] focus:border-[#FF9933] text-white rounded-xl text-base font-mono",
    alert: "bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl p-3",
    alertText: "text-rose-300 text-xs",
    formResendCodeLink: "text-[#FF9933] hover:text-[#FFAE5C] text-xs font-medium",
    footer: "hidden",
  },
};
