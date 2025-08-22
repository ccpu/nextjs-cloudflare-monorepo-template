import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@internal/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
