"use client";

import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { galleryData } from "../../data/gallery";
import CustomImage from "../../components/common/CustomImage";
import Lightbox from "../../components/common/Lightbox";
import { cn } from "../../lib/utils";
import CTA from "../../components/sections/CTA";
import { useSectionImages } from "../../context/SectionImagesContext";

/**
 * ============================================================================
 * GALLERY PAGE
 * 
 * PURPOSE:
 * Displays visual representations of the hotel facade, lobby, rooms, and facilities.
 * Employs category filtering, a masonry grid, and launches the lightbox.
 * ============================================================================
 */

type CategoryFilter = 'all' | 'rooms' | 'exterior' | 'lobby' | 'general';

export default function GalleryPage() {
  const { images: dynamicGalleryImages } = useSectionImages("gallery");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const galleryItems =
    dynamicGalleryImages && dynamicGalleryImages.length > 0
      ? dynamicGalleryImages.map((img) => ({
          id: img.id,
          url: img.url,
          title: img.title,
          category: (img.category || "rooms") as CategoryFilter
        }))
      : galleryData;

  // Filter gallery items dynamically based on the active selection category
  const filteredItems = galleryItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const handleImageClick = (imageUrl: string) => {
    // Find the index inside the *filtered* image array so that navigation inside the lightbox
    // only cycles through active filtered set
    const index = filteredItems.findIndex((item) => item.url === imageUrl);
    if (index !== -1) {
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    }
  };

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Photos' },
    { key: 'rooms', label: 'Rooms & Suites' },
    { key: 'exterior', label: 'Exterior' },
    { key: 'lobby', label: 'Reception & Lobby' },
    { key: 'general', label: 'Amenities & Parking' }
  ];

  return (
    <div className="bg-bg-base min-h-screen flex flex-col">
      
      {/* Editorial Page Header */}
      <section className="py-8 md:py-10 bg-bg-alt border-b border-border-custom/50 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-sans tracking-[0.25em] font-bold text-primary uppercase block">
            VISUAL PORTFOLIO
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-wide text-text-main leading-tight">
            Photo Gallery
          </h1>
          <p className="text-text-muted text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Tour the premises of Mahendra Hotel. Take a virtual look at our clean rooms, safe lobbies, and secure parking zone.
          </p>
        </div>
      </section>

      {/* Category Selection Filter Bar */}
      <section className="py-8 border-b border-border-custom/30 px-6 overflow-x-auto select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-3 md:space-x-4 min-w-max font-sans text-xs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={cn(
                "px-5 py-2.5 rounded-sm border font-semibold tracking-wider transition-all duration-200 focus:outline-none cursor-pointer",
                activeFilter === cat.key
                  ? "bg-primary border-primary text-white shadow-sm"
                  : "bg-bg-base border-border-custom/80 text-text-muted hover:border-primary/50 hover:text-text-main"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Responsive Masonry Card List Grid */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto flex-grow w-full">
        {filteredItems.length > 0 ? (
          <div className="masonry-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleImageClick(item.url)}
                className="masonry-item relative aspect-[4/3] w-full overflow-hidden border border-border-custom/50 shadow-sm rounded-sm group cursor-pointer hover:border-primary/50 transition-all duration-300"
              >
                <CustomImage
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Visual hover caption screen */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
                  <div className="text-white space-y-1">
                    <span className="text-[9px] font-sans tracking-widest uppercase font-bold text-primary">
                      {item.category}
                    </span>
                    <p className="font-serif text-sm italic font-medium leading-tight">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 font-sans space-y-4">
            <ImageIcon size={48} className="text-border-custom mx-auto" />
            <p className="text-text-muted text-sm font-semibold">No images available for this filter category.</p>
          </div>
        )}
      </section>

      {/* Custom Lightbox integration */}
      <Lightbox
        images={filteredItems.map((item) => ({ url: item.url, title: item.title }))}
        selectedIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(index) => setLightboxIndex(index)}
      />

      {/* Dynamic CTA */}
      <CTA />

    </div>
  );
}
