# Web App

Next.js 15 application deployed on Cloudflare Workers with automatic SEO optimization and PWA capabilities.

## ✨ Features

- **Next.js 15** with App Router
- **Tailwind CSS** for styling
- **Cloudflare Workers** deployment
- **Automatic SEO** - sitemap, robots.txt, manifest
- **PWA ready** with service worker support
- **TypeScript** throughout

## 🚀 Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare
pnpm deploy

# Preview deployment
pnpm preview
```

## 📄 Routes

- `/` - Home page with getting started guide
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog posts
- `/contact` - Contact page
- `/sitemap.xml` - Auto-generated sitemap
- `/robots.txt` - SEO robots file
- `/manifest.webmanifest` - PWA manifest

## 🔧 Configuration

### Cloudflare Settings

The app is configured for optimal Cloudflare Workers deployment:

- Static asset optimization
- Edge-compatible routing
- Automatic metadata generation
- Performance optimizations

### Environment Variables

Set these in your deployment environment:

```bash
# Optional: Custom site metadata
NEXT_PUBLIC_SITE_NAME="Your Site Name"
NEXT_PUBLIC_SITE_URL="https://yoursite.com"
```

## 📁 Project Structure

```
src/
├── app/                 # App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── globals.css      # Global styles
│   ├── blog/           # Blog pages
│   └── contact/        # Contact page
└── components/         # Reusable components (if any)
```

---

Ready to customize? Start editing `src/app/page.tsx` 🎨

## Configuration

- `next.config.ts` - Next.js configuration
- `wrangler.jsonc` - Cloudflare Workers configuration
- `open-next.config.ts` - OpenNext Cloudflare adapter configuration

## Environment Variables

Add a `.env.local` file with:

```
# Add your environment variables here
```

## Metadata

The app includes comprehensive metadata for SEO:

- Open Graph tags
- Twitter Cards
- Structured data ready
- Sitemap generation
- Robots.txt
