"use client";

import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "@/data/content";

interface ChapterMapProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapter: number;
  onNavigate: (chapter: number) => void;
}

export default function ChapterMap({ isOpen, onClose, currentChapter, onNavigate }: ChapterMapProps) {
  const handleNavigate = (chapterId: number) => {
    onNavigate(chapterId);
    onClose();
  };

  const chapterEmojis = ["🎉", "📸", "🎁", "✨", "💌", "💕", "🏎️"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              maxWidth: "320px",
              height: "100%",
              background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)",
              padding: "32px 20px",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "32px",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                }}
              >
                🎂 Chapters
              </h3>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  color: "#ffffff",
                  fontSize: "16px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Chapter list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {chapters.map((chapter, index) => (
                <motion.button
                  key={chapter.id}
                  onClick={() => handleNavigate(chapter.id)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    background: currentChapter === chapter.id 
                      ? "rgba(255,255,255,0.25)" 
                      : "rgba(255,255,255,0.1)",
                    border: currentChapter === chapter.id 
                      ? "2px solid rgba(255,255,255,0.5)" 
                      : "2px solid transparent",
                    borderRadius: "12px",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  {/* Emoji */}
                  <span style={{ fontSize: "28px" }}>
                    {chapterEmojis[index]}
                  </span>

                  {/* Text */}
                  <div>
                    <p
                      style={{
                        fontSize: "16px",
                        fontFamily: "var(--font-serif)",
                        color: "#ffffff",
                        marginBottom: "2px",
                      }}
                    >
                      {chapter.title}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontFamily: "var(--font-sans)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {chapter.subtitle}
                    </p>
                  </div>

                  {/* Current indicator */}
                  {currentChapter === chapter.id && (
                    <span style={{ marginLeft: "auto", fontSize: "14px" }}>
                      ←
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
