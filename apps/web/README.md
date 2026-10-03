# Web App

Next.js 16 app with Cloudflare Workers deployment.

## Features

- **Next.js 16** with App Router
- **Tailwind CSS v4** styling with dark mode support
- **tailwindcss-animated** - Pre-built animations for smooth UX
- **Theme System** - Light, Dark, and System preference modes with next-themes
- **next-sitemap** for automated sitemap and robots.txt generation
- **TypeScript** throughout

## Development

```bash
pnpm dev      # Start dev server
pnpm build    # Build for production
pnpm sitemap  # Generate sitemap and robots.txt
pnpm deploy   # Deploy to Cloudflare
```

`pnpm deploy` validates `wrangler.jsonc` first and stops if `yourdomain.com` has not been replaced with your real custom domain.

## SEO & Sitemaps

This app uses `next-sitemap` to automatically generate:

- `sitemap.xml` - Contains all discoverable routes
- `robots.txt` - Search engine crawling rules

The sitemap is automatically generated during the build process, or can be generated manually with `pnpm sitemap`. Configuration is in `next-sitemap.config.js`.

## Routes

Marketing pages live in the `(marketing)` route group, which adds the navbar, footer and theme toggle:

- `/` - Home page
- `/about` - About page
- `/blog` - Blog pages
- `/faq` - FAQ page
- `/contact` - Contact page

## Structure

```
src/
├── app/
│   └── (marketing)/  # Public pages sharing the marketing layout
├── components/
│   └── marketing/    # Footer, FAQ accordion, button link
└── lib/              # Page metadata helpers
```

## Configuration Files

- `@internal/configs` (`packages/configs`) - Shared app config, route manifest and env checks
- `run-with-root-env.mjs` - Runs a command with the repository-root `.env.local` and `.env` loaded (`pnpm with-env <cmd>`)
- `next-sitemap.config.js` - Sitemap generation configuration
- `next.config.ts` - Next.js configuration with Cloudflare Workers support
- `wrangler.jsonc` - Cloudflare Workers configuration with a placeholder custom domain that must be replaced before deployment

## Theme System

The app includes a comprehensive theme system built with `next-themes`:

- **Light Mode** - Clean and bright interface
- **Dark Mode** - Comfortable for low-light environments
- **System Mode** - Automatically follows your OS preference
- **Persistent** - Remembers your choice across sessions
- **Configurable** - Can be enabled/disabled via `theme` in `packages/configs/src/app-config-public.js`

Toggle between themes using the button in the bottom-right corner, or cycle through Light → Dark → System modes.

## Animations

This template uses **tailwindcss-animated** for smooth, performant animations:

- **Pre-built animations** - Fade, bounce, wiggle, zoom, and more
- **Utility classes** - Control duration, delay, timing, and iteration
- **Responsive support** - Apply animations based on screen size
- **Hover animations** - Interactive button and link effects
- **Optimized performance** - CSS-based animations for best performance

Key animation patterns used:

- Page load sequences with staggered delays
- Hover effects on interactive elements
- Entrance animations for content sections

For more animations and customization options, see the [tailwindcss-animated documentation](https://tailwindcss-animated.com/).
