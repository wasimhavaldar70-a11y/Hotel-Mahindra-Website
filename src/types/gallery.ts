/**
 * ======================================================
 * GALLERY ITEM TYPE DEFINITION
 * 
 * PURPOSE:
 * Defines the TypeScript interface for a Gallery Image.
 * Standardizes the photo items structure.
 * ======================================================
 */

export interface GalleryItem {
  id: string;        // Unique identifier (e.g. 'gallery-1')
  url: string;       // Image URL or local file path
  title: string;     // Description/caption of the image
  category: 'rooms' | 'exterior' | 'lobby' | 'dining' | 'general'; // Filter categories
}
