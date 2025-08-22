export const SITE_CONFIG = {
  name: 'Coundflare Next.js Monorepo Template',
  description:
    'A starter template for building Next.js applications with Cloudflare Workers in a monorepo setup using Turborepo and PNPM.',
  url: 'https://example.com',
  ogImage: 'https://example.com/og.png',
  // links: {
  //   twitter: 'https://twitter.com/',
  //   github: 'https://github.com/ccpu',
  //   linkedin: 'https://linkedin.com/in/user',
  // },
  author: {
    name: 'Author Name',
    email: 'Author Email',
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
