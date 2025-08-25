import type { SiteConfig } from '../../types/site.config';

/**
 * Site configuration with TypeScript support
 * This is the source of truth for site configuration
 */
export const siteConfig: SiteConfig = {
  name: 'Coundflare Next.js Monorepo Template',
  description:
    'A starter template for building Next.js applications with Cloudflare Workers in a monorepo setup using Turborepo and PNPM.',
  url: 'https://example.com',
  ogImage: 'https://example.com/og.png',
  author: {
    name: 'Author Name',
    email: 'Author Email',
  },
  // Theme configuration
  theme: {
    enabled: true, // Set to false to disable theme switching
    defaultTheme: 'system', // 'light', 'dark', or 'system'
  },
} as const;

export default siteConfig;
export type { SiteConfig };
