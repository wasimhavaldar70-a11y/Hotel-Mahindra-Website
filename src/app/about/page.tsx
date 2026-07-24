import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Heart, MapPin, Smile, Clock, Coffee } from "lucide-react";
import { hotelConfig } from "../../config/hotel";
import { IMAGES } from "../../data/images";
import CustomImage from "../../components/common/CustomImage";
import CTA from "../../components/sections/CTA";

/**
 * ============================================================================
 * ABOUT US PAGE
 * 
 * PURPOSE:
 * Displays a detailed profile about Mahendra Hotel history, values,
 * location comfort, and safety standards.
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "About Our Hotel",
  description: `Learn more about the history, service standards, and family-friendly focus of ${hotelConfig.name} in Kolhapur.`
};

export default function AboutPage() {
  return (
    <div className="bg-bg-base">
      
      {/* Editorial Header Banner */}
      <section className="py-8 md:py-10 bg-bg-alt border-b border-border-custom/50 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-sans tracking-[0.25em] font-bold text-primary uppercase block">
            GET TO KNOW US
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-wide text-text-main leading-tight">
            About {hotelConfig.name}
          </h1>
          <p className="text-text-muted text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            A safe, exceptionally clean, and secure transit hub hotel serving pilgrims, tourists, and business travelers in Kolhapur.
          </p>
        </div>
      </section>

      {/* Narrative Section (Split Columns) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-main">
              A Legacy of Hospitality and Security
            </h2>
            <p className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
              Conveniently situated on the NH4 Highway near Vathar Tarf Vadgaon, Kolhapur, 
              <strong> {hotelConfig.name}</strong> was founded to offer high-quality, safe, and clean accommodations 
              for families, solo pilgrims, and business visitors who want comfortable lodging without paying 
              inflated luxury prices.
            </p>
            <p className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
              We understand that visiting a historic city can be exhausting. That is why we focus strictly 
              on the details that matter most: highly comfortable beds, pristine hygiene, 24/7 geyser hot water, 
              high-speed Wi-Fi, round-the-clock reception support, and secure guarded parking.
            </p>
            <p className="text-text-muted font-sans text-sm md:text-base leading-relaxed">
              Our location along the highway allows travelers to check in instantly at any hour of the night, 
              rest in absolute quietness, and reach holy spots like the Ambabai 
              Mahalaxmi Temple in just a few minutes.
            </p>
          </div>

          {/* Large Editorial Image */}
          <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden shadow-md">
            <CustomImage
              src={IMAGES.hero.mainSlide2}
              alt="Hotel lobby reception desk area"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>

        </div>
      </section>

      {/* Core Values Pillars */}
      <section className="py-24 bg-bg-alt border-y border-border-custom/50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-sans tracking-[0.25em] font-bold text-primary uppercase block">
              SERVICE VALUES
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-text-main">
              Our Core Principles
            </h2>
            <p className="text-text-muted text-sm font-sans leading-relaxed">
              At Mahendra Hotel, we hold ourselves accountable to standards that guarantee comfort and trust for every guest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="p-8 bg-bg-base border border-border-custom/50 space-y-4">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-main">Absolute Safety First</h3>
              <p className="text-text-muted text-xs font-sans leading-relaxed">
                Continuous CCTV monitoring in all corridors, lobbies, and parking zones, coupled with dual-locking doors and on-premises guards, ensures peace of mind for families and solo female travelers.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 bg-bg-base border border-border-custom/50 space-y-4">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                <Heart size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-main">Uncompromised Cleanliness</h3>
              <p className="text-text-muted text-xs font-sans leading-relaxed">
                We operate a strict daily housekeeping routine using medical-grade sanitation. Bedsheets, duvets, towels, and toilets are thoroughly washed and replaced before every single check-in.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 bg-bg-base border border-border-custom/50 space-y-4">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary">
                <Smile size={20} />
              </div>
              <h3 className="font-serif text-lg font-bold text-text-main">Warm, Honest Service</h3>
              <p className="text-text-muted text-xs font-sans leading-relaxed">
                Our front desk is staffed with friendly, local experts who can assist with transportation, suggest temple routes, guide parking maneuvers, and help resolve any query instantly.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Fact sheet / Fast stats */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="space-y-2">
          <Clock size={24} className="text-primary mx-auto" />
          <h4 className="font-serif text-2xl font-bold text-text-main">24x7</h4>
          <p className="text-text-muted text-xs font-sans tracking-wide uppercase">Front Desk Support</p>
        </div>
        <div className="space-y-2">
          <ShieldCheck size={24} className="text-primary mx-auto" />
          <h4 className="font-serif text-2xl font-bold text-text-main">100%</h4>
          <p className="text-text-muted text-xs font-sans tracking-wide uppercase">Secure environment</p>
        </div>
        <div className="space-y-2">
          <MapPin size={24} className="text-primary mx-auto" />
          <h4 className="font-serif text-2xl font-bold text-text-main">NH4</h4>
          <p className="text-text-muted text-xs font-sans tracking-wide uppercase">Highway Location</p>
        </div>
        <div className="space-y-2">
          <Coffee size={24} className="text-primary mx-auto" />
          <h4 className="font-serif text-2xl font-bold text-text-main">Fresh</h4>
          <p className="text-text-muted text-xs font-sans tracking-wide uppercase">Tea & Beverages Service</p>
        </div>
      </section>

      {/* CTA Segment */}
      <CTA />

    </div>
  );
}
