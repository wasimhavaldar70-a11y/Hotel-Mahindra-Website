/**
 * ============================================================================
 * SEO CONFIGURATION
 * 
 * PURPOSE:
 * Centralizes standard SEO metadata defaults used across the application.
 * Contains values for title tags, descriptions, OpenGraph attributes,
 * and social card configurations.
 * ============================================================================
 */

import { Metadata } from 'next';
import { hotelConfig } from './hotel';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hotelmahendradeluxe.com";

export const defaultSeo: Metadata = {
  title: {
    default: `${hotelConfig.name} | Premium Budget Hotel in Kolhapur`,
    template: `%s | ${hotelConfig.name} Kolhapur`
  },
  description: `${hotelConfig.name} (Hotel Mahindra Deluxe) is a clean, secure, and family-friendly premium budget hotel located on NH4 Highway, Vathar Tarf Vadgaon, Kolhapur, Maharashtra. Book comfortable rooms at affordable rates.`,
  keywords: [
    "hotel mahendra deluxe",
    "hotel mahendra deluxe kolhapur",
    "hotel mahindra deluxe",
    "hotel mahindra deluxe kolhapur",
    "hotel mahendra",
    "hotel mahindra",
    "Hotel Mahendra",
    "Hotel Mahindra Deluxe",
    "budget hotel in kolhapur", 
    "premium budget hotel kolhapur", 
    "hotel near kolhapur bus stand", 
    "hotel near nh4 highway kolhapur",
    "vathar vadgaon hotel",
    "family hotel kolhapur",
    "mahalaxmi temple hotel", 
    "clean rooms kolhapur", 
    "best accommodation kolhapur"
  ],
  authors: [{ name: "Hotel Mahendra Deluxe" }],
  creator: "Hotel Mahendra Deluxe",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    title: `${hotelConfig.name} | Premium Budget Hotel in Kolhapur`,
    description: `${hotelConfig.name} (Hotel Mahindra Deluxe) is a clean, secure, and family-friendly premium budget hotel located on NH4 Highway, Vathar Tarf Vadgaon, Kolhapur, Maharashtra.`,
    siteName: hotelConfig.name,
    images: [
      {
        url: '/images/og-image.jpg', // Path to the default OG image (under /public)
        width: 1200,
        height: 630,
        alt: `${hotelConfig.name} - Kolhapur`
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: `${hotelConfig.name} | Premium Budget Hotel in Kolhapur`,
    description: `${hotelConfig.name} (Hotel Mahindra Deluxe) is a clean, secure, and family-friendly premium budget hotel located on NH4 Highway, Vathar Tarf Vadgaon, Kolhapur, Maharashtra.`,
    images: ['/images/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};
