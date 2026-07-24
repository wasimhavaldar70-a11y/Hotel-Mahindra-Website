import { MetadataRoute } from 'next';
import { roomsData } from '../data/rooms';

/**
 * ============================================================================
 * SEO SITEMAP GENERATOR
 * 
 * PURPOSE:
 * Dynamically constructs the sitemap.xml tree during compilation.
 * Maps standard and dynamic accommodation pages for search engine crawling.
 * ============================================================================
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mahendrahotel.in'; // Replace with production URL in final build
  
  // Static page routing maps
  const staticRoutes = ['', '/about', '/rooms', '/gallery', '/nearby', '/contact', '/privacy', '/terms'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic room detailing route mapping
  const roomRoutes = roomsData.map((room) => ({
    url: `${baseUrl}/rooms/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...roomRoutes];
}
