import React from "react";
import { reviewsData } from "../../data/reviews";
import ReviewCard from "../cards/ReviewCard";

/**
 * ============================================================================
 * GUEST REVIEWS SECTION
 * 
 * PURPOSE:
 * Displays testimonials from families, pilgrims, and business visitors.
 * 
 * DESIGN FEATURES:
 * - Simple responsive 2-column list.
 * - Bold headings.
 * ============================================================================
 */

export default function GuestReviews() {
  if (!reviewsData || reviewsData.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-bg-base" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-serif tracking-[0.25em] font-semibold text-primary uppercase block">
            GENUINE TESTIMONIALS
          </span>
          <h2 id="reviews-heading" className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-text-main">
            What Our Guests Say
          </h2>
          <p className="text-text-muted text-sm font-sans leading-relaxed">
            Read comments from tourists, pilgrims, and business transit travelers who have checked into Mahendra Hotel.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviewsData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
