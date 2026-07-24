/**
 * ============================================================================
 * NAVIGATION CONFIGURATION
 * 
 * PURPOSE:
 * Centralizes the main menu routing paths and footer navigation links.
 * 
 * NOTE FOR FUTURE DEVELOPMENT:
 * - Adding a path here updates the headers and footers automatically.
 * - Marketing routes must NOT interfere with the `/app` route, which is reserved
 *   for the separate hotel ERP application.
 * ============================================================================
 */

export interface NavItem {
  label: string;
  path: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "Gallery", path: "/gallery" },
  { label: "Nearby Attractions", path: "/nearby" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" }
];

export const footerSecondaryNavigation: NavItem[] = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms & Conditions", path: "/terms" }
];
