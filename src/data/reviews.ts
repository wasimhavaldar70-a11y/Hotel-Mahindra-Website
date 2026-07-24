/**
 * ============================================================================
 * GUEST REVIEWS DATASET
 * 
 * PURPOSE:
 * Centralizes realistic placeholder guest reviews.
 * 
 * PLACEHOLDERS - REPLACE BEFORE PRODUCTION:
 * - These reviews are mock placeholders representing family, pilgrim, and business guests.
 * - Swap these with real Google Review or TripAdvisor testimonial quotes when available.
 * ============================================================================
 */

export interface GuestReview {
  id: string;
  name: string;
  location: string;
  rating: number; // Max 5
  comment: string;
  stayDate: string;
  tag: 'Family' | 'Pilgrimage' | 'Solo' | 'Business';
}

export const reviewsData: GuestReview[] = [];
