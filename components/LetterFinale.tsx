"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theLetter, easterEgg, siteConfig } from "@/data/content";

interface LetterFinaleProps {
  onNext?: () => void;
}

export default function LetterFinale({ onNext }: LetterFinaleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const paragraphs = theLetter.body.split("\n\n");
  const preview = paragraphs.slice(0, 2);
  const rest = paragraphs.slice(2);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "60px 24px 100px",
        background: "linear-gradient(180deg, #FF8B94 0%, #FF6B6B 50%, #C44569 100%)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <span style={{ fontSize: "32px" }}>💌</span>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-sans)",
            }}
          >
            The Letter
          </p>
          <span style={{ fontSize: "32px" }}>💌</span>
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
          }}
        >
          A Letter For You
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
          }}
        >
          Words I wanted you to keep 💕
        </motion.p>
      </div>

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#FFFEFA",
          borderRadius: "16px",
          padding: "40px 28px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Greeting */}
        <p
          style={{
            fontSize: "24px",
            fontFamily: "var(--font-serif)",
            color: "#3D3632",
            marginBottom: "24px",
          }}
        >
          {theLetter.greeting}
        </p>

        {/* Preview paragraphs */}
        {preview.map((para, i) => (
          <p
            key={i}
            style={{
              fontSize: "16px",
              fontFamily: "var(--font-serif)",
              color: "#4A4A4A",
              lineHeight: 1.8,
              marginBottom: "20px",
            }}
          >
            {para}
          </p>
        ))}

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && rest.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                fontSize: "16px",
                fontFamily: "var(--font-serif)",
                color: "#4A4A4A",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              {para}
            </motion.p>
          ))}
        </AnimatePresence>

        {/* Read more */}
        {!isExpanded && rest.length > 0 && (
          <button
            onClick={() => setIsExpanded(true)}
            style={{
              fontSize: "14px",
              color: "#FF6B6B",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              marginBottom: "24px",
            }}
          >
            Read more →
          </button>
        )}

        {/* Closing */}
        <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #F0EBE3" }}>
          <p
            style={{
              fontSize: "16px",
              fontFamily: "var(--font-serif)",
              color: "#4A4A4A",
              fontStyle: "italic",
              marginBottom: "8px",
            }}
          >
            {theLetter.closing}
          </p>
          <p
            style={{
              fontSize: "24px",
              fontFamily: "var(--font-serif)",
              color: "#3D3632",
            }}
          >
            {theLetter.signature}
          </p>
        </div>

        {/* PS */}
        <p
          style={{
            marginTop: "24px",
            fontSize: "14px",
            fontFamily: "var(--font-serif)",
            color: "#8B7E74",
          }}
        >
          {theLetter.ps}
        </p>

        {/* Easter egg button */}
        <button
          onClick={() => setShowEasterEgg(true)}
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            width: "24px",
            height: "24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            opacity: 0.3,
            fontSize: "16px",
          }}
        >
          👀
        </button>
      </motion.div>

      {/* Finale Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          maxWidth: "600px",
          margin: "60px auto 0",
          textAlign: "center",
        }}
      >
        {/* Party emojis */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "24px" }}>
          {["🎉", "🎂", "🥳", "🎈", "✨"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: "28px" }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <h3
          style={{
            fontSize: "clamp(28px, 6vw, 42px)",
            fontFamily: "var(--font-serif)",
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          Happy {siteConfig.age}th, {siteConfig.name}! 🎂
        </h3>

        <p
          style={{
            fontSize: "18px",
            fontFamily: "var(--font-serif)",
            color: "rgba(255,255,255,0.9)",
            marginBottom: "8px",
          }}
        >
          Here's to your best year yet! 🚀
        </p>

        <p
          style={{
            fontSize: "16px",
            fontFamily: "var(--font-sans)",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          With love, {siteConfig.author} 💕
        </p>

        {/* Continue to gift reveal button */}
        {onNext && (
          <motion.button
            onClick={onNext}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              marginTop: "40px",
              padding: "18px 48px",
              fontSize: "16px",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              color: "#C44569",
              background: "#ffffff",
              border: "none",
              borderRadius: "100px",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            But wait... there's more 👀
          </motion.button>
        )}
      </motion.div>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
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
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.8)",
                backdropFilter: "blur(8px)",
              }}
            />
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: "relative",
                background: "#FFFEFA",
                borderRadius: "16px",
                padding: "40px 32px",
                maxWidth: "340px",
                textAlign: "center",
                boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
              }}
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}
              >
                🎉
              </motion.span>
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "var(--font-serif)",
                  color: "#3D3632",
                  lineHeight: 1.6,
                }}
              >
                {easterEgg.message}
              </p>
              <button
                onClick={() => setShowEasterEgg(false)}
                style={{
                  marginTop: "24px",
                  fontSize: "14px",
                  color: "#8B7E74",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}