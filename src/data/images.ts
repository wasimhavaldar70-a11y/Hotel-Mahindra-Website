/**
 * ============================================================================
 * CENTRALIZED IMAGES REGISTRY
 * 
 * PURPOSE:
 * Centralizes all image references used throughout the marketing website.
 * Prevents hardcoding of media paths inside UI files.
 * 
 * MAINTENANCE INSTRUCTIONS:
 * - During development, this file references high-quality, free stock images.
 * - PLACEHOLDERS - REPLACE BEFORE PRODUCTION: Swap these URLs with production-ready
 *   image URLs stored in your Supabase Storage Bucket or CDN.
 * ============================================================================
 */

export const IMAGES = {
  // HERO IMAGE SETS
  hero: {
    mainSlide1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80", // Hotel Exterior / Facade
    mainSlide2: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80", // Reception Lobby Counter
    mainSlide3: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=80", // Guest Deluxe Bedroom
  },

  // ABOUT US CONTENT
  about: {
    lobbyView: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80", // Clean lobby & seating area
    serviceSmile: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80" // Reception lobby counter
  },

  // ROOM DEMO SETS
  rooms: {
    deluxeAcMain: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", 
    deluxeAcDetail1: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80", 
    deluxeAcDetail2: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",

    familyAcMain: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", 
    familyAcDetail1: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    familyAcDetail2: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",

    standardNonAcMain: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80", 
    standardNonAcDetail1: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    standardNonAcDetail2: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
  },

  // NEARBY ATTRACTIONS
  attractions: {
    mahalaxmiTemple: "https://nmkjmoqtkpfmseswiqpq.supabase.co/storage/v1/object/public/hotel-images/attractions/1785908800102-nkos.jpg",
    jyotibaTemple: "https://nmkjmoqtkpfmseswiqpq.supabase.co/storage/v1/object/public/hotel-images/attractions/1785908804431-2u58.jfif",
    panhalaFort: "https://nmkjmoqtkpfmseswiqpq.supabase.co/storage/v1/object/public/hotel-images/attractions/1785908811429-zqf2.jpg",
    rankalaLake: "https://nmkjmoqtkpfmseswiqpq.supabase.co/storage/v1/object/public/hotel-images/attractions/1785908814767-niyb.jpg",
    newPalace: "https://nmkjmoqtkpfmseswiqpq.supabase.co/storage/v1/object/public/hotel-images/attractions/1785908817964-87zx.jfif"
  },

  // GALLERY ITEMS
  gallery: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80"
  ]
};
