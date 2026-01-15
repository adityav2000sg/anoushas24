"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { galleryPhotos } from "@/data/content";

interface GalleryProps {
  onNext: () => void;
}

export default function Gallery({ onNext }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (id: number) => {
    setImageErrors(prev => new Set(prev).add(id));
  };

  const selectedPhoto = selectedIndex !== null ? galleryPhotos[selectedIndex] : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "60px 16px 100px",
        background: "linear-gradient(180deg, #A8E6CF 0%, #88D8B0 50%, #56C596 100%)",
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
          <span style={{ fontSize: "32px" }}>📸</span>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.6)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Chapter One
          </p>
          <span style={{ fontSize: "32px" }}>📸</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: "clamp(32px, 8vw, 52px)",
            fontFamily: "var(--font-serif)",
            color: "#2D3436",
            marginBottom: "12px",
          }}
        >
          Our Moments 💕
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: "16px",
            fontFamily: "var(--font-serif)",
            color: "rgba(0,0,0,0.7)",
            fontStyle: "italic",
          }}
        >
          Tap a photo to see it bigger
        </motion.p>
      </div>

      {/* Photo Grid */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "16px",
        }}
      >
        {galleryPhotos.map((photo, index) => (
          <motion.button
            key={photo.id}
            onClick={() => setSelectedIndex(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "#ffffff",
              padding: "8px",
              paddingBottom: "40px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              transform: `rotate(${(index % 2 === 0 ? -2 : 2)}deg)`,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                background: "#E0E0E0",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              {!imageErrors.has(photo.id) ? (
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  style={{ objectFit: "cover" }}
                  onError={() => handleImageError(photo.id)}
                  sizes="200px"
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                  }}
                >
                  📷
                </div>
              )}
            </div>
            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                fontFamily: "var(--font-serif)",
                color: "#2D3436",
              }}
            >
              {photo.title}
            </p>
          </motion.button>
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
            color: "#ffffff",
            background: "#2D3436",
            border: "none",
            borderRadius: "100px",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          }}
        >
          Continue to Chapter 2 →
        </motion.button>
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
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
                background: "rgba(0,0,0,0.9)",
              }}
            />

            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 10,
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                color: "#ffffff",
                fontSize: "20px",
              }}
            >
              ✕
            </button>

            {/* Photo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: "relative",
                zIndex: 5,
                maxWidth: "90vw",
                maxHeight: "80vh",
                background: "#ffffff",
                padding: "12px",
                paddingBottom: "60px",
                borderRadius: "8px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "min(500px, 80vw)",
                  aspectRatio: "4/3",
                  background: "#E0E0E0",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {!imageErrors.has(selectedPhoto.id) ? (
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="500px"
                    priority
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                    }}
                  >
                    📷
                  </div>
                )}
              </div>
              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <p
                  style={{
                    fontSize: "20px",
                    fontFamily: "var(--font-serif)",
                    color: "#2D3436",
                    marginBottom: "4px",
                  }}
                >
                  {selectedPhoto.title}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontFamily: "var(--font-serif)",
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>

            {/* Navigation arrows */}
            {selectedIndex !== null && selectedIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(selectedIndex - 1);
                }}
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  cursor: "pointer",
                  color: "#ffffff",
                  fontSize: "24px",
                }}
              >
                ←
              </button>
            )}
            {selectedIndex !== null && selectedIndex < galleryPhotos.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(selectedIndex + 1);
                }}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  cursor: "pointer",
                  color: "#ffffff",
                  fontSize: "24px",
                }}
              >
                →
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
