"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftReveal() {
  const [phase, setPhase] = useState<"intro" | "building" | "reveal">("intro");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleStart = () => {
    audioRef.current = new Audio("/f1-theme.mp3");
    audioRef.current.volume = 0.8;
    audioRef.current.play().catch(() => {});
    
    setPhase("building");
    setTimeout(() => setPhase("reveal"), 3000);
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
        padding: "40px 24px",
        background: phase === "intro" 
          ? "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)"
          : "linear-gradient(180deg, #0d0d0d 0%, #1a0000 50%, #2a0000 100%)",
        transition: "background 1s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background particles */}
      {phase === "reveal" && (
        <>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [0, -100],
                x: (i % 2 === 0 ? 1 : -1) * (i * 3),
              }}
              transition={{ 
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                position: "absolute",
                bottom: "10%",
                left: `${(i / 30) * 100}%`,
                width: "4px",
                height: "4px",
                background: "#DC143C",
                borderRadius: "50%",
                boxShadow: "0 0 10px #DC143C",
              }}
            />
          ))}
        </>
      )}

      {/* Checkered flags */}
      {phase === "reveal" && (
        <>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "10px",
              background: "repeating-linear-gradient(90deg, #fff 0px, #fff 15px, #000 15px, #000 30px)",
            }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "10px",
              background: "repeating-linear-gradient(90deg, #fff 0px, #fff 15px, #000 15px, #000 30px)",
            }}
          />
        </>
      )}

      {/* Side racing stripes */}
      {phase === "reveal" && (
        <>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "8px",
              background: "linear-gradient(180deg, transparent 0%, #DC143C 20%, #DC143C 80%, transparent 100%)",
              transformOrigin: "top",
            }}
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "8px",
              background: "linear-gradient(180deg, transparent 0%, #DC143C 20%, #DC143C 80%, transparent 100%)",
              transformOrigin: "top",
            }}
          />
        </>
      )}

      {/* Diagonal speed lines */}
      {phase === "reveal" && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: [0, 0.3, 0], x: 200 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.15, repeat: Infinity, repeatDelay: 2 }}
              style={{
                position: "absolute",
                left: `${i * 15}%`,
                top: "20%",
                width: "150px",
                height: "2px",
                background: "linear-gradient(90deg, transparent, #DC143C, transparent)",
                transform: "rotate(-35deg)",
              }}
            />
          ))}
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
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              style={{ fontSize: "60px", marginBottom: "20px" }}
            >
              🎁
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: "clamp(14px, 3.5vw, 18px)",
                color: "#666",
                fontFamily: "var(--font-sans)",
                marginBottom: "12px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Wait... one more thing
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                fontSize: "clamp(32px, 8vw, 56px)",
                fontFamily: "var(--font-serif)",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              There's a Gift for You
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                fontSize: "clamp(16px, 4vw, 20px)",
                color: "#888",
                fontFamily: "var(--font-sans)",
                marginBottom: "50px",
              }}
            >
              Something I've been keeping secret... 🤫
            </motion.p>

            <motion.button
              onClick={handleStart}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.08, boxShadow: "0 20px 60px rgba(220,20,60,0.6)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "22px 70px",
                fontSize: "clamp(16px, 4vw, 20px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                color: "#ffffff",
                background: "linear-gradient(135deg, #DC143C 0%, #8B0000 100%)",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                boxShadow: "0 15px 50px rgba(220,20,60,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              🏎️ Reveal Gift 🏎️
            </motion.button>
          </motion.div>
        )}

        {/* BUILDING PHASE - F1 Lights */}
        {phase === "building" && (
          <motion.div
            key="building"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* F1 Start Lights */}
            <div style={{ display: "flex", gap: "clamp(12px, 4vw, 28px)", marginBottom: "50px" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ backgroundColor: "#1a1a1a", boxShadow: "none" }}
                  animate={{ 
                    backgroundColor: "#DC143C",
                    boxShadow: "0 0 30px #DC143C, 0 0 60px #DC143C",
                  }}
                  transition={{ delay: i * 0.5, duration: 0.2 }}
                  style={{
                    width: "clamp(50px, 12vw, 80px)",
                    height: "clamp(50px, 12vw, 80px)",
                    borderRadius: "50%",
                    border: "4px solid #333",
                  }}
                />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: "clamp(24px, 6vw, 40px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                marginBottom: "10px",
              }}
            >
              Lights Out
            </motion.p>

            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{
                fontSize: "clamp(18px, 4vw, 28px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                color: "#DC143C",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
              }}
            >
              And away we go...
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
              width: "100%",
              maxWidth: "700px",
            }}
          >
            {/* Ferrari Logo Area */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(10px, 2.5vw, 14px)",
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                  color: "#DC143C",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                Scuderia Ferrari
              </p>
              <div style={{ 
                width: "60px", 
                height: "2px", 
                background: "linear-gradient(90deg, transparent, #DC143C, transparent)" 
              }} />
            </motion.div>

            {/* THE NUMBER 55 */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150, damping: 12 }}
              style={{ position: "relative", marginBottom: "30px" }}
            >
              <motion.h1
                animate={{ 
                  textShadow: [
                    "0 0 40px rgba(220,20,60,0.6), 0 0 80px rgba(220,20,60,0.4), 0 0 120px rgba(220,20,60,0.2)",
                    "0 0 60px rgba(220,20,60,0.8), 0 0 100px rgba(220,20,60,0.6), 0 0 140px rgba(220,20,60,0.3)",
                    "0 0 40px rgba(220,20,60,0.6), 0 0 80px rgba(220,20,60,0.4), 0 0 120px rgba(220,20,60,0.2)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: "clamp(100px, 30vw, 220px)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 0.8,
                  fontStyle: "italic",
                }}
              >
                55
              </motion.h1>
            </motion.div>

            {/* Carlos Sainz Image - Bigger with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              style={{
                position: "relative",
                width: "clamp(250px, 70vw, 420px)",
                height: "clamp(180px, 50vw, 300px)",
                borderRadius: "20px",
                overflow: "hidden",
                marginBottom: "30px",
              }}
            >
              {/* Glow effect behind image */}
              <div style={{
                position: "absolute",
                inset: "-10px",
                background: "radial-gradient(ellipse at center, rgba(220,20,60,0.4) 0%, transparent 70%)",
                zIndex: 0,
              }} />
              
              {/* Border */}
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                border: "3px solid #DC143C",
                boxShadow: "0 0 30px rgba(220,20,60,0.5), inset 0 0 30px rgba(220,20,60,0.1)",
                zIndex: 2,
                pointerEvents: "none",
              }} />
              
              <img
                src="/carlos-sainz.jpg"
                alt="Carlos Sainz"
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </motion.div>

            {/* Carlos Sainz Name */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                fontSize: "clamp(28px, 7vw, 48px)",
                fontFamily: "var(--font-serif)",
                color: "#ffffff",
                fontStyle: "italic",
                marginBottom: "24px",
              }}
            >
              Carlos Sainz Jr.
            </motion.h2>

            {/* The Prize Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              style={{
                background: "linear-gradient(135deg, rgba(220,20,60,0.2) 0%, rgba(139,0,0,0.2) 100%)",
                border: "2px solid #DC143C",
                borderRadius: "16px",
                padding: "24px 32px",
                marginBottom: "30px",
                maxWidth: "500px",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(12px, 3vw, 14px)",
                  color: "#DC143C",
                  fontFamily: "var(--font-sans)",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  marginBottom: "12px",
                }}
              >
                Your Gift
              </p>
              
              <h3
                style={{
                  fontSize: "clamp(20px, 5vw, 32px)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.3,
                  marginBottom: "8px",
                }}
              >
                1:2 Scale Replica Helmet
              </h3>
              
              <p
                style={{
                  fontSize: "clamp(14px, 3.5vw, 18px)",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                2024 Scuderia Ferrari F1 Season
              </p>
            </motion.div>

            {/* Emojis row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "30px",
              }}
            >
              {["🏎️", "🏆", "🇮🇹", "🔥", "🏁"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontSize: "clamp(24px, 6vw, 36px)" }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            {/* Turn around message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <motion.p
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: "clamp(18px, 4.5vw, 26px)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                Turn around! 👀
              </motion.p>
              
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  fontSize: "clamp(14px, 3.5vw, 18px)",
                  fontFamily: "var(--font-sans)",
                  color: "#DC143C",
                }}
              >
                Your prize awaits..
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}