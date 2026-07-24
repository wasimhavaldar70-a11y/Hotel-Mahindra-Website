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

const baseUrl = "https://mahendrahotel.in"; // Replace with production URL

export const defaultSeo: Metadata = {
  title: {
    default: `${hotelConfig.name} | Premium Budget Hotel in Kolhapur`,
    template: `%s | ${hotelConfig.name} Kolhapur`
  },
  description: `${hotelConfig.name} is a clean, secure, and family-friendly premium budget hotel located opposite Central Bus Stand in Kolhapur, Maharashtra. Enjoy premium amenities at affordable rates.`,
  keywords: [
    "Mahendra Hotel", "Hotel Mahendra Kolhapur", "budget hotel in kolhapur", 
    "premium budget hotel", "hotel near kolhapur bus stand", "family hotel kolhapur",
    "mahalaxmi temple hotel", "clean rooms kolhapur", "best accommodation kolhapur"
  ],
  authors: [{ name: "Mahendra Hotel Agency" }],
  creator: "Mahendra Hotel",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    title: `${hotelConfig.name} | Premium Budget Hotel in Kolhapur`,
    description: `${hotelConfig.name} is a clean, secure, and family-friendly premium budget hotel located opposite Central Bus Stand in Kolhapur, Maharashtra.`,
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
    description: `${hotelConfig.name} is a clean, secure, and family-friendly premium budget hotel located opposite Central Bus Stand in Kolhapur, Maharashtra.`,
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
