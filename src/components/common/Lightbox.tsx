"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomImage from "./CustomImage";

/**
 * ============================================================================
 * FULLSCREEN GALLERY LIGHTBOX
 * 
 * PURPOSE:
 * Provides a high-performance modal viewport for image exploration.
 * Supports keyboard controls, navigation buttons, and scroll prevention.
 * ============================================================================
 */

interface LightboxProps {
  images: { url: string; title: string }[];
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  selectedIndex,
  isOpen,
  onClose,
  onNavigate
}: LightboxProps) {
  
  // Close and navigate controls via keyboard listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((selectedIndex + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((selectedIndex - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock background scroll when open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, selectedIndex, images.length, onClose, onNavigate]);

  const activeImage = images[selectedIndex];

  return (
    <AnimatePresence>
      {isOpen && activeImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-sm p-4 md:p-8"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between text-white/80 font-sans text-sm z-10">
            <span className="font-medium tracking-wide">
              {selectedIndex + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-colors focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Core Image Display & Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center py-6">
            
            {/* Left Navigate Button */}
            <button
              onClick={() => onNavigate((selectedIndex - 1 + images.length) % images.length)}
              className="absolute left-2 md:left-6 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all focus:outline-none"
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Slide Container */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-5xl w-full h-[65vh] md:h-[75vh]"
            >
              <CustomImage
                src={activeImage.url}
                alt={activeImage.title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-contain"
                containerClassName="bg-transparent"
                priority
              />
            </motion.div>

            {/* Right Navigate Button */}
            <button
              onClick={() => onNavigate((selectedIndex + 1) % images.length)}
              className="absolute right-2 md:right-6 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all focus:outline-none"
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>

          </div>

          {/* Footer Metadata */}
          <div className="text-center text-white/90 max-w-2xl mx-auto z-10 pb-4">
            <p className="font-serif text-base md:text-lg italic font-medium tracking-wide">
              {activeImage.title}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-white/50 text-[10px] uppercase tracking-widest font-sans mt-2">
              <ZoomIn size={12} />
              <span>Keyboard arrows to navigate • ESC to exit</span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
