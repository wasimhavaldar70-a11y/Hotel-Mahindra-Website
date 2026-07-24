"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { attractionsData } from "../../data/attractions";
import AttractionCard from "../cards/AttractionCard";
import CustomImage from "../common/CustomImage";
import { useSectionImages } from "../../context/SectionImagesContext";

/**
 * ============================================================================
 * NEARBY PREVIEW SECTION (Homepage)
 * 
 * PURPOSE:
 * Showcases popular sights near Kolhapur on the homepage.
 * Prompts user to click through to see full travel details.
 * ============================================================================
 */

export default function NearbyPreview() {
  const { images: dynamicAttractionImages } = useSectionImages("attractions");

  // Merge static attractionsData with uploaded section images
  const attractions =
    dynamicAttractionImages && dynamicAttractionImages.length > 0
      ? dynamicAttractionImages.slice(0, 3).map((item, idx) => {
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
      : attractionsData.slice(0, 3);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-bg-alt border-y border-border-custom/50" aria-labelledby="nearby-preview-heading">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header Pane with Stylized Watermark Travel Map Background (Centered Gold-Framed Layout) */}
        <div className="relative overflow-hidden border border-[#C5A880]/35 p-8 md:p-10 bg-[#F9F6F0] flex flex-col items-center text-center gap-4 shadow-[0_4px_24px_rgba(197,168,128,0.06)] rounded-sm">
          
          {/* Stylized Travel Map Background */}
          <div className="absolute inset-0 z-0 opacity-18 pointer-events-none">
            <CustomImage
              src="/images/travel-map.jpg"
              alt="Stylized Travel Map"
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="text-xs font-serif tracking-[0.25em] font-semibold text-primary uppercase block">
              EXPLORE KOLHAPUR
            </span>
            <h2 id="nearby-preview-heading" className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-text-main">
              Nearby Tourist Places
            </h2>
            <p className="text-text-muted text-sm font-sans leading-relaxed">
              Ideally located for pilgrims and sightseers. Visit legendary local temples, palaces, and forts.
            </p>
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>

        {/* Bottom Right Navigation Trigger */}
        <div className="flex justify-end pt-4">
          <Link
            href="/nearby"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-text-main hover:text-primary border border-border-custom hover:border-primary px-6 py-3.5 bg-bg-base transition-all duration-200 focus:outline-none shadow-sm"
            aria-label="View all attractions in Kolhapur"
          >
            VIEW ALL PLACES
            <ArrowRight size={14} className="text-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}
