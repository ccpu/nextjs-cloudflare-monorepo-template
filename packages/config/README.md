# @internal/config

Shared configuration constants and metadata for the monorepo.

## 🔧 Configuration

### Site Metadata

```tsx
import { siteConfig } from '@internal/config';

export function Layout() {
  return (
    <head>
      <title>{siteConfig.name}</title>
      <meta name="description" content={siteConfig.description} />
      <meta name="url" content={siteConfig.url} />
    </head>
  );
}
```

### Available Config

- `siteConfig.name` - Site name
- `siteConfig.description` - Site description
- `siteConfig.url` - Site URL
- `siteConfig.author` - Author information
- `siteConfig.keywords` - SEO keywords

## 🚀 Usage

Import configuration in your app:

```tsx
import { siteConfig } from '@internal/config';

console.log(siteConfig.name); // Site name
console.log(siteConfig.description); // Site description
```

## 🛠️ Development

```bash
pnpm build      # Build configuration
pnpm typecheck  # Type checking
```

This package provides centralized configuration that can be used across all apps and packages in the monorepo.
