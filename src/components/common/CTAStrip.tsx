"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { hotelConfig } from "../../config/hotel";

/**
 * ============================================================================
 * MOBILE STICKY CONTACT STRIP (CTAStrip)
 * 
 * PURPOSE:
 * Sticks to the bottom of the viewport on mobile devices (hidden on desktop).
 * Acts as the primary lead conversion helper instead of a booking engine.
 * 
 * DESIGN FEATURES:
 * - Floating glassmorphic design with subtle border shadows.
 * - Perfectly sizes touch areas for easy accessibility.
 * - Flexbox distribution.
 * ============================================================================
 */

export default function CTAStrip() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-bg-base/95 border-t border-border-custom/80 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] md:hidden py-3 px-4">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        
        {/* Direct Call Button */}
        <a
          href={`tel:${hotelConfig.phoneDial}`}
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 px-2 rounded-sm text-xs font-sans tracking-widest font-bold shadow-sm transition-all focus:outline-none"
          aria-label="Call Hotel Reception"
        >
          <Phone size={14} />
          CALL NOW
        </a>

        {/* Direct WhatsApp Button */}
        <a
          href={`https://wa.me/${hotelConfig.whatsappDial}?text=${encodeURIComponent(hotelConfig.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-2 rounded-sm text-xs font-sans tracking-widest font-bold shadow-sm transition-all focus:outline-none"
          aria-label="Chat with Hotel on WhatsApp"
        >
          <MessageSquare size={14} />
          WHATSAPP
        </a>

        {/* Directions Button */}
        <a
          href={hotelConfig.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-text-main hover:bg-black text-white py-3 px-2 rounded-sm text-xs font-sans tracking-widest font-bold shadow-sm transition-all focus:outline-none"
          aria-label="Get Google Maps Directions"
        >
          <MapPin size={14} />
          MAPS
        </a>

      </div>
    </div>
  );
}
