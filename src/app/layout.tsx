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

