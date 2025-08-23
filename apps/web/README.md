# Web App

Next.js 15 app with Cloudflare Workers deployment, analytics, and optimized validation architecture.

## Features

- **Next.js 15** with App Router
- **Tailwind CSS** styling
- **Cloudflare D1** database with visit tracking
- **next-sitemap** for automated sitemap and robots.txt generation
- **Simplified validation** - Zod only at API boundaries
- **TypeScript** throughout

## Development

```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm sitemap  # Generate sitemap and robots.txt
pnpm deploy   # Deploy to Cloudflare
```

## SEO & Sitemaps

This app uses `next-sitemap` to automatically generate:

- `sitemap.xml` - Contains all discoverable routes
- `robots.txt` - Search engine crawling rules

The sitemap is automatically generated during the build process, or can be generated manually with `pnpm sitemap`. Configuration is in `next-sitemap.config.js`.

## Routes

- `/` - Home page
- `/analytics` - Visit analytics dashboard
- `/blog` - Blog pages
- `/contact` - Contact page
- `/api/visits` - Visit tracking API

## Structure

```
src/
├── app/           # App Router pages & API routes
├── components/    # React components
├── db/           # Drizzle schema & database
└── lib/          # Services, repositories, hooks
```

## Configuration Files

- `next-sitemap.config.js` - Sitemap generation configuration
- `next.config.ts` - Next.js configuration with Cloudflare Workers support
- `drizzle.config.ts` - Database configuration
- `wrangler.jsonc` - Cloudflare Workers configuration
