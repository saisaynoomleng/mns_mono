import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/users/',
    },
    sitemap: 'https://mnsart.com/sitemap.xml',
  };
}
