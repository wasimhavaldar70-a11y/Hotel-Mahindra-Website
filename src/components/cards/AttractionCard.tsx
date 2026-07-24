"use client";

import React from "react";
import { Navigation } from "lucide-react";
import { Attraction } from "../../types/attraction";
import CustomImage from "../common/CustomImage";

/**
 * ============================================================================
 * TOURIST ATTRACTION CARD COMPONENT (Clickable Entire Card)
 * 
 * PURPOSE:
 * Renders local sights near Kolhapur with inline map route launchers.
 * Wraps the entire card in an anchor link for immediate navigation on click.
 * 
 * DESIGN FEATURES:
 * - Hover elevation: translates upward slightly and raises shadow contrast.
 * - Dynamic color transitions.
 * ============================================================================
 */

interface AttractionCardProps {
  attraction: Attraction;
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  return (
    <a
      href={attraction.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-bg-base border border-border-custom/60 overflow-hidden flex flex-col justify-between hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 focus:outline-none cursor-pointer"
      aria-label={`Get directions to ${attraction.name} on Google Maps`}
    >
      
      {/* Attraction Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <CustomImage
          src={attraction.image}
          alt={attraction.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
          containerClassName="transition-transform duration-500 group-hover:scale-105"
        />
        {attraction.distanceInfo && (
          <div className="absolute bottom-4 left-4 bg-bg-base/95 backdrop-blur-sm px-3 py-1 text-[10px] font-sans tracking-widest uppercase font-semibold text-primary-dark border border-border-custom/50 shadow-sm z-10">
            {attraction.distanceInfo}
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold tracking-wide text-text-main group-hover:text-primary transition-colors duration-200">
            {attraction.name}
          </h3>
          <p className="text-text-muted text-xs font-sans leading-relaxed line-clamp-3">
            {attraction.description}
          </p>
        </div>

        {/* Maps Routing Direct Action Indicator (Visual state) */}
        <div className="pt-2 border-t border-border-custom/30">
          <div
            className="flex items-center justify-center gap-2 w-full border border-primary group-hover:bg-primary group-hover:text-white px-4 py-2.5 text-xs font-sans font-bold tracking-widest text-primary transition-all duration-200"
          >
            <Navigation size={12} className="shrink-0" />
            GET DIRECTIONS
          </div>
        </div>

      </div>
    </a>
  );
}
