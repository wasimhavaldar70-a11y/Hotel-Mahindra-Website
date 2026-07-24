"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, Sparkles, Smile } from "lucide-react";
import { hotelConfig } from "../../config/hotel";
import { IMAGES } from "../../data/images";
import CustomImage from "../common/CustomImage";
import { useSectionImages } from "../../context/SectionImagesContext";

/**
 * ============================================================================
 * ABOUT SECTION (Homepage)
 * 
 * PURPOSE:
 * Details our brand story, location benefits, and family values.
 * Uses an asymmetrical two-column layout for a premium editorial style.
 * ============================================================================
 */

export default function AboutSection() {
  const { images } = useSectionImages("about");

  const img1 = images[0]?.url || IMAGES.about.lobbyView;
  const alt1 = images[0]?.title || "Mahendra Hotel Lobby Seating Area";

  const img2 = images[1]?.url || IMAGES.about.serviceSmile;
  const alt2 = images[1]?.title || "Welcoming Staff at Reception Desk";

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-bg-base" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Editorial Image Composition */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
          
          {/* Main Large Image */}
          <div className="col-span-8 aspect-[4/5] relative overflow-hidden shadow-md">
            <CustomImage
              src={img1}
              alt={alt1}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

          {/* Secondary Overlapping Image */}
          <div className="col-span-4 aspect-[3/4] relative overflow-hidden shadow-lg self-end -ml-8 mb-8 border-[6px] border-bg-base z-10 hidden sm:block">
            <CustomImage
              src={img2}
              alt={alt2}
              fill
              sizes="200px"
            />
          </div>

          {/* Abstract Gold Background Block Accent */}
          <div 
            className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 -z-10" 
            aria-hidden="true"
          />

        </div>

        {/* Right Side: Narrative & Value Propositions */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="space-y-3">
            <span className="text-xs font-sans tracking-[0.25em] font-bold text-primary uppercase block">
              OUR HERITAGE & MISSION
            </span>
            <h2 id="about-heading" className="font-serif text-3xl md:text-4xl font-bold tracking-wide leading-tight text-text-main">
              Your Trustworthy Gateway to Kolhapur
            </h2>
          </div>

          <p className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
            Welcome to <strong>{hotelConfig.name}</strong>, a premium budget hotel strategically 
            situated directly opposite the Central Bus Stand in Kolhapur. We focus heavily on providing 
            uncompromised cleanliness, modern comfort, and absolute guest security.
          </p>

          <p className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
            Whether you are a pilgrim seeking the blessings of Shri Ambabai Mahalaxmi, a tourist exploring the historical heights of Panhala Fort, or a business traveler on transit, we provide a peaceful and secure refuge with outstanding hospitality.
          </p>

          {/* Key Value Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border-custom/50">
            
            <div className="flex gap-3">
              <ShieldCheck size={20} className="text-primary shrink-0" />
              <div>
                <h4 className="font-sans text-sm font-bold text-text-main">Clean & Secure Stay</h4>
                <p className="text-text-muted text-xs font-sans mt-0.5 leading-relaxed">Continuous CCTV, secure locks, and clean protocols.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin size={20} className="text-primary shrink-0" />
              <div>
                <h4 className="font-sans text-sm font-bold text-text-main">Transit Friendly Location</h4>
                <p className="text-text-muted text-xs font-sans mt-0.5 leading-relaxed">Directly opposite Kolhapur Bus Stand and close to Rail Station.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Smile size={20} className="text-primary shrink-0" />
              <div>
                <h4 className="font-sans text-sm font-bold text-text-main">Friendly Environment</h4>
                <p className="text-text-muted text-xs font-sans mt-0.5 leading-relaxed">Comfortable beds and peaceful environment for all check-ins.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Sparkles size={20} className="text-primary shrink-0" />
              <div>
                <h4 className="font-sans text-sm font-bold text-text-main">Honest Pricing</h4>
                <p className="text-text-muted text-xs font-sans mt-0.5 leading-relaxed">Zero hidden charges. Pure value-driven comfort.</p>
              </div>
            </div>

          </div>

          {/* Navigation Trigger Button */}
          <div className="pt-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-text-main hover:text-primary border-b border-text-main hover:border-primary pb-1 transition-all"
              aria-label="Read our full hotel story"
            >
              LEARN MORE ABOUT US
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
