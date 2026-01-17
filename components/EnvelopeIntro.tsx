"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/content";
import { playSound } from "@/lib/sounds";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

// Confetti piece that explodes from center
function ConfettiPiece({ index, centerX, centerY }: { index: number; centerX: number; centerY: number }) {
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF8B94", "#A8E6CF", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"];
  const color = colors[index % colors.length];
  
  const angle = (index / 150) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
  const velocity = 200 + Math.random() * 500;
  const endX = Math.cos(angle) * velocity;
  const endY = Math.sin(angle) * velocity;
  
  const size = 8 + Math.random() * 12;
  const isRect = Math.random() > 0.5;
  const duration = 2 + Math.random() * 1.5;
  const delay = Math.random() * 0.3;

  return (
    <motion.div
      initial={{ 
        x: centerX,
        y: centerY,
        scale: 0,
        rotate: 0,
      }}
      animate={{ 
        x: centerX + endX,
        y: centerY + endY + 300,
        scale: 1,
        rotate: Math.random() * 720,
        opacity: [1, 1, 1, 0],
      }}
      transition={{ 
        duration,
        delay,
        ease: "easeOut",
      }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: isRect ? size * 0.4 : size,
        height: isRect ? size * 1.5 : size,
        background: color,
        borderRadius: isRect ? "2px" : "50%",
        zIndex: 10001,
        pointerEvents: "none",
      }}
    />
  );
}

// Falling confetti (continuous, gentle)
function FallingConfetti({ index }: { index: number }) {
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF8B94", "#A8E6CF", "#DDA0DD"];
  const color = colors[index % colors.length];
  const startX = Math.random() * 100;
  const size = 5 + Math.random() * 6;
  const duration = 5 + Math.random() * 4;
  const delay = Math.random() * 6;
  const swayAmount = (Math.random() - 0.5) * 80;

  return (
    <motion.div
      initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: typeof window !== "undefined" ? window.innerHeight + 50 : 1000,
        x: swayAmount,
        rotate: Math.random() * 360,
        opacity: [0, 0.7, 0.7, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
      style={{
        position: "fixed",
        top: 0,
        left: `${startX}%`,
        width: size * 0.4,
        height: size * 1.2,
        background: color,
        borderRadius: "2px",
        zIndex: 10000,
        pointerEvents: "none",
      }}
    />
  );
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<"dark" | "surprise" | "party">("dark");
  const [showConfetti, setShowConfetti] = useState(false);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    audioRef.current = new Audio("/audio.mp3");
    audioRef.current.volume = 0.7;

    const timer1 = setTimeout(() => {
      setPhase("surprise");
      setShowConfetti(true);
      playSound("confetti");
      audioRef.current?.play().catch(() => {});
    }, 1500);

    const timer2 = setTimeout(() => setPhase("party"), 2500);
    const timer3 = setTimeout(() => onComplete(), 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: phase === "dark" 
          ? "#0a0a0a" 
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
        transition: "background 0.5s ease",
      }}
    >
      {/* Confetti explosion */}
      {showConfetti && (
        <>
          {[...Array(150)].map((_, i) => (
            <ConfettiPiece key={`explode-${i}`} index={i} centerX={center.x} centerY={center.y} />
          ))}
        </>
      )}

      {/* Gentle falling confetti */}
      {phase !== "dark" && (
        <>
          {[...Array(30)].map((_, i) => (
            <FallingConfetti key={`fall-${i}`} index={i} />
          ))}
        </>
      )}

      {/* DARK PHASE - Countdown */}
      <AnimatePresence>
        {phase === "dark" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: "center" }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{
                fontSize: "28px",
                color: "#ffffff",
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.3em",
              }}
            >
              3... 2... 1...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SURPRISE PHASE - Clean reveal */}
      <AnimatePresence>
        {(phase === "surprise" || phase === "party") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 100,
              padding: "0 24px",
            }}
          >
            {/* SURPRISE! */}
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                fontSize: "clamp(20px, 4vw, 32px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                marginBottom: "12px",
              }}
            >
              🎉 Surprise! 🎉
            </motion.h2>

            {/* Happy Birthday */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                fontSize: "clamp(14px, 3vw, 20px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                color: "#FFE66D",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Happy Birthday
            </motion.p>

            {/* NAME - HUGE */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              style={{
                fontSize: "clamp(56px, 18vw, 180px)",
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 0.95,
                marginBottom: "24px",
                textShadow: "0 8px 40px rgba(0,0,0,0.3)",
              }}
            >
              {siteConfig.name}
            </motion.h1>

            {/* Age badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FFE66D 0%, #FFA502 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 30px rgba(255,165,2,0.5)",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  fontSize: "42px",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  color: "#764ba2",
                }}
              >
                {siteConfig.age}
              </span>
            </motion.div>

            {/* Message - only in party phase */}
            <AnimatePresence>
              {phase === "party" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ textAlign: "center" }}
                >
                  <p
                    style={{
                      fontSize: "clamp(14px, 2.5vw, 18px)",
                      fontFamily: "var(--font-sans)",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    With love, {siteConfig.author} 💕
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button - positioned clearly at bottom */}
      {phase !== "dark" && (
        <motion.button
          onClick={onComplete}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "14px",
            color: "#ffffff",
            background: "rgba(255,255,255,0.2)",
            border: "none",
            padding: "12px 28px",
            borderRadius: "100px",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          Tap to continue →
        </motion.button>
      )}
    </div>
  );
}
