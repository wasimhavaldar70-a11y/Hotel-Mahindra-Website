import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { roomsData } from "../../data/rooms";
import RoomCard from "../cards/RoomCard";

/**
 * ============================================================================
 * FEATURED ROOMS SECTION
 * 
 * PURPOSE:
 * Displays a subset of 3 premium rooms on the homepage.
 * Prompts navigation to the full rooms catalog page.
 * ============================================================================
 */

export default function FeaturedRooms() {
  // Grab the first 3 rooms for home page showcase
  const featuredRooms = roomsData.slice(0, 3);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-bg-alt border-y border-border-custom/50" aria-labelledby="featured-rooms-heading">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header (Centered) */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-serif tracking-[0.25em] font-semibold text-primary uppercase block">
            ACCOMMODATION SHOWCASE
          </span>
          <h2 id="featured-rooms-heading" className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-text-main">
            Featured Rooms & Suites
          </h2>
          <p className="text-text-muted text-sm font-sans leading-relaxed">
            Every room is designed with a core focus on hygiene, quietness, and home-like comfort. 
            Find the perfect configuration for your stay.
          </p>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>

        {/* Bottom Right Navigation Trigger */}
        <div className="flex justify-end pt-4">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-text-main hover:text-primary border border-border-custom hover:border-primary px-6 py-3.5 bg-bg-base transition-all duration-200 focus:outline-none shadow-sm"
            aria-label="View all hotel rooms"
          >
            VIEW ALL ROOMS
            <ArrowRight size={14} className="text-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
}
