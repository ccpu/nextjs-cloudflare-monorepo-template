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

Add these secrets to your GitHub repository settings (`Settings > Secrets and variables > Actions`):

- **`CLOUDFLARE_API_TOKEN`**:
  1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
  2. Click "Create Token"
  3. Use "Custom token" template
  4. Add permissions: `Cloudflare Workers:Edit`, `Account:Read`, `Zone:Read`
  5. Copy the generated token

- **`CLOUDFLARE_ACCOUNT_ID`**:
  1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
  2. Copy the Account ID from the right sidebar or dropdown next to the account name

#### Setup Preview Deployments (Optional)

For automatic preview deployments on pull requests:

1. **Enable GitHub Actions** in your repository settings
2. **Add the required secrets** (above) to your repository
3. **Configure preview environment** in `apps/web/wrangler.jsonc`:
   ```json
   {
     "env": {
       "preview": {
         "name": "your-app-name-preview"
       }
     }
   }
   ```

#### Setup GitHub Environment with Required Reviewers (Recommended)

For secure deployments with manual approval:

1. **Create GitHub Environment** (IMPORTANT - Do this first to fix linter errors):
   - Go to your repository `Settings > Environments`
   - Click "New environment"
   - Name it: `preview` (must match the name in the workflow)
   - Click "Configure environment"

2. **Enable Required Reviewers**:
   - Check "Required reviewers"
   - Add yourself and/or team members as reviewers
   - Optionally enable "Prevent self-review" if you want someone else to approve

3. **Configure Environment Secrets** (if different from repository secrets):
   - Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` if needed
   - These can override repository-level secrets for this environment

**Important Notes:**

- ⚠️ **VS Code may show a linter error** `Value 'preview' is not valid` until you create the environment in GitHub
- ✅ **The workflow syntax is correct** - the error will disappear once the environment exists
- 🔄 **Restart VS Code** after creating the environment to clear the linter error

**Benefits of GitHub Environments:**

- ✅ Built-in GitHub feature with audit trail
- ✅ Clean UI for approvals in the GitHub interface
- ✅ Automatic deployment after approval
- ✅ Easy to see approval status in PR
- ✅ Can set different reviewers for different environments
- ✅ Deployment protection rules and wait timers

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

### GitHub Actions & Preview Deployments

#### Common Issues and Solutions

**❌ "Required secrets not set" error:**

- Ensure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are added to your repository secrets
- Go to `Settings > Secrets and variables > Actions` in your GitHub repository
- Add both secrets with the values from your Cloudflare dashboard

**❌ Preview deployment fails:**

- Check that the preview environment name in `wrangler.jsonc` is unique
- Ensure your Cloudflare account has Workers enabled
- Verify the API token has the correct permissions

**❌ Build fails in GitHub Actions:**

- The workflow automatically runs `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`
- Fix any linting, type, or test errors before the preview will deploy
- Check the Actions tab in your repository for detailed error logs

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
