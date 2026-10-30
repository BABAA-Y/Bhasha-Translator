import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignIn, SignUp } from "@clerk/clerk-react";
import LiquidGlassAuthCard from "../components/auth/LiquidGlassAuthCard";
import ClerkSetupNotice from "../components/auth/ClerkSetupNotice";
import { bhashaClerkAppearance } from "../styles/clerkTheme";

export default function AuthPage({ mode = "login", isClerkConfigured = false }) {
  return (
    <LiquidGlassAuthCard mode={mode}>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="w-full flex justify-center"
        >
          {isClerkConfigured ? (
            mode === "login" ? (
              <SignIn
                routing="path"
                path="/login"
                signUpUrl="/signup"
                fallbackRedirectUrl="/app"
                appearance={bhashaClerkAppearance}
              />
            ) : (
              <SignUp
                routing="path"
                path="/signup"
                signInUrl="/login"
                fallbackRedirectUrl="/app"
                appearance={bhashaClerkAppearance}
              />
            )
          ) : (
            <ClerkSetupNotice mode={mode} />
          )}
        </motion.div>
      </AnimatePresence>
    </LiquidGlassAuthCard>
  );
}
