/**
 * ============================================================================
 * ROOMS DATASET
 * 
 * PURPOSE:
 * Centralizes the static dataset for all available rooms at Mahendra Hotel.
 * 
 * CHANGE / MODIFY DETAILS HERE:
 * - Room slug (must match route targets, e.g., 'deluxe-ac-room')
 *   Note: If you change the slug, make sure it matches URLs.
 * - Name, Price, Occupancy limits, sizes, and specific amenities list.
 * - Image lists (drawn from IMAGES object in data/images.ts).
 * 
 * ADD NEW ROOM:
 * Simply append a new object conforming to the Room interface (types/room.ts)
 * to the `roomsData` array.
 * ============================================================================
 */

import { Room } from '../types/room';
import { IMAGES } from './images';

export const roomsData: Room[] = [
  {
    slug: "deluxe-ac-room",
    name: "Deluxe AC Room",
    price: "₹2,499",
    description: "Spacious, modern room equipped with air conditioning and premium amenities, perfect for couples or business travelers.",
    fullDescription: "Our Deluxe AC Room offers a perfect blend of modern comfort and premium convenience. Designed with meticulous attention to detail, this air-conditioned sanctuary features a luxurious king-sized double bed, sleek writing desk, flat-screen television with satellite channels, and a fully private, clean bathroom with 24/7 hot water supply. Large soundproof windows provide natural daylight while ensuring a peaceful, comfortable night's rest in the center of Kolhapur.",
    maxOccupancy: "2 Adults + 1 Child (Under 6 Years)",
    size: "220 sq ft",
    bedType: "King Size Double Bed",
    features: ["Air Conditioning", "Free Wi-Fi", "LED TV", "24/7 Hot Water", "Daily Housekeeping"],
    amenities: [
      "Individually Controlled AC",
      "Complimentary High-Speed Wi-Fi",
      "Wall-mounted 32\" Smart LED TV",
      "Premium Double Bedding & Fine Linens",
      "In-room Intercom System",
      "Writing Desk and Cozy Armchair",
      "Attached Clean Bathroom with Shower",
      "Hot & Cold Water Supply (24/7)",
      "Daily Complimentary Bottled Water",
      "Modern Power Outlet Points (Universal)"
    ],
    images: [
      IMAGES.rooms.deluxeAcMain,
      IMAGES.rooms.deluxeAcDetail1,
      IMAGES.rooms.deluxeAcDetail2
    ],
    includedFacilities: [
      "Complimentary High-Speed Internet",
      "Mineral Water Bottle upon Arrival",
      "Free Secured Parking Facility",
      "Luggage Storage on Demand"
    ]
  },
  {
    slug: "family-ac-suite",
    name: "Executive Family AC Suite",
    price: "₹3,999",
    description: "Extra large double-bed suite designed for families traveling together, offering top-tier comfort and modern conveniences.",
    fullDescription: "The Executive Family AC Suite is engineered specifically to accommodate families or groups. This expansive suite hosts two distinct king-sized double beds, separate seating lounge, climate control air conditioning, and top-tier amenities. Strategically insulated against bus terminal noise, it provides a safe, highly functional, and extremely comfortable home-away-from-home for your family.",
    maxOccupancy: "4 Adults + 2 Children",
    size: "380 sq ft",
    bedType: "Two King Size Double Beds",
    features: ["Double King Beds", "Air Conditioning", "Free Wi-Fi", "Sofa Seating Lounge", "Refrigerator"],
    amenities: [
      "Two Premium King-Size Double Beds",
      "Dual Individually Controlled ACs",
      "Complimentary High-Speed Wi-Fi",
      "43\" Smart LED TV with Cable Channels",
      "Plush Sofa Set with Coffee Table",
      "In-room Mini Refrigerator",
      "Spacious Attached Bathroom with Premium Fittings",
      "Geyser for Continuous Hot Water Supply",
      "Direct Dial Intercom Service",
      "Wardrobe with Security Safe Box"
    ],
    images: [
      IMAGES.rooms.familyAcMain,
      IMAGES.rooms.familyAcDetail1,
      IMAGES.rooms.familyAcDetail2
    ],
    includedFacilities: [
      "Complimentary High-Speed Internet",
      "Daily Newspaper Service",
      "Mineral Water Bottles Refills",
      "Free Secured Parking Facility",
      "Access to 24/7 Concierge Support"
    ]
  },
  {
    slug: "standard-non-ac-room",
    name: "Standard Non-AC Room",
    price: "₹1,499",
    description: "Affordable, exceptionally clean budget room with high-speed ceiling fan and cozy comfortable bedding.",
    fullDescription: "Our Standard Non-AC Room is the ideal cost-effective lodging solution for budget-conscious families, solo pilgrims, and transit travelers. Focusing heavily on absolute cleanliness and safety, this room offers a comfortable queen-size double bed, high-speed ceiling fan ventilation, flat-screen TV, clean writing table, and an attached private bathroom. Highly secure and conveniently located near transit hubs.",
    maxOccupancy: "2 Adults",
    size: "180 sq ft",
    bedType: "Queen Size Double Bed",
    features: ["High-speed Ceiling Fan", "Free Wi-Fi", "LED TV", "Attached Private Bath", "Cozy Bedding"],
    amenities: [
      "High-speed Ceiling Fan",
      "Complimentary High-Speed Wi-Fi",
      "32\" LED TV with Local Channels",
      "Clean Queen-Size Bedding",
      "Private Attached Bathroom",
      "Geyser Hot Water System",
      "Intercom Connection to Desk",
      "Comfortable Chair & Utility Table",
      "Universal Charging Outlets"
    ],
    images: [
      IMAGES.rooms.standardNonAcMain,
      IMAGES.rooms.standardNonAcDetail1,
      IMAGES.rooms.standardNonAcDetail2
    ],
    includedFacilities: [
      "Complimentary High-Speed Internet",
      "Mineral Water Bottle upon Check-in",
      "Free Secured Parking Access"
    ]
  }
];
