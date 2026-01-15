"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twentyFourWishes, siteConfig } from "@/data/content";

interface Wishes24Props {
  onNext: () => void;
}

// Individual Drawer component with 3D pull animation
function Drawer({ 
  wish, 
  isOpen, 
  onToggle,
  index,
}: { 
  wish: { number: number; wish: string; emoji: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      style={{
        perspective: "1000px",
        width: "100%",
      }}
    >
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: "100%",
          background: "linear-gradient(180deg, #5D4E60 0%, #4A3F4C 100%)",
          border: "none",
          borderRadius: "8px",
          padding: "0",
          cursor: "pointer",
          position: "relative",
          transformStyle: "preserve-3d",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Drawer face */}
        <div
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Number badge */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFE66D 0%, #FFA502 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-serif)",
              fontSize: "16px",
              fontWeight: 700,
              color: "#4A3F4C",
              boxShadow: "0 2px 8px rgba(255,165,2,0.4)",
            }}
          >
            {wish.number}
          </div>

          {/* Handle */}
          <div
            style={{
              width: "50px",
              height: "12px",
              background: "linear-gradient(180deg, #C9B89A 0%, #A69878 100%)",
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          />

          {/* Emoji preview */}
          <span style={{ fontSize: "24px" }}>{wish.emoji}</span>
        </div>

        {/* Drawer pull-out section */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                overflow: "hidden",
                background: "linear-gradient(180deg, #FFFEFA 0%, #F5F0E8 100%)",
                borderRadius: "0 0 8px 8px",
                margin: "0 4px 4px 4px",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>
                  {wish.emoji}
                </span>
                <p
                  style={{
                    fontSize: "16px",
                    fontFamily: "var(--font-serif)",
                    color: "#3D3632",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {wish.wish}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

export default function Wishes24({ onNext }: Wishes24Props) {
  const [openDrawer, setOpenDrawer] = useState<number | null>(null);
  const [openedDrawers, setOpenedDrawers] = useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    if (openDrawer === index) {
      setOpenDrawer(null);
    } else {
      setOpenDrawer(index);
      setOpenedDrawers(prev => new Set(prev).add(index));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "60px 16px 100px",
        background: "linear-gradient(180deg, #2D2438 0%, #1A1520 100%)",
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
          <span style={{ fontSize: "32px" }}>🎁</span>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#B8A88A",
              fontFamily: "var(--font-sans)",
            }}
          >
            Chapter Two
          </p>
          <span style={{ fontSize: "32px" }}>🎁</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: "clamp(32px, 8vw, 52px)",
            fontFamily: "var(--font-serif)",
            color: "#FFFEFA",
            marginBottom: "12px",
          }}
        >
          {siteConfig.age} Birthday Wishes
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "16px",
            fontFamily: "var(--font-serif)",
            color: "#C9B89A",
            fontStyle: "italic",
            marginBottom: "8px",
          }}
        >
          One for each year. Pull to reveal ✨
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "14px",
            color: "#8B7E74",
            fontFamily: "var(--font-sans)",
          }}
        >
          {openedDrawers.size} of {twentyFourWishes.length} opened
        </motion.p>
      </div>

      {/* Drawers Grid */}
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {twentyFourWishes.map((wish, index) => (
          <Drawer
            key={wish.number}
            wish={wish}
            isOpen={openDrawer === index}
            onToggle={() => handleToggle(index)}
            index={index}
          />
        ))}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "48px",
        }}
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: "16px 40px",
            fontSize: "14px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#2D2438",
            background: "linear-gradient(135deg, #FFE66D 0%, #FFA502 100%)",
            border: "none",
            borderRadius: "100px",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(255,165,2,0.4)",
          }}
        >
          Continue to Chapter 3 →
        </motion.button>
      </motion.div>
    </div>
  );
}
