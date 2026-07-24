"use client";

import React from "react";
import Link from "next/link";
import { Users, Maximize, BedDouble, ChevronRight } from "lucide-react";
import { Room } from "../../types/room";
import CustomImage from "../common/CustomImage";
import { useSectionImages } from "../../context/SectionImagesContext";
import { SectionKey } from "../../types/sectionImages";

/**
 * ============================================================================
 * ROOM PREVIEW CARD COMPONENT (Clickable Entire Card)
 * 
 * PURPOSE:
 * Displays single room details in a card grid structure.
 * Wraps the entire card container in a Next.js Link for high clickability.
 * 
 * DESIGN FEATURES:
 * - Hover elevation: translates upward slightly and raises shadow contrast.
 * - Displays quick feature badges (AC/Non-AC, TV, Wi-Fi, 1 Free Water Bottle).
 * ============================================================================
 */

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const { getSectionImages } = useSectionImages();
  // Check if section images exist for room slug (e.g. deluxe-ac-room, family-ac-suite, standard-non-ac-room)
  const dynamicRoomImages = getSectionImages(room.slug as SectionKey);
  const displayImage = dynamicRoomImages && dynamicRoomImages.length > 0 ? dynamicRoomImages[0].url : room.images[0];

  // Check if room is AC based on features array or name
  const isAcRoom = room.name.toLowerCase().includes("ac");

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group bg-bg-base border border-border-custom/60 overflow-hidden flex flex-col justify-between hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 focus:outline-none cursor-pointer"
      aria-label={`View details of ${room.name}`}
    >
      
      {/* Room Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <CustomImage
          src={displayImage}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
        />
        {/* Floating Price Tag */}
        <div className="absolute top-4 left-4 bg-bg-base/95 backdrop-blur-sm px-3.5 py-1.5 border border-border-custom/50 shadow-sm z-10">
          <span className="font-serif text-sm font-bold text-text-main">
            {room.price}
          </span>
          <span className="text-[10px] text-text-muted font-sans font-medium tracking-wide"> / Night</span>
        </div>
      </div>

      {/* Room Details Block */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide text-text-main group-hover:text-primary transition-colors duration-200">
            {room.name}
          </h3>
          <p className="text-text-muted text-xs font-sans leading-relaxed line-clamp-2">
            {room.description}
          </p>
        </div>

        {/* Dynamic Key Badges (AC, TV, Wi-Fi, 1 Free Water Bottle) */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[9px] font-sans font-bold tracking-wider bg-bg-alt text-text-muted px-2 py-0.5 uppercase border border-border-custom/30">
            {isAcRoom ? "Air Conditioned (AC)" : "Non-AC / Fan"}
          </span>
          <span className="text-[9px] font-sans font-bold tracking-wider bg-bg-alt text-text-muted px-2 py-0.5 uppercase border border-border-custom/30">
            TV Included
          </span>
          <span className="text-[9px] font-sans font-bold tracking-wider bg-bg-alt text-text-muted px-2 py-0.5 uppercase border border-border-custom/30">
            Free Wi-Fi
          </span>
          <span className="text-[9px] font-sans font-bold tracking-wider bg-primary/10 text-primary-dark px-2 py-0.5 uppercase border border-primary/20">
            1 Free Water Bottle
          </span>
        </div>

        {/* Feature Icons Strip */}
        <div className="flex items-center gap-4 text-[11px] text-text-muted font-sans border-t border-border-custom/30 pt-3">
          <div className="flex items-center gap-1">
            <Users size={12} className="text-primary/80" />
            <span>{room.maxOccupancy.split(" + ")[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={12} className="text-primary/80" />
            <span>{room.size}</span>
          </div>
          <div className="flex items-center gap-1">
            <BedDouble size={12} className="text-primary/80" />
            <span className="line-clamp-1">{room.bedType.split(" Double")[0]}</span>
          </div>
        </div>

        {/* Action Button Indicator (Visual state only, wrapped inside click container) */}
        <div className="pt-2">
          <div
            className="flex items-center justify-between w-full border border-border-custom group-hover:border-primary group-hover:bg-primary/5 px-4 py-2.5 text-xs font-sans font-bold tracking-widest text-text-main transition-all duration-200"
          >
            <span>VIEW ROOM DETAILS</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 text-primary" />
          </div>
        </div>

      </div>
    </Link>
  );
}
