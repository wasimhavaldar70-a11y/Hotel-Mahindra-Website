import React from "react";
import { Star } from "lucide-react";
import { GuestReview } from "../../data/reviews";

/**
 * ============================================================================
 * GUEST TESTIMONIAL / REVIEW CARD
 * 
 * PURPOSE:
 * Displays mock or real user reviews with stars and customer segment badges.
 * 
 * DESIGN FEATURES:
 * - Double-spaced serif text blocks.
 * - Star indicators.
 * - Category badge tags (Family, Pilgrimage, Solo, Business) for context.
 * ============================================================================
 */

interface ReviewCardProps {
  review: GuestReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-bg-base border border-border-custom/60 p-6 md:p-8 flex flex-col justify-between space-y-6 hover:border-primary/50 transition-all duration-300">
      
      {/* Stars and Stay Category Segment */}
      <div className="flex items-center justify-between">
        
        {/* Render Rating Stars */}
        <div className="flex items-center gap-1" aria-label={`Rating: ${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-border-custom"}
            />
          ))}
        </div>

        {/* Staying Category Badge Tag */}
        <span className="text-[10px] font-sans tracking-wider uppercase bg-bg-alt border border-border-custom/50 px-2 py-0.5 font-bold text-primary-dark">
          {review.tag}
        </span>

      </div>

      {/* Main Review Quote */}
      <p className="font-serif text-base italic text-text-main/90 leading-relaxed flex-1">
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Guest Profiling */}
      <div className="flex items-center justify-between border-t border-border-custom/30 pt-4 text-xs font-sans text-text-muted">
        <div>
          <h4 className="font-bold text-text-main">{review.name}</h4>
          <p className="text-[10px] mt-0.5">{review.location}</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider block font-medium">Stayed</span>
          <span className="text-[9px] block text-text-muted/80">{review.stayDate}</span>
        </div>
      </div>

    </div>
  );
}
