/**
 * ============================================================================
 * AMENITIES CONFIGURATION
 * 
 * PURPOSE:
 * Centralizes the list of key amenities displayed across the site.
 * Keeps listings clean, modular, and easy to modify.
 * 
 * HOW TO MAINTAIN:
 * - To add a new amenity, append an object with a unique `id`, `label`, `description`,
 *   and an `iconName` matching a valid Lucide React icon.
 * - Icon mappings are resolved dynamically in components using Lucide Icon mappings.
 * ============================================================================
 */

export interface AmenityConfig {
  id: string;
  label: string;
  description: string;
  iconName: string; // Resolves to a Lucide icon component name
}

export const amenitiesConfig: AmenityConfig[] = [
  {
    id: "amenity-parking",
    label: "Secured Parking",
    description: "Dedicated parking space inside the premises with 24/7 security guard watch.",
    iconName: "Car"
  },
  {
    id: "amenity-wifi",
    label: "High-Speed Wi-Fi",
    description: "Complimentary high-speed internet connection accessible from all guest rooms and lobbies.",
    iconName: "Wifi"
  },
  {
    id: "amenity-ac",
    label: "Air Conditioning",
    description: "High-grade silent cooling systems individually adjustable for each room.",
    iconName: "Snowflake"
  },
  {
    id: "amenity-service",
    label: "Room Service",
    description: "Comfort food and hot tea/beverages delivered directly to your doorstep upon request.",
    iconName: "ConciergeBell"
  },
  {
    id: "amenity-water",
    label: "24/7 Hot Water",
    description: "Continuous running hot and cold water in all bathrooms supplied by reliable geysers.",
    iconName: "Droplets"
  },
  {
    id: "amenity-cctv",
    label: "CCTV Surveillance",
    description: "Round-the-clock camera monitoring in all lobbies, hallways, and parking zones.",
    iconName: "ShieldAlert"
  },
  {
    id: "amenity-reception",
    label: "24/7 Reception Desk",
    description: "Front desk staffed at all hours for key handovers, directions, and instant support.",
    iconName: "Clock"
  }
];
