# Next.js Cloudflare Monorepo Template

A production-ready Next.js 15 monorepo template with Cloudflare Workers deployment, TypeScript, Tailwind CSS, and Turborepo for fast development and edge deployment.

## 🌐 Live Example

See a working demo:

[https://nextjs.m-doaie.workers.dev](https://nextjs.m-doaie.workers.dev)

## ✨ Features

- 🚀 **Next.js 15** with App Router
- ☁️ **Cloudflare Workers** deployment ready
- 📦 **Turborepo** for efficient builds and caching
- 🔧 **pnpm Workspaces** for package management
- 🎨 **Tailwind CSS** for styling
- 📊 **TypeScript** throughout
- 🗄️ **Drizzle ORM + D1** for database operations
- 📈 **Page visit tracking** (GDPR-friendly)
- 🤖 **Automatic SEO** (sitemap, robots.txt, manifest)
- 🧹 **ESLint & Prettier** configured
- 📱 **PWA ready**

## 🚀 Quick Start

### 1. Installation

```bash
# Clone and install dependencies
git clone <your-repo-url>
cd nextjs-cloudflare-monorepo-template
pnpm install
```

### 2. Development

```bash
# Start development server
pnpm web:dev
```

Open [http://localhost:3000](http://localhost:3000) to view your app.

### 3. Deploy to Cloudflare

#### Set up Environment Variables

Add these secrets to your GitHub repository settings:

- **`CLOUDFLARE_API_TOKEN`**:
  1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
  2. Click "Create Token"
  3. Use "Custom token" template
  4. Add permissions: `Cloudflare Workers:Edit`, `Account:Read`, `Zone:Read`
  5. Copy the generated token

- **`CLOUDFLARE_ACCOUNT_ID`**:
  1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
  2. Copy the Account ID from the right sidebar or dropdown next to the account name

#### Automatic Deployment

Push to main branch for automatic deployment:

```bash
git push origin main
```

## 🌐 Custom Domains & worker.dev Setup

To deploy to a custom domain, you must set the `"routes"` value in your `apps/web/wrangler.jsonc` file. Example:

```json
{
  "routes": ["https://yourdomain.com/*"]
}
```

For deployments to the default Cloudflare `worker.dev` subdomain, ensure that `worker.dev` is enabled in your Cloudflare dashboard. If you do not set `"routes"`, your Worker will deploy to `worker.dev` (if enabled).

- [Cloudflare Docs: Custom Domains](https://developers.cloudflare.com/workers/platform/routes/)
- [Cloudflare Docs: worker.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)

## �️ Database Setup

This template includes **Drizzle ORM with Cloudflare D1** for privacy-friendly page visit tracking.

### Create D1 Database

```bash
cd apps/web
pnpm wrangler d1 create page-visits
pnpm wrangler d1 migrations apply page-visits --remote
```

This returns a database ID. Copy it for the next step.

### Update Configuration

Update `apps/web/wrangler.jsonc`:

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "page-visits",
      "database_id": "YOUR_DATABASE_ID_HERE"
    }
  ]
}
```

📖 **[See DATABASE_SETUP.md for complete setup instructions](./DATABASE_SETUP.md)**

**Features:**

- 📊 Page visit analytics at `/analytics`
- 🛡️ GDPR-friendly (no personal data stored)
- 🌍 Country-based visit tracking via CF headers
- 🚀 Edge-optimized with D1 database

## �📦 Project Structure

```
├── apps/
│   └── web/                 # Next.js application
├── packages/
│   ├── ui/                  # Shared React components
│   ├── utils/               # Utility functions
│   └── config/              # Shared configurations
└── tooling/
    ├── eslint/              # ESLint configurations
    ├── typescript/          # TypeScript configurations
    └── prettier/            # Prettier configuration
```

## 🛠️ Available Scripts

```bash
pnpm web:dev        # Start development server
pnpm build          # Build all packages
pnpm lint           # Lint all packages
pnpm typecheck      # Type check all packages
pnpm test           # Run tests
```

## 📚 Documentation

- [Web App](./apps/web/README.md) - Next.js application details
- [UI Components](./packages/ui/README.md) - Shared components
- [Utilities](./packages/utils/README.md) - Helper functions
- [Configuration](./packages/config/README.md) - Shared configs

## 🔧 Development Notes

### Windows Users

⚠️ **Known Issue**: The OpenNext.js Cloudflare build fails on Windows due to symlink permission issues (EPERM errors).

**Solutions**:

- **Recommended**: Use GitHub Actions for deployment (push to `main` branch)
- **Local Development**: Use `pnpm web:dev` for development (works fine)
- **Alternative**: Use WSL for local builds: `wsl && cd /mnt/your/path && pnpm build`

### Package Management

This project uses **pnpm**. Always use `pnpm` instead of `npm` or `yarn`.

## 🧪 Testing in the Monorepo

- This monorepo uses [Vitest](https://vitest.dev/) for unit and integration tests.
- Test configuration is shared via the internal package `@internal/vitest-config` (see `tooling/vitest`).
- Each app or package can import config from `@internal/vitest-config/react` for React projects.
- Run tests with:
  ```sh
  pnpm test
  ```
- Watch mode and UI are available:
  ```sh
  pnpm test:watch
  pnpm test:ui
  ```
- All test scripts use `pnpm` as the package manager.

---

Ready to build something amazing? Start by editing `apps/web/src/app/page.tsx` 🚀
