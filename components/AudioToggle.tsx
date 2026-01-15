"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio.mp3");
    audio.addEventListener("canplaythrough", () => {
      setHasAudio(true);
      audioRef.current = audio;
      audio.loop = true;
      audio.volume = 0.3;
    });
    audio.addEventListener("error", () => {
      setHasAudio(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  if (!hasAudio) return null;

  return (
    <motion.button
      onClick={toggleAudio}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        backgroundColor: "#FFFEFA",
        boxShadow: "0 4px 12px rgba(26, 23, 20, 0.1)",
      }}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.svg
            key="playing"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3D3632"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.path
              d="M11 5L6 9H2v6h4l5 4V5z"
              fill="#3D3632"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <motion.path
              d="M15.54 8.46a5 5 0 010 7.07"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.path
              d="M19.07 4.93a10 10 0 010 14.14"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="muted"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8B7E74"
            strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#8B7E74" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
