/**
 * ======================================================
 * ROOM TYPE DEFINITION
 * 
 * PURPOSE:
 * Defines the TypeScript interface for a Room.
 * Standardizes the data schema across pages and cards.
 * ======================================================
 */

export interface Room {
  slug: string;           // Unique identifier for URL routing (e.g. 'deluxe-ac-room')
  name: string;           // Display name (e.g. 'Deluxe AC Room')
  price: string;          // Display price per night (e.g. '₹2,499')
  description: string;    // Brief listing summary
  fullDescription: string;// Comprehensive profile for detail page
  maxOccupancy: string;  // Max guests (e.g. '2 Adults, 1 Child')
  size: string;           // Room area (e.g. '240 sq ft')
  bedType: string;        // Bed config (e.g. 'King Size Double Bed')
  features: string[];     // Key tags shown on preview cards (e.g. ['Air Conditioning', 'Free Wi-Fi'])
  amenities: string[];    // Detailed list of amenities shown on detail page
  images: string[];       // Array of image paths. First element is the main image.
  includedFacilities: string[]; // Standard inclusions (e.g., 'Complimentary Breakfast', 'Mineral Water')
}
