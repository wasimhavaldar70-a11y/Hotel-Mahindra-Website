/**
 * ======================================================
 * ATTRACTION TYPE DEFINITION
 * 
 * PURPOSE:
 * Defines the TypeScript interface for a Tourist Attraction.
 * Standardizes the nearby locations structure.
 * ======================================================
 */

export interface Attraction {
  id: string;          // Unique identifier
  name: string;        // Name of the tourist place
  description: string; // Description/historical details
  image: string;       // Image URL or local file path
  mapsUrl: string;     // Google Maps directions URL
  distanceInfo?: string; // Optional distance from hotel (e.g. 'Approx. 2 km')
}
