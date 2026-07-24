/**
 * ============================================================================
 * SECTION IMAGES DATA TYPES
 * 
 * PURPOSE:
 * Type definitions for section-specific dynamic image uploads & management:
 * - Hero Slides
 * - About Section
 * - Deluxe AC Room
 * - Family AC Room
 * - Standard Room
 * - Attractions
 * - Gallery
 * ============================================================================
 */

export type SectionKey =
  | "hero"
  | "about"
  | "deluxe-ac-room"
  | "family-ac-suite"
  | "standard-non-ac-room"
  | "attractions"
  | "gallery";

export interface SectionImageItem {
  id: string;
  sectionKey: SectionKey;
  url: string;
  title: string;
  description?: string;
  category?: string;
  sortOrder: number;
  createdAt?: string;
}
