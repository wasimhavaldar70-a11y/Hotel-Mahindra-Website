import { MetadataRoute } from 'next';

/**
 * ============================================================================
 * SEO ROBOTS CONFIGURATOR
 * 
 * PURPOSE:
 * Generates the robots.txt file during static compilation.
 * 
 * CORE REQUIREMENT ALIGNMENT:
 * Disallows search engine crawlers from indexing the '/app/*' paths which
 * houses the independent hotel ERP dashboard.
 * ============================================================================
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mahendrahotel.in'; // Replace with production URL in final build
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/app/'], // Block search engines from crawling the ERP route
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
