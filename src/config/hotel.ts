/**
 * ============================================================================
 * HOTEL CONFIGURATION
 * 
 * PURPOSE:
 * Centralizes all editable hotel business information. Adjusting these values
 * propagates changes across all pages, footers, headers, and contact buttons.
 * 
 * HOW TO MAINTAIN:
 * - When changing contact numbers, update both the visual string (e.g. "+91 91583...")
 *   and the raw dial string (used in 'tel:' links, e.g. "+9191583...").
 * - Pre-filled WhatsApp message can be edited in `whatsappMessage`.
 * - To replace Google Maps target directions, paste the new share link in `googleMapsUrl`.
 * ============================================================================
 */

export const hotelConfig = {
  // BRAND INFO
  name: "Hotel Mahindra Deluxe",
  logoText: "MAHINDRA",
  logoSubtext: "HOTEL DELUXE",
  tagline: "Your Comfort, Our Commitment",
  description: "A premium budget hotel offering clean, secure, and modern accommodation right on NH4 Highway in Vathar Tarf Vadgaon, Kolhapur, Maharashtra.",

  // CONTACT DIRECT CHANNELS
  phoneDisplay: "+91 84602 67454", // Phone number shown to users
  phoneDial: "+918460267454",       // Raw number for tel: link (no spaces)
  
  whatsappDisplay: "+91 84602 67454", // WhatsApp number shown to users
  whatsappDial: "918460267454",       // Raw number (with country code, no +, no spaces) for WhatsApp API
  whatsappMessage: "Hello Hotel Mahindra Deluxe, I would like to inquire about room booking and rates.", // Pre-filled message

  email: "hotelmahendra07@gmail.com",
  
  // ADDRESS & LOCATION
  address: "Near Bridge Indian Oil Petrol Pump, NH4 Highway, Vathar Tarf Vadgaon, Kolhapur-416112, Maharashtra",
  addressGoogleSearchQuery: "Hotel Mahindra Deluxe Vathar Vadgaon Kolhapur",
  googleMapsUrl: "https://maps.app.goo.gl/Vyddj8MjRCb4ajdK9", // Target directions link

  // BUSINESS GUIDELINES
  workingHours: "24 Hours (Reception)",
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",

  // SOCIAL LINKS (Leave blank string to hide them from UI)
  socials: {
    facebook: "https://facebook.com/mahendrahotelkolhapur",
    instagram: "https://instagram.com/mahendrahotelkolhapur",
    twitter: "", // Left blank intentionally
    tripadvisor: "https://tripadvisor.com" // Placeholder
  }
};
