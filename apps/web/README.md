# Web App

Next.js 15 app with Cloudflare Workers deployment, analytics, and optimized validation architecture.

## Features

- **Next.js 15** with App Router
- **Tailwind CSS** styling
- **Cloudflare D1** database with visit tracking
- **Simplified validation** - Zod only at API boundaries
- **TypeScript** throughout

## Development

```bash
pnpm dev     # Start dev server
pnpm build   # Build for production
pnpm deploy  # Deploy to Cloudflare
```

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
