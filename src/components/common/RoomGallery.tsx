"use client";

import React, { useState } from "react";
import CustomImage from "./CustomImage";
import { cn } from "../../lib/utils";
import { useSectionImages } from "../../context/SectionImagesContext";
import { SectionKey } from "../../types/sectionImages";

/**
 * ============================================================================
 * INTERACTIVE ROOM PHOTO GALLERY
 * 
 * PURPOSE:
 * Displays a main display frame alongside a thumbnail selection strip.
 * Decouples client-side click logic from Next.js server rendering pages.
 * ============================================================================
 */

interface RoomGalleryProps {
  images: string[];
  roomName: string;
  slug?: string;
}

export default function RoomGallery({ images, roomName, slug }: RoomGalleryProps) {
  const { getSectionImages } = useSectionImages();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const dynamicSectionImages = slug ? getSectionImages(slug as SectionKey) : [];
  const displayImages =
    dynamicSectionImages && dynamicSectionImages.length > 0
      ? dynamicSectionImages.map((img) => img.url)
      : images;

  if (!displayImages || displayImages.length === 0) return null;

  return (
    <div className="space-y-4">
      
      {/* Main Display Frame */}
      <div className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden border border-border-custom/50 shadow-sm rounded-sm">
        <CustomImage
          src={displayImages[activeImageIndex] || displayImages[0]}
          alt={`${roomName} - View ${activeImageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      {/* Thumbnail Selection Strip */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {displayImages.map((imgUrl, index) => {
            const isActive = index === activeImageIndex;
            return (
              <button
                key={imgUrl}
                onClick={() => setActiveImageIndex(index)}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden border transition-all duration-300 rounded-sm focus:outline-none",
                  isActive 
                    ? "border-primary ring-1 ring-primary/40 scale-[0.98]" 
                    : "border-border-custom/80 hover:border-primary/50"
                )}
                aria-label={`View photo ${index + 1} of ${roomName}`}
              >
                <CustomImage
                  src={imgUrl}
                  alt={`${roomName} Thumbnail ${index + 1}`}
                  fill
                  sizes="150px"
                />
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}
