import React from "react";
import { Metadata } from "next";
import { Phone, MessageSquare, MapPin, Clock, Mail, Navigation, ShieldCheck } from "lucide-react";
import { hotelConfig } from "../../config/hotel";

/**
 * ============================================================================
 * CONTACT PAGE
 * 
 * PURPOSE:
 * Displays phone dial links, WhatsApp chat triggers, map direct navigators,
 * check-in guidelines, and working hours.
 * 
 * COMPLIANCE WATCH:
 * Contains NO contact form input fields to strictly align with master specifications.
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "Contact Reception Desk",
  description: `Contact ${hotelConfig.name} Kolhapur directly. Get phone numbers, WhatsApp links, Google Maps directions, and front desk office timings.`
};

export default function ContactPage() {
  return (
    <div className="bg-bg-base font-sans min-h-[80vh] flex flex-col justify-between">
      
      <div>
        {/* Editorial Page Header */}
        <section className="py-8 md:py-10 bg-bg-alt border-b border-border-custom/50 px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-sans tracking-[0.25em] font-bold text-primary uppercase block">
              DIRECT REACH
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-wide text-text-main leading-tight">
              Contact Us
            </h1>
            <p className="text-text-muted text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
              We operate a direct check-in booking channel. Connect with our Kolhapur front desk reception instantly.
            </p>
          </div>
        </section>

        {/* Channels Information & Maps directions locator details */}
        <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Left Box: Channels Details */}
            <div className="md:col-span-6 space-y-8">
              
              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-text-main">
                  Get In Touch
                </h2>
                <p className="text-text-muted text-xs leading-relaxed max-w-sm">
                  Click any of the channels below to dial directly or navigate.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Channel 1: Phone */}
                <div className="flex gap-4 p-5 bg-bg-alt border border-border-custom/50 rounded-sm">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] tracking-wider uppercase font-bold text-text-muted">Dial Reception desk</span>
                    <a 
                      href={`tel:${hotelConfig.phoneDial}`} 
                      className="block text-base font-bold text-text-main hover:text-primary transition-colors focus:outline-none"
                    >
                      {hotelConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Channel 2: WhatsApp */}
                <div className="flex gap-4 p-5 bg-bg-alt border border-border-custom/50 rounded-sm">
                  <div className="w-10 h-10 rounded-sm bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] tracking-wider uppercase font-bold text-text-muted">Chat on WhatsApp</span>
                    <a 
                      href={`https://wa.me/${hotelConfig.whatsappDial}?text=${encodeURIComponent(hotelConfig.whatsappMessage)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-base font-bold text-text-main hover:text-primary transition-colors focus:outline-none"
                    >
                      {hotelConfig.whatsappDisplay}
                    </a>
                  </div>
                </div>

                {/* Channel 3: Email */}
                <div className="flex gap-4 p-5 bg-bg-alt border border-border-custom/50 rounded-sm">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] tracking-wider uppercase font-bold text-text-muted">Email Inquiries</span>
                    <a 
                      href={`mailto:${hotelConfig.email}`} 
                      className="block text-sm font-semibold text-text-main hover:text-primary transition-colors focus:outline-none"
                    >
                      {hotelConfig.email}
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Box: Location guidelines */}
            <div className="md:col-span-6 bg-bg-alt border border-border-custom/60 p-8 space-y-6">
              
              <h2 className="font-serif text-xl font-bold tracking-wide text-text-main">
                Location Details
              </h2>

              <div className="space-y-4 font-sans text-sm text-text-muted">
                
                {/* Physical Address */}
                <div className="flex gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-text-main text-xs uppercase tracking-wider">Hotel Address</span>
                    <p className="text-xs leading-relaxed mt-1">{hotelConfig.address}</p>
                  </div>
                </div>

                {/* Office Timings */}
                <div className="flex gap-3 pt-3 border-t border-border-custom/40">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-text-main text-xs uppercase tracking-wider">Reception Hours</span>
                    <p className="text-xs leading-relaxed mt-1">{hotelConfig.workingHours}</p>
                  </div>
                </div>

                {/* Check In / Out guidelines */}
                <div className="flex gap-3 pt-3 border-t border-border-custom/40">
                  <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-text-main text-xs uppercase tracking-wider">Hotel Policies</span>
                    <p className="text-xs leading-relaxed mt-1">Check-in: {hotelConfig.checkInTime} | Check-out: {hotelConfig.checkOutTime}</p>
                  </div>
                </div>

              </div>

              {/* Get Directions Maps Launcher */}
              <div className="pt-4">
                <a
                  href={hotelConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-text-main hover:bg-black text-white py-3.5 rounded-sm text-xs font-sans font-bold tracking-widest transition-all focus:outline-none"
                  aria-label="Get Google Maps navigation directions"
                >
                  <Navigation size={14} />
                  GET DIRECTIONS ON GOOGLE MAPS
                </a>
              </div>

            </div>

          </div>
        </section>
      </div>

    </div>
  );
}
