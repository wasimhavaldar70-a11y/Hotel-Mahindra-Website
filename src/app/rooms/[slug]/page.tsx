import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, MessageSquare, ShieldCheck, Users, Maximize, BedDouble, ChevronRight, Clock } from "lucide-react";
import { hotelConfig } from "../../../config/hotel";
import { roomsData } from "../../../data/rooms";
import RoomGallery from "../../../components/common/RoomGallery";
import CTA from "../../../components/sections/CTA";

/**
 * ============================================================================
 * INDIVIDUAL ROOM DETAILS PAGE
 * 
 * PURPOSE:
 * Displays full profile, amenities lists, and gallery for a specific room.
 * Built dynamically using Static Site Generation (generateStaticParams).
 * ============================================================================
 */

interface RoomDetailsPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routing tags during compilation for Lighthouse performance
export async function generateStaticParams() {
  return roomsData.map((room) => ({
    slug: room.slug
  }));
}

// Generate page-specific metadata for dynamic room names
export async function generateMetadata({ params }: RoomDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = roomsData.find((r) => r.slug === slug);

  if (!room) {
    return {
      title: "Room Not Found"
    };
  }

  return {
    title: `${room.name} | Accommodation Details`,
    description: room.description
  };
}

export default async function RoomDetailsPage({ params }: RoomDetailsPageProps) {
  const { slug } = await params;
  const room = roomsData.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  return (
    <div className="bg-bg-base font-sans">
      
      {/* Editorial Breadcrumb Header */}
      <section className="bg-bg-alt border-b border-border-custom/50 py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors focus:outline-none">Home</Link>
          <ChevronRight size={12} className="text-border-custom" />
          <Link href="/rooms" className="hover:text-primary transition-colors focus:outline-none">Rooms</Link>
          <ChevronRight size={12} className="text-border-custom" />
          <span className="text-text-main font-bold">{room.name}</span>
        </div>
      </section>

      {/* Primary Columns Grid (Visual Showcase + Quick Action Booking Card) */}
      <section className="py-16 md:py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Image Gallery Swapper */}
          <div className="lg:col-span-7">
            <RoomGallery images={room.images} roomName={room.name} slug={room.slug} />
          </div>

          {/* Right Column: Key Specifications & Booking Actions */}
          <div className="lg:col-span-5 p-8 bg-bg-alt border border-border-custom/60 space-y-6">
            
            <div className="space-y-2">
              <span className="text-[10px] font-sans tracking-widest font-bold bg-primary/20 text-primary-dark border border-primary/30 px-2.5 py-0.5 uppercase">
                {room.features[0]}
              </span>
              <h1 className="font-serif text-3xl font-bold tracking-wide text-text-main pt-1">
                {room.name}
              </h1>

            </div>

            <p className="text-text-muted text-sm leading-relaxed">
              {room.description}
            </p>

            {/* Structured Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border-custom/50 text-xs text-text-muted">
              
              <div className="flex items-center gap-2">
                <Users size={16} className="text-primary shrink-0" />
                <div>
                  <span className="block font-semibold text-text-main">Occupancy</span>
                  <span className="text-[10px]">{room.maxOccupancy}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Maximize size={16} className="text-primary shrink-0" />
                <div>
                  <span className="block font-semibold text-text-main">Room Size</span>
                  <span className="text-[10px]">{room.size}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2">
                <BedDouble size={16} className="text-primary shrink-0" />
                <div>
                  <span className="block font-semibold text-text-main">Bed Arrangement</span>
                  <span className="text-[10px]">{room.bedType}</span>
                </div>
              </div>

            </div>

            {/* Direct Booking Call Actions */}
            <div className="space-y-3 pt-2">
              
              <a
                href={`tel:${hotelConfig.phoneDial}`}
                className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-sm text-xs tracking-widest font-bold shadow-sm transition-all focus:outline-none"
                aria-label={`Call room reservation at ${hotelConfig.phoneDisplay}`}
              >
                <Phone size={14} />
                CALL TO CHECK AVAILABILITY
              </a>

              <a
                href={`https://wa.me/${hotelConfig.whatsappDial}?text=${encodeURIComponent(`Hello, I am interested in booking the ${room.name}. Please let me know rates and availability.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-sm text-xs tracking-widest font-bold shadow-sm transition-all focus:outline-none"
                aria-label="Inquire via WhatsApp chat"
              >
                <MessageSquare size={14} />
                BOOK ON WHATSAPP
              </a>

            </div>

            {/* Safety Indicator */}
            <div className="flex items-center justify-center gap-2 text-center text-[10px] text-text-muted font-semibold tracking-wide uppercase pt-2">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Free on-site parking • 24x7 desk</span>
            </div>

          </div>

        </div>
      </section>

      {/* Detailed Room Profile Breakdown (Description, Amenities List, Timings) */}
      <section className="py-16 md:py-24 bg-bg-base border-t border-border-custom/50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Description Detail Block */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl font-bold tracking-wide text-text-main">
              Room Description & Comforts
            </h2>
            <p className="text-text-muted text-sm md:text-base leading-relaxed font-sans">
              {room.fullDescription}
            </p>

            {/* Inclusions checklist */}
            <div className="space-y-4 pt-4 border-t border-border-custom/30">
              <h3 className="font-serif text-lg font-bold text-text-main">Included with Every Check-In</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text-muted">
                {room.includedFacilities.map((facility, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <ShieldCheck size={14} className="text-primary shrink-0" />
                    <span>{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Amenities checklist */}
          <div className="lg:col-span-5 space-y-6 bg-bg-base border border-border-custom/60 p-8">
            <h2 className="font-serif text-xl font-bold tracking-wide text-text-main border-b border-border-custom/40 pb-4">
              Room Amenities
            </h2>
            <ul className="space-y-3 text-xs text-text-muted font-sans">
              {room.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>

            {/* Check-In Check-Out Rules banner */}
            <div className="pt-6 border-t border-border-custom/40 space-y-4">
              <h3 className="font-serif text-sm font-bold text-text-main flex items-center gap-1.5 uppercase tracking-wide">
                <Clock size={16} className="text-primary" />
                Hotel Policy Guidelines
              </h3>
              <div className="text-[11px] text-text-muted space-y-2 leading-relaxed">
                <p>• Standard Check-In Time: <strong>{hotelConfig.checkInTime}</strong></p>
                <p>• Standard Check-Out Time: <strong>{hotelConfig.checkOutTime}</strong></p>
                <p>• Valid government photo identification (Aadhaar, Passport, Driving License) is mandatory for all adult guests at checkout/in.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA section */}
      <CTA />

    </div>
  );
}
