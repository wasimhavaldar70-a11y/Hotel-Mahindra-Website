import React from "react";
import Hero from "../components/sections/Hero";
import FeaturedRooms from "../components/sections/FeaturedRooms";
import AmenitiesPreview from "../components/sections/AmenitiesPreview";
import NearbyPreview from "../components/sections/NearbyPreview";
import GuestReviews from "../components/sections/GuestReviews";
import CTA from "../components/sections/CTA";

/**
 * ============================================================================
 * HOMEPAGE (root route)
 * 
 * PURPOSE:
 * Landing entry page organizing marketing showcases, room previews,
 * amenities grids, and call-to-actions.
 * ============================================================================
 */

export default function Home() {
  return (
    <div className="relative">
      
      {/* 1. Sliding Visual Entry Header Banner */}
      <Hero />

      {/* 2. Featured Accommodation Card Grid */}
      <FeaturedRooms />

      {/* 4. Amenities Grid Icon Showcases */}
      <AmenitiesPreview />

      {/* 5. Tourist spots near Kolhapur previews */}
      <NearbyPreview />

      {/* 6. Realistic Guest Testimonials Testimonials */}
      <GuestReviews />

      {/* 7. Conversion Contact strip */}
      <CTA />

    </div>
  );
}
