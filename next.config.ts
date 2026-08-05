import type { NextConfig } from "next";

/**
 * ============================================================================
 * NEXT.JS BUILD CONFIGURATION
 * 
 * PURPOSE:
 * Centralizes standard Next.js parameters, features, and optimization constraints.
 * 
 * SECURITY & INTEGRATION RULES:
 * - Registers allowed external domains for next/image to load remote files safely.
 * - Pre-authorizes Unsplash for mock styling.
 * - Pre-authorizes Supabase Storage domains (*.supabase.co) for immediate integration
 *   when local assets are moved to production storage buckets.
 * ============================================================================
 */

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nmkjmoqtkpfmseswiqpq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.in',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
