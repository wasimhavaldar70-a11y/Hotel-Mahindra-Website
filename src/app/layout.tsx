import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CTAStrip from "../components/common/CTAStrip";
import MainContent from "../components/layout/MainContent";
import { defaultSeo } from "../config/seo";
import { SectionImagesProvider } from "../context/SectionImagesContext";

// Configure Plus Jakarta Sans for Headings (loaded as font-serif variable)
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

// Configure Inter for Body text (loaded as font-sans variable)
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap"
});

// Import centralized SEO metadata defaults
export const metadata: Metadata = defaultSeo;

/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT
 * 
 * PURPOSE:
 * Serves as the global wrapping context for all routes on the marketing website.
 * Loads optimized Google fonts, standard headers, footers, and mobile CTA bars.
 * ============================================================================
 */

import { hotelConfig } from "../config/hotel";

// Hotel Schema.org JSON-LD for Search Engine Knowledge Graph indexing
const hotelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Hotel Mahendra Deluxe",
  "alternateName": ["Hotel Mahindra Deluxe", "Hotel Mahendra", "Hotel Mahindra", "Mahendra Hotel Kolhapur"],
  "description": "Hotel Mahendra Deluxe is a clean, secure, and family-friendly premium budget hotel located on NH4 Highway, Vathar Tarf Vadgaon, Kolhapur, Maharashtra.",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.hotelmahendradeluxe.com",
  "telephone": hotelConfig.phoneDial,
  "email": hotelConfig.email,
  "priceRange": "₹1000 - ₹3000",
  "checkinTime": "12:00",
  "checkoutTime": "11:00",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": hotelConfig.address,
    "addressLocality": "Kolhapur",
    "addressRegion": "Maharashtra",
    "postalCode": "416112",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 16.8228,
    "longitude": 74.2917
  },
  "image": [
    `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hotelmahendradeluxe.com'}/images/og-image.jpg`
  ],
  "sameAs": [
    hotelConfig.googleMapsUrl,
    hotelConfig.socials.facebook,
    hotelConfig.socials.instagram
  ].filter(Boolean)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${plusJakartaSans.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-bg-base text-text-main font-sans">
        <SectionImagesProvider>
          {/* Sticky Header Navigation */}
          <Navbar />

          {/* Route Pages Content Area */}
          <MainContent>
            {children}
          </MainContent>

          {/* Global Action Footer */}
          <Footer />

          {/* Mobile-only bottom persistent CTA shortcuts */}
          <CTAStrip />
        </SectionImagesProvider>
      </body>
    </html>
  );
}

