"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { IMAGES } from "../../data/images";
import CustomImage from "../common/CustomImage";
import { useSectionImages } from "../../context/SectionImagesContext";

/**
 * ============================================================================
 * HERO LANDING SECTION (3s Cycle Visual Carousel)
 * 
 * PURPOSE:
 * Serves as the landing hero section of the website. Uses a 3-second cycle
 * background crossfade slideshow (Lobby, Rooms, Parking, Facade) with manual
 * selector dots at the bottom, while keeping the typography static.
 * 
 * MAINTENANCE INSTRUCTIONS:
 * - Slideshow speed is configured to 3 seconds (3000ms).
 * - Transition fade speed is set to 1.0 second for a snappy yet smooth transition.
 * ============================================================================
 */

const defaultHeroSlides = [
  {
    image: IMAGES.hero.mainSlide1, // Hotel Facade
    alt: "Mahendra Hotel Entrance Facade"
  },
  {
    image: IMAGES.hero.mainSlide2, // Welcoming Lobby Reception check-in counter
    alt: "Mahendra Hotel Reception Desk check-in counter"
  },
  {
    image: IMAGES.hero.mainSlide3, // Deluxe Guest Room Bed
    alt: "Mahendra Hotel Executive Suite Double Bed Layout"
  },
  {
    image: IMAGES.gallery[8], // Secured Parking Facility (open space with cars)
    alt: "Dedicated Secured Guarded Parking Area on Premises with Parked Vehicles"
  }
];

export default function Hero() {
  const { images: dynamicHeroImages } = useSectionImages("hero");
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides =
    dynamicHeroImages && dynamicHeroImages.length > 0
      ? dynamicHeroImages.map((item) => ({
          image: item.url,
          alt: item.title || "Mahendra Hotel Kolhapur"
        }))
      : defaultHeroSlides;

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section 
      className="relative h-[85vh] min-h-[550px] w-full flex items-center justify-center overflow-hidden bg-[#151413]" 
      aria-label="Welcome Banner"
    >
      
      {/* Background Slideshow (Seamless 1s-crossfade layers) */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <motion.div
              key={`${slide.image}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 0.75 : 0, scale: isActive ? 1.02 : 1 }}
              transition={{ duration: 1.0, ease: "easeInOut" }} // Fast-smooth 1s transition for 3s cycle
              className="absolute inset-0"
            >
              <CustomImage
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                containerClassName="bg-transparent"
              />
            </motion.div>
          );
        })}
        
        {/* Soft elegant vignette overlay for contrast (no heavy black masks) */}
        <div className="absolute inset-0 bg-black/35 z-10" />
      </div>

      {/* Visual Navigation Dots / Indicators (Allows manual image swapping) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
              index === currentSlide ? "w-8 bg-primary" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Switch to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content Text Container (Static copy overlay) */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white flex flex-col items-center justify-center h-full pt-12">
        
        {/* Small Safety Trust Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-1.5 bg-primary/30 backdrop-blur-sm border border-primary/40 px-4 py-1.5 rounded-full text-xs font-serif font-semibold tracking-widest text-white mb-6 shadow-sm"
        >
          <ShieldCheck size={14} className="text-white" />
          <span>CLEAN & SECURE ENVIRONMENT</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs md:text-sm font-serif tracking-[0.3em] font-semibold text-primary uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          WELCOME TO MAHENDRA HOTEL
        </motion.p>

        {/* Headline (No height constraints, allowing natural line wrapping and no cropping) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight md:leading-normal mb-8 max-w-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
        >
          Experience Comfort Living in Kolhapur
        </motion.h1>

        {/* Descriptive Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl text-white/95 font-sans text-sm md:text-base leading-relaxed mb-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
        >
          Discover clean, secure, and modern accommodation right in the heart of Kolhapur. 
          Perfect for pilgrims, tourists, business transit, families, couples, and students.
        </motion.p>

      </div>
    </section>
  );
}
