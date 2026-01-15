"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import Cover from "@/components/Cover";
import Gallery from "@/components/Gallery";
import Wishes24 from "@/components/Wishes24";
import PositivityJar from "@/components/PositivityJar";
import LetterFinale from "@/components/LetterFinale";
import ChapterMap from "@/components/ChapterMap";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [chapterMapOpen, setChapterMapOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Setup audio for background music
    audioRef.current = new Audio("/audio.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setAudioPlaying(true);
    }
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Try to keep music playing from intro
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setAudioPlaying(true);
    }
  };

  const handleBegin = () => {
    setCurrentChapter(1);
  };

  const navigateToChapter = (chapter: number) => {
    setCurrentChapter(chapter);
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* Intro */}
      <AnimatePresence>
        {showIntro && <EnvelopeIntro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main content */}
      {!showIntro && (
        <>
          {/* Chapter navigation button */}
          <button
            onClick={() => setChapterMapOpen(true)}
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              zIndex: 100,
              padding: "10px 16px",
              fontSize: "12px",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#ffffff",
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "100px",
              cursor: "pointer",
            }}
          >
            Chapters
          </button>

          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "20px",
              zIndex: 100,
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
            title={audioPlaying ? "Pause music" : "Play music"}
          >
            {audioPlaying ? "🔊" : "🔇"}
          </button>

          {/* Chapter Map */}
          <ChapterMap
            isOpen={chapterMapOpen}
            onClose={() => setChapterMapOpen(false)}
            currentChapter={currentChapter}
            onNavigate={navigateToChapter}
          />

          {/* Chapters */}
          <AnimatePresence mode="wait">
            {currentChapter === 0 && (
              <Cover key="cover" onBegin={handleBegin} />
            )}
            {currentChapter === 1 && (
              <Gallery key="gallery" onNext={() => setCurrentChapter(2)} />
            )}
            {currentChapter === 2 && (
              <Wishes24 key="wishes" onNext={() => setCurrentChapter(3)} />
            )}
            {currentChapter === 3 && (
              <PositivityJar key="jar" onNext={() => setCurrentChapter(4)} />
            )}
            {currentChapter === 4 && (
              <LetterFinale key="letter" />
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  );
}
