import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Info } from "lucide-react";
import { hotelConfig } from "../../config/hotel";
import { roomsData } from "../../data/rooms";
import RoomCard from "../../components/cards/RoomCard";
import CTA from "../../components/sections/CTA";

/**
 * ============================================================================
 * ROOMS LISTING PAGE
 * 
 * PURPOSE:
 * Displays all rooms in a responsive column layout.
 * 
 * CHANGE / MODIFY ROOM CARDS:
 * Edit records inside data/rooms.ts. This page builds rooms cards dynamically.
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description: `Explore the range of clean, secure, and affordable rooms at ${hotelConfig.name} Kolhapur. View details for Deluxe AC, Family AC, and Standard Non-AC rooms.`
};

export default function RoomsPage() {
  return (
    <div className="bg-bg-base">
      
      {/* Page Header */}
      <section className="py-8 md:py-10 bg-bg-alt border-b border-border-custom/50 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-sans tracking-[0.25em] font-bold text-primary uppercase block">
            ACCOMMODATION OPTIONS
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-wide text-text-main leading-tight">
            Our Rooms & Suites
          </h1>
          <p className="text-text-muted text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Cleanliness, comfort, and security at standard honest pricing. Explore our standard configurations below.
          </p>
        </div>
      </section>

      {/* Guidelines Banner (Safety, Check-in rules) */}
      <section className="bg-primary/5 py-4 px-6 border-b border-border-custom/30 text-center text-xs font-sans text-text-muted">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 font-semibold">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-primary-dark" />
            <span>Safe & Clean Environment</span>
          </div>
          <div className="hidden sm:block text-border-custom">|</div>
          <div className="flex items-center gap-1.5">
            <Info size={14} className="text-primary-dark" />
            <span>Standard Check-In: {hotelConfig.checkInTime} • Check-Out: {hotelConfig.checkOutTime}</span>
          </div>
        </div>
      </section>

      {/* Rooms Showcase Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {roomsData.map((room) => (
            <RoomCard key={room.slug} room={room} />
          ))}
        </div>
      </section>

      {/* Dynamic CTA */}
      <CTA />

    </div>
  );
}
