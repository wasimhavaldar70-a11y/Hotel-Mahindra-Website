import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { amenitiesConfig } from "../../config/amenities";

/**
 * ============================================================================
 * AMENITIES PREVIEW SECTION
 * 
 * PURPOSE:
 * Displays a clean showcase of key amenities in a multi-column grid.
 * Dynamically resolves Lucide Icon names specified in the config.
 * ============================================================================
 */

export default function AmenitiesPreview() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-bg-base" aria-labelledby="amenities-heading">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header (Centered) */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-serif tracking-[0.25em] font-semibold text-primary uppercase block">
            GUEST COMFORT OVERVIEW
          </span>
          <h2 id="amenities-heading" className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-text-main">
            Key Hotel Facilities
          </h2>
          <p className="text-text-muted text-sm font-sans leading-relaxed">
            We focus heavily on providing high-quality core necessities so that your stay remains peaceful, clean, and hassle-free.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenitiesConfig.map((amenity) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (LucideIcons as any)[amenity.iconName] || HelpCircle;
            
            return (
              <div 
                key={amenity.id} 
                className="p-6 bg-bg-base border border-border-custom/50 rounded-sm hover:border-primary/40 hover:bg-bg-alt/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6">
                  <IconComponent size={20} />
                </div>
                <h3 className="font-serif text-lg font-bold text-text-main mb-2">
                  {amenity.label}
                </h3>
                <p className="text-text-muted text-xs font-sans leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Right Navigation Trigger */}
        <div className="flex justify-end pt-4">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-text-main hover:text-primary border border-border-custom hover:border-primary px-6 py-3.5 bg-bg-base transition-all duration-200 focus:outline-none shadow-sm"
            aria-label="Book a room with these amenities"
          >
            BOOK A COMFORTABLE ROOM
            <ArrowRight size={14} className="text-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}
