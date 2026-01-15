"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jarNotes } from "@/data/content";

interface PositivityJarProps {
  onNext: () => void;
}

export default function PositivityJar({ onNext }: PositivityJarProps) {
  const [shownNotes, setShownNotes] = useState<number[]>([]);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const handlePick = () => {
    setIsShaking(true);
    
    setTimeout(() => {
      setIsShaking(false);
      
      // Get available notes
      let available = jarNotes
        .map((_, i) => i)
        .filter(i => !shownNotes.includes(i));

      // Reset if all shown
      if (available.length === 0) {
        available = jarNotes.map((_, i) => i);
        setShownNotes([]);
      }

      // Pick random
      const idx = available[Math.floor(Math.random() * available.length)];
      setShownNotes(prev => [...prev, idx]);
      setCurrentNote(jarNotes[idx]);
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 24px 100px",
        background: "linear-gradient(180deg, #4ECDC4 0%, #44A08D 50%, #093637 100%)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontSize: "32px" }}>✨</span>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.8)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Chapter Three
        </p>
        <span style={{ fontSize: "32px" }}>✨</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: "clamp(32px, 8vw, 52px)",
          fontFamily: "var(--font-serif)",
          color: "#ffffff",
          marginBottom: "12px",
          textAlign: "center",
        }}
      >
        The Hype Jar 🫙
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: "16px",
          fontFamily: "var(--font-serif)",
          color: "rgba(255,255,255,0.9)",
          fontStyle: "italic",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        For when you need a pick-me-up. Take as many as you need! 💪
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.7)",
          fontFamily: "var(--font-sans)",
          marginBottom: "40px",
        }}
      >
        {shownNotes.length} of {jarNotes.length} notes revealed
      </motion.p>

      {/* Jar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        style={{ position: "relative", marginBottom: "32px" }}
      >
        <motion.div
          animate={isShaking ? { 
            rotate: [0, -5, 5, -5, 5, 0],
            x: [0, -5, 5, -5, 5, 0],
          } : {}}
          transition={{ duration: 0.5 }}
          style={{
            width: "180px",
            height: "240px",
            position: "relative",
          }}
        >
          {/* Jar SVG */}
          <svg viewBox="0 0 180 240" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="jarGlass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
              </linearGradient>
            </defs>
            {/* Lid */}
            <ellipse cx="90" cy="32" rx="48" ry="10" fill="#FFE66D" />
            <rect x="42" y="24" width="96" height="12" fill="#FFA502" rx="3" />
            <ellipse cx="90" cy="24" rx="48" ry="10" fill="#FFE66D" />
            {/* Jar body */}
            <path
              d="M50 42 Q50 52 58 60 L58 65 Q30 75 28 100 L28 195 Q28 220 55 225 L125 225 Q152 220 152 195 L152 100 Q150 75 122 65 L122 60 Q130 52 130 42"
              fill="url(#jarGlass)"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
            />
            {/* Shine */}
            <path
              d="M45 90 Q42 120 42 160 Q42 190 50 210"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* Floating notes inside */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -8, 0],
                rotate: [-5 + Math.random() * 10, 5, -5 + Math.random() * 10],
              }}
              transition={{ 
                duration: 2 + Math.random(),
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                width: "24px",
                height: "18px",
                background: i % 3 === 0 ? "#FFE66D" : i % 3 === 1 ? "#FF8B94" : "#A8E6CF",
                borderRadius: "3px",
                left: `${25 + Math.random() * 45}%`,
                top: `${35 + Math.random() * 40}%`,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Pick button */}
      <motion.button
        onClick={handlePick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "18px 40px",
          fontSize: "16px",
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          color: "#44A08D",
          background: "#ffffff",
          border: "none",
          borderRadius: "100px",
          cursor: "pointer",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          marginBottom: "24px",
        }}
      >
        <span>Pick a Note</span>
        <span>🎲</span>
      </motion.button>

      {/* Continue button */}
      <motion.button
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
        style={{
          padding: "14px 32px",
          fontSize: "14px",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#ffffff",
          background: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "100px",
          cursor: "pointer",
        }}
      >
        Continue to Chapter 4 →
      </motion.button>

      {/* Note Modal */}
      <AnimatePresence>
        {currentNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrentNote(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            {/* Backdrop */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
              }}
            />

            {/* Note card */}
            <motion.div
              initial={{ scale: 0.5, rotate: -10, y: 50 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: "relative",
                background: "linear-gradient(135deg, #FFE66D 0%, #FFA502 100%)",
                borderRadius: "16px",
                padding: "40px 32px",
                maxWidth: "360px",
                width: "100%",
                textAlign: "center",
                boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* Sparkles */}
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "40px",
                }}
              >
                ✨
              </motion.span>

              <p
                style={{
                  fontSize: "20px",
                  fontFamily: "var(--font-serif)",
                  color: "#3D3632",
                  lineHeight: 1.5,
                  marginBottom: "24px",
                }}
              >
                {currentNote}
              </p>

              <button
                onClick={() => setCurrentNote(null)}
                style={{
                  fontSize: "14px",
                  fontFamily: "var(--font-sans)",
                  color: "#6B5E54",
                  background: "rgba(255,255,255,0.5)",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "100px",
                  cursor: "pointer",
                }}
              >
                Got it! 💪
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
