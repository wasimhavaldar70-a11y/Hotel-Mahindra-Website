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

export const reviewsData: GuestReview[] = [
  {
    id: "rev-1",
    name: "Rajesh Kulkarni",
    location: "Pune, Maharashtra",
    rating: 5,
    comment: "Extremely clean rooms and excellent security. Located right opposite the Central Bus Stand, which made traveling with my family and senior citizen parents very convenient. Highly recommended for family stays.",
    stayDate: "May 2026",
    tag: "Family"
  },
  {
    id: "rev-2",
    name: "Anjali Deshmukh",
    location: "Mumbai, Maharashtra",
    rating: 5,
    comment: "We visited Kolhapur for Mahalaxmi Temple pilgrimage. The hotel is clean, safe, and has secured parking. The reception staff helped us book a reliable local taxi. Outstanding hospitality at highly affordable rates.",
    stayDate: "June 2026",
    tag: "Pilgrimage"
  },
  {
    id: "rev-3",
    name: "Sumeet Sharma",
    location: "Bangalore, Karnataka",
    rating: 4,
    comment: "Superb high-speed Wi-Fi and excellent hot water supply. Reception desk is open 24/7, making my late-night check-in extremely smooth. Standard Room is clean and budget-friendly.",
    stayDate: "April 2026",
    tag: "Solo"
  },
  {
    id: "rev-4",
    name: "Mahesh Patil",
    location: "Sangli, Maharashtra",
    rating: 5,
    comment: "Best value-for-money hotel near Kolhapur bus stand. Secured parking area was a big plus for my car. Rooms are quiet despite being close to the main terminal area.",
    stayDate: "July 2026",
    tag: "Business"
  }
];
