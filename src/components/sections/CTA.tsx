import React from "react";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { hotelConfig } from "../../config/hotel";

/**
 * ============================================================================
 * CONVERSION CALL-TO-ACTION (CTA) SECTION (Dark luxury styling)
 * 
 * PURPOSE:
 * Provides a highly legible direct action point before the footer.
 * Differentiated visually by using a rich obsidian background (#1C1B19) to
 * separate page body elements cleanly from the footer layout.
 * ============================================================================
 */

export default function CTA() {
  return (
    <section className="py-20 md:py-24 px-6 md:px-12 bg-[#1C1B19] text-white border-t border-border-custom/20" aria-label="Book Stay Banner">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        <div className="space-y-3">
          <span className="text-xs font-serif tracking-[0.25em] font-semibold text-primary uppercase block">
            SECURE YOUR BOOKING DIRECTLY
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-white leading-tight">
            Ready to Check In? Contact Us Instantly
          </h2>
          <p className="text-white/80 text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            We operate a direct contact booking channel. Talk to our front desk team via Phone or WhatsApp to secure the best rates for your visit to Kolhapur.
          </p>
        </div>

        {/* CTA Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-sans text-sm pt-4">
          
          {/* Quick Call */}
          <a
            href={`tel:${hotelConfig.phoneDial}`}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-sm font-bold tracking-widest transition-all focus:outline-none shadow-sm cursor-pointer"
            aria-label={`Call us at ${hotelConfig.phoneDisplay}`}
          >
            <Phone size={14} />
            CALL
          </a>

          {/* Quick WhatsApp */}
          <a
            href={`https://wa.me/${hotelConfig.whatsappDial}?text=${encodeURIComponent(hotelConfig.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-sm font-bold tracking-widest transition-all focus:outline-none shadow-sm cursor-pointer"
            aria-label="Send a message on WhatsApp"
          >
            <MessageSquare size={14} />
            CHAT ON WHATSAPP
          </a>

          {/* Get Directions */}
          <a
            href={hotelConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-sm font-bold tracking-widest transition-all focus:outline-none shadow-sm cursor-pointer"
            aria-label="Get Google Maps navigation directions"
          >
            <MapPin size={14} />
            GET DIRECTIONS
          </a>

        </div>

        <div className="text-[10px] text-white/50 tracking-widest font-sans uppercase">
          Safe Environment • Clean Rooms • 24x7 Check-In Available
        </div>

      </div>
    </section>
  );
}
