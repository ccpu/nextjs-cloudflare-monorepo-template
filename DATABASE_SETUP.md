# Database Setup (Drizzle + Cloudflare D1)

This template includes privacy-friendly page visit tracking using Drizzle ORM with Cloudflare D1 database.

## Quick Setup

### 1. Create D1 Database

```bash
cd apps/web
pnpm wrangler d1 create page-visits
```

This returns a database ID. Copy it for the next step.

### 2. Update Configuration

Update `apps/web/wrangler.jsonc`:

```json
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "page-visits",
    "database_id": "YOUR_DATABASE_ID_HERE"
  }
]
```

### 3. Run Database Migration

```bash
cd apps/web
pnpm db:generate
pnpm wrangler d1 migrations apply page-visits
```

### 4. Deploy

```bash
pnpm deploy
```

## Local Development

For local development, create a local D1 database:

```bash
cd apps/web
pnpm wrangler d1 migrations apply page-visits --local
```

Then run your dev server normally:

```bash
pnpm dev
```

## What's Included

- **Page visit tracking**: Automatically tracks page visits by country (GDPR-friendly)
- **Analytics page**: Visit `/analytics` to see tracked data
- **API endpoints**: `GET/POST /api/visits` for retrieving and storing visit data
- **Privacy-first**: Only tracks page path, date, and country - no personal data

## Database Commands

- `pnpm db:generate` - Generate migration files from schema changes
- `pnpm db:studio` - Open Drizzle Studio (requires setup)
- `pnpm wrangler d1 migrations list page-visits` - List applied migrations
- `pnpm wrangler d1 execute page-visits --command "SELECT * FROM page_visits"` - Query database
