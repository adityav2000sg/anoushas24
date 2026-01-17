"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/content";

export default function GiftReveal() {
  const [phase, setPhase] = useState<"intro" | "building" | "reveal">("intro");

  const handleStart = () => {
    setPhase("building");
    setTimeout(() => setPhase("reveal"), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        background: phase === "intro" 
          ? "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)"
          : "linear-gradient(180deg, #8B0000 0%, #DC143C 50%, #FF4444 100%)",
        transition: "background 1s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ferrari-style racing stripes background */}
      {phase === "reveal" && (
        <>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "30%",
              height: "100%",
              background: "rgba(255,255,255,0.1)",
              transform: "skewX(-20deg)",
            }}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "15%",
              height: "100%",
              background: "rgba(255,255,255,0.05)",
              transform: "skewX(-20deg)",
            }}
          />
        </>
      )}

      {/* INTRO PHASE */}
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: "18px",
                color: "#888",
                fontFamily: "var(--font-sans)",
                marginBottom: "16px",
              }}
            >
              Oh, one more thing...
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                fontSize: "clamp(28px, 6vw, 42px)",
                fontFamily: "var(--font-serif)",
                color: "#ffffff",
                marginBottom: "40px",
              }}
            >
              There's a surprise for you 🎁
            </motion.h2>

            <motion.button
              onClick={handleStart}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "18px 48px",
                fontSize: "16px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                color: "#ffffff",
                background: "linear-gradient(135deg, #8B0000 0%, #DC143C 100%)",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(220,20,60,0.4)",
              }}
            >
              Show me →
            </motion.button>
          </motion.div>
        )}

        {/* BUILDING PHASE */}
        {phase === "building" && (
          <motion.div
            key="building"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                fontSize: "24px",
                color: "#ffffff",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.3em",
              }}
            >
              🏎️ . . . 🏎️
            </motion.p>
          </motion.div>
        )}

        {/* REVEAL PHASE */}
        {phase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            {/* Scuderia style label */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: "14px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)",
                fontFamily: "var(--font-sans)",
                marginBottom: "24px",
              }}
            >
              Scuderia Ferrari
            </motion.p>

            {/* THE NUMBER 55 - HUGE */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.4,
                type: "spring",
                stiffness: 150,
                damping: 12,
              }}
              style={{
                position: "relative",
                marginBottom: "32px",
              }}
            >
              <motion.h1
                animate={{ 
                  textShadow: [
                    "0 0 40px rgba(255,255,255,0.3)",
                    "0 0 80px rgba(255,255,255,0.5)",
                    "0 0 40px rgba(255,255,255,0.3)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: "clamp(120px, 35vw, 280px)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 0.9,
                  fontStyle: "italic",
                }}
              >
                55
              </motion.h1>
            </motion.div>

            {/* Helmet silhouette hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                marginBottom: "32px",
              }}
            >
              <svg 
                width="80" 
                height="60" 
                viewBox="0 0 80 60" 
                style={{ opacity: 0.6 }}
              >
                <path
                  d="M40 5 C20 5 10 20 10 35 C10 50 20 55 40 55 C60 55 70 50 70 35 C70 20 60 5 40 5 Z M20 30 L35 30 L35 40 L20 40 Z"
                  fill="white"
                />
              </svg>
            </motion.div>

            {/* Carlos Sainz */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                fontSize: "clamp(20px, 4vw, 28px)",
                fontFamily: "var(--font-serif)",
                color: "#ffffff",
                fontStyle: "italic",
                marginBottom: "16px",
              }}
            >
              Carlos Sainz Jr.
            </motion.p>

            {/* Cryptic message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              style={{
                fontSize: "18px",
                fontFamily: "var(--font-sans)",
                color: "rgba(255,255,255,0.7)",
                maxWidth: "300px",
              }}
            >
              Something special is waiting for you... 👀
            </motion.p>

            {/* Subtle hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ delay: 2, duration: 3, repeat: Infinity }}
              style={{
                marginTop: "48px",
                fontSize: "14px",
                fontFamily: "var(--font-sans)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              (psst... look at {siteConfig.author})
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}