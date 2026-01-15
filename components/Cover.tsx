"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/content";

interface CoverProps {
  onBegin: () => void;
}

// Floating balloon
function Balloon({ color, x, delay }: { color: string; x: number; delay: number }) {
  return (
    <motion.div
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "-20vh", opacity: [0, 1, 1, 0] }}
      transition={{ duration: 15, delay, repeat: Infinity, ease: "linear" }}
      style={{
        position: "absolute",
        left: `${x}%`,
        bottom: 0,
        fontSize: "40px",
        zIndex: 1,
        filter: `hue-rotate(${color}deg)`,
      }}
    >
      🎈
    </motion.div>
  );
}

export default function Cover({ onBegin }: CoverProps) {
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
        background: "linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating balloons */}
      {[10, 25, 40, 60, 75, 90].map((x, i) => (
        <Balloon key={i} x={x} color={String(i * 60)} delay={i * 2} />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Party emoji row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {["🎉", "🎂", "🥳", "🎈", "✨"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              style={{ fontSize: "32px" }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* It's your day! */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "clamp(18px, 4vw, 24px)",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            color: "#FFE66D",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "8px",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          It's Your Day!
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          style={{
            fontSize: "clamp(56px, 16vw, 140px)",
            fontFamily: "var(--font-serif)",
            color: "#ffffff",
            fontWeight: 400,
            lineHeight: 1,
            marginBottom: "16px",
            textShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          {siteConfig.name}
        </motion.h1>

        {/* Age badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFE66D 0%, #FFA502 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            boxShadow: "0 8px 30px rgba(255,165,2,0.5)",
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            fontSize: "clamp(16px, 3vw, 20px)",
            fontFamily: "var(--font-serif)",
            color: "rgba(255,255,255,0.9)",
            fontStyle: "italic",
            marginBottom: "12px",
            maxWidth: "400px",
          }}
        >
          {siteConfig.subtitle}
        </motion.p>

        {/* From */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontSize: "14px",
            fontFamily: "var(--font-sans)",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "40px",
          }}
        >
          Made with 💕 by {siteConfig.author}
        </motion.p>

        {/* Begin button */}
        <motion.button
          onClick={onBegin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "18px 48px",
            fontSize: "16px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            color: "#764ba2",
            background: "#ffffff",
            border: "none",
            borderRadius: "100px",
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          <span>Let's Go!</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🎉
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
