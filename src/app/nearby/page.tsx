"use client";

import React from "react";
import { Info } from "lucide-react";
import { attractionsData } from "../../data/attractions";
import AttractionCard from "../../components/cards/AttractionCard";
import CTA from "../../components/sections/CTA";
import CustomImage from "../../components/common/CustomImage";
import { useSectionImages } from "../../context/SectionImagesContext";

/**
 * ============================================================================
 * NEARBY ATTRACTIONS PAGE
 * 
 * PURPOSE:
 * Displays local tourist sites and historical destinations in Kolhapur.
 * 
 * DESIGN FEATURES:
 * - Page header has a subtle watermark map background.
 * ============================================================================
 */

export default function NearbyPage() {
  const { images: dynamicAttractionImages } = useSectionImages("attractions");

  const attractions =
    dynamicAttractionImages && dynamicAttractionImages.length > 0
      ? dynamicAttractionImages.map((item, idx) => {
          const fallback = attractionsData[idx] || attractionsData[0];
          return {
            id: item.id,
            name: item.title || fallback.name,
            description: item.description || fallback.description,
            image: item.url,
            mapsUrl: fallback.mapsUrl,
            distanceInfo: fallback.distanceInfo,
            category: item.category
          };
        })
      : attractionsData;
  return (
    <div className="bg-bg-base">
      
      {/* Page Header with Map Watermark Background (Gold-Framed Premium Theme) */}
      <section className="relative py-8 md:py-10 bg-[#F9F6F0] border-b border-[#C5A880]/30 px-6 md:px-12 text-center overflow-hidden">
        
        {/* Stylized Travel Map Background */}
        <div className="absolute inset-0 z-0 opacity-18 pointer-events-none">
          <CustomImage
            src="/images/travel-map.jpg"
            alt="Stylized Travel Map"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-sans tracking-[0.25em] font-bold text-primary uppercase block">
            LOCAL TRAVEL GUIDE
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-wide text-text-main leading-tight">
            Kolhapur Attractions
          </h1>
          <p className="text-text-muted text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Mahendra Hotel serves as the perfect base camp for pilgrims and tourists. Explore the rich heritage sites of our city.
          </p>
        </div>
      </section>

      {/* Grid of Attractions */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        
        {/* Info Banner */}
        <div className="bg-primary/5 border border-primary/20 p-6 flex items-start gap-4 max-w-3xl mx-auto">
          <Info className="text-primary shrink-0 mt-0.5" size={18} />
          <div className="font-sans text-xs text-text-muted leading-relaxed">
            <strong className="text-text-main block mb-1">Traveler Note:</strong>
            Our front desk can help coordinate taxi services, auto-rickshaw hire, and guide itineraries to all local destinations. Transit timing from our hotel to Mahalaxmi Temple is highly convenient.
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>

      </section>

      {/* Dynamic CTA */}
      <CTA />

    </div>
  );
}
