/**
 * ============================================================================
 * GALLERY DATASET
 * 
 * PURPOSE:
 * Centralizes photo paths and categorizations for the visual masonry layout.
 * 
 * NOTE:
 * - Update photo tags, category types, and captions from this central file.
 * - Categories: 'rooms' | 'exterior' | 'lobby' | 'dining' | 'general'
 * ============================================================================
 */

import { GalleryItem } from '../types/gallery';
import { IMAGES } from './images';

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    url: IMAGES.gallery[0],
    title: "Mahendra Hotel Front Facade & Entrance",
    category: "exterior"
  },
  {
    id: "g2",
    url: IMAGES.gallery[1],
    title: "Warm and Welcoming Reception Desk",
    category: "lobby"
  },
  {
    id: "g3",
    url: IMAGES.gallery[2],
    title: "Deluxe AC Bed Configuration",
    category: "rooms"
  },
  {
    id: "g4",
    url: IMAGES.gallery[3],
    title: "Executive Family AC Suite Double King Beds",
    category: "rooms"
  },
  {
    id: "g5",
    url: IMAGES.gallery[4],
    title: "Cozy Bedroom Layout & Lighting Details",
    category: "rooms"
  },
  {
    id: "g6",
    url: IMAGES.gallery[5],
    title: "Neat Bathroom Settings with Geyser",
    category: "rooms"
  },
  {
    id: "g7",
    url: IMAGES.gallery[6],
    title: "Standard Room Comfortable Setup",
    category: "rooms"
  },
  {
    id: "g8",
    url: IMAGES.gallery[7],
    title: "Lobby Lounging Area for Guests",
    category: "lobby"
  },
  {
    id: "g9",
    url: IMAGES.gallery[8],
    title: "Dedicated Secured Parking Facility",
    category: "general"
  }
];
