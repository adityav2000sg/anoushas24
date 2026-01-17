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
  
  // Use index-based pseudo-random instead of Math.random()
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };
  
  const angle = (index / 150) * Math.PI * 2 + (pseudoRandom(index) - 0.5) * 0.5;
  const velocity = 200 + pseudoRandom(index + 1) * 500;
  const endX = Math.cos(angle) * velocity;
  const endY = Math.sin(angle) * velocity;
  
  const size = 8 + pseudoRandom(index + 2) * 12;
  const isRect = pseudoRandom(index + 3) > 0.5;
  const duration = 2 + pseudoRandom(index + 4) * 1.5;
  const delay = pseudoRandom(index + 5) * 0.3;

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
        rotate: pseudoRandom(index + 6) * 720,
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
  
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };
  
  const startX = pseudoRandom(index * 100) * 100;
  const size = 5 + pseudoRandom(index * 101) * 6;
  const duration = 5 + pseudoRandom(index * 102) * 4;
  const delay = pseudoRandom(index * 103) * 6;
  const swayAmount = (pseudoRandom(index * 104) - 0.5) * 80;

  return (
    <motion.div
      initial={{ y: -20, x: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: typeof window !== "undefined" ? window.innerHeight + 50 : 1000,
        x: swayAmount,
        rotate: pseudoRandom(index * 105) * 360,
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

// Floating balloon
function Balloon({ x, delay, color }: { x: number; delay: number; color: string }) {
  return (
    <motion.div
      initial={{ y: "110vh", opacity: 0 }}
      animate={{ y: "-10vh", opacity: 1 }}
      transition={{ duration: 10, delay, repeat: Infinity, ease: "linear" }}
      style={{
        position: "fixed",
        left: `${x}%`,
        fontSize: "clamp(36px, 7vw, 60px)",
        zIndex: 1,
        filter: `hue-rotate(${color})`,
      }}
    >
      🎈
    </motion.div>
  );
}

// Fixed position sparkle (no random positions)
function Sparkle({ index }: { index: number }) {
  // Pre-defined positions instead of random
  const positions = [
    { left: 10, top: 20 }, { left: 85, top: 15 }, { left: 25, top: 70 },
    { left: 70, top: 25 }, { left: 15, top: 50 }, { left: 90, top: 60 },
    { left: 50, top: 10 }, { left: 30, top: 85 }, { left: 75, top: 80 },
    { left: 5, top: 35 }, { left: 60, top: 45 }, { left: 40, top: 90 },
  ];
  const pos = positions[index % positions.length];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        delay: index * 0.25,
        repeat: Infinity,
      }}
      style={{
        position: "absolute",
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        fontSize: "20px",
        pointerEvents: "none",
      }}
    >
      ✨
    </motion.div>
  );
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<"waiting" | "countdown" | "surprise" | "party">("waiting");
  const [countdown, setCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  
    const a = new Audio("/audio.mp3");
    a.volume = 0.7;
    a.preload = "metadata";
    audioRef.current = a;
  
    return () => {
      a.pause();
      a.src = "";
    };
  }, []);

  const AUDIO_START_AT = 25; // seconds into the track

const startCountdown = () => {
  setPhase("countdown");

  let count = 3;
  setCountdown(count);

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      setCountdown(count);
    } else {
      clearInterval(countdownInterval);
      setPhase("surprise");
      setShowConfetti(true);
      playSound("confetti");

      const a = audioRef.current;
      if (a) {
        const playFrom = async () => {
          // If metadata is ready, seek immediately; otherwise wait for it once.
          if (a.readyState >= 1) {
            a.currentTime = Math.min(AUDIO_START_AT, Math.max(0, (a.duration || AUDIO_START_AT) - 0.25));
            await a.play().catch(() => {});
          } else {
            const onMeta = async () => {
              a.currentTime = Math.min(AUDIO_START_AT, Math.max(0, (a.duration || AUDIO_START_AT) - 0.25));
              await a.play().catch(() => {});
              a.removeEventListener("loadedmetadata", onMeta);
            };
            a.addEventListener("loadedmetadata", onMeta);
            a.load();
          }
        };

        playFrom();
      }

      setTimeout(() => setPhase("party"), 1000);
    }
  }, 800);
};

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
        background: phase === "waiting" || phase === "countdown"
          ? "linear-gradient(180deg, #FF6B9D 0%, #C44569 30%, #8B2A5B 70%, #4A1942 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
        transition: "background 0.5s ease",
        padding: "20px",
      }}
    >
      {/* Floating balloons */}
      {(phase === "waiting" || phase === "countdown") && (
        <>
          <Balloon x={5} delay={0} color="0deg" />
          <Balloon x={20} delay={1.5} color="40deg" />
          <Balloon x={80} delay={0.5} color="120deg" />
          <Balloon x={95} delay={1} color="200deg" />
        </>
      )}

      {/* Sparkles - fixed positions */}
      {phase === "waiting" && (
        <>
          {[...Array(12)].map((_, i) => (
            <Sparkle key={i} index={i} />
          ))}
        </>
      )}

      {/* Confetti explosion */}
      {showConfetti && (
        <>
          {[...Array(100)].map((_, i) => (
            <ConfettiPiece key={`explode-${i}`} index={i} centerX={center.x} centerY={center.y} />
          ))}
        </>
      )}

      {/* Gentle falling confetti */}
      {(phase === "surprise" || phase === "party") && (
        <>
          {[...Array(20)].map((_, i) => (
            <FallingConfetti key={`fall-${i}`} index={i} />
          ))}
        </>
      )}

      {/* WAITING PHASE */}
      <AnimatePresence mode="wait">
        {phase === "waiting" && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 10,
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {/* Emoji row */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: "flex",
                gap: "clamp(8px, 3vw, 16px)",
                marginBottom: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {["🎂", "🎁", "🎈", "🥳", "🎉"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.15, 
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ fontSize: "clamp(28px, 7vw, 48px)" }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            {/* It's */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                fontSize: "clamp(16px, 4vw, 24px)",
                fontFamily: "var(--font-sans)",
                color: "rgba(255,255,255,0.9)",
                marginBottom: "4px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              It's
            </motion.p>

            {/* NAME */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: "clamp(40px, 12vw, 100px)",
                fontFamily: "var(--font-serif)",
                color: "#ffffff",
                fontWeight: 400,
                lineHeight: 1,
                marginBottom: "4px",
                textShadow: "0 4px 30px rgba(0,0,0,0.3)",
              }}
            >
              {siteConfig.name}'s
            </motion.h1>

            {/* BIRTHDAY! */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                fontSize: "clamp(28px, 9vw, 70px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                color: "#FFE66D",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "16px",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Birthday!
            </motion.h2>

            {/* Age badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                width: "clamp(60px, 15vw, 80px)",
                height: "clamp(60px, 15vw, 80px)",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FFE66D 0%, #FFA502 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "32px",
                boxShadow: "0 8px 30px rgba(255,165,2,0.5)",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(28px, 7vw, 36px)",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  color: "#4A1942",
                }}
              >
                {siteConfig.age}
              </span>
            </motion.div>

            {/* Start button */}
            <motion.button
              onClick={startCountdown}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "clamp(14px, 4vw, 20px) clamp(32px, 10vw, 60px)",
                fontSize: "clamp(14px, 4vw, 18px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                color: "#4A1942",
                background: "#ffffff",
                border: "none",
                borderRadius: "100px",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              🎉 Let's Celebrate! 🎉
            </motion.button>

            {/* From line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              style={{
                marginTop: "32px",
                fontSize: "clamp(12px, 3vw, 14px)",
                fontFamily: "var(--font-sans)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Made with 💕 by {siteConfig.author}
            </motion.p>
          </motion.div>
        )}

        {/* COUNTDOWN PHASE */}
        {phase === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <motion.span
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontSize: "clamp(100px, 30vw, 220px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 900,
                color: "#ffffff",
                textShadow: "0 0 60px rgba(255,255,255,0.5)",
              }}
            >
              {countdown}
            </motion.span>
          </motion.div>
        )}

        {/* SURPRISE/PARTY PHASE */}
        {(phase === "surprise" || phase === "party") && (
          <motion.div
            key="party"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              zIndex: 100,
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {/* SURPRISE! */}
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                fontSize: "clamp(22px, 5vw, 40px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                marginBottom: "12px",
              }}
            >
              🎊 Surprise! 🎊
            </motion.h2>

            {/* Happy Birthday */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                fontSize: "clamp(14px, 3vw, 22px)",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                color: "#FFE66D",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Happy Birthday
            </motion.p>

            {/* NAME */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              style={{
                fontSize: "clamp(48px, 15vw, 160px)",
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 0.95,
                marginBottom: "20px",
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
                width: "clamp(70px, 18vw, 90px)",
                height: "clamp(70px, 18vw, 90px)",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FFE66D 0%, #FFA502 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 30px rgba(255,165,2,0.5)",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(32px, 8vw, 42px)",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  color: "#764ba2",
                }}
              >
                {siteConfig.age}
              </span>
            </motion.div>

            {/* Message */}
            {phase === "party" && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontSize: "clamp(14px, 3vw, 18px)",
                  fontFamily: "var(--font-sans)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                With love, {siteConfig.author} 💕
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      {phase === "party" && (
        <motion.button
          onClick={onComplete}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 1.5 }}
          whileHover={{ opacity: 1, scale: 1.02 }}
          style={{
            position: "absolute",
            bottom: "clamp(20px, 5vh, 40px)",
            fontSize: "clamp(14px, 3.5vw, 16px)",
            color: "#ffffff",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.4)",
            padding: "clamp(12px, 3vw, 14px) clamp(28px, 8vw, 36px)",
            borderRadius: "100px",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
          }}
        >
          Enter →
        </motion.button>
      )}
    </div>
  );
}