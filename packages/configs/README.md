# @internal/configs

Centralized, framework-agnostic configuration shared by every app in the workspace (the Next.js site, a browser extension, build scripts).

Plain JavaScript with hand-written `.d.ts` files, so build tools such as `next-sitemap.config.js` can import it without a compile step.

## Entry points

| Import                                 | Purpose                                                               |
| -------------------------------------- | --------------------------------------------------------------------- |
| `@internal/configs`                    | `appConfig`: name, description, keywords, locale, URLs, author, theme |
| `@internal/configs/public-urls`        | Site host per environment (`siteBaseUrls`, `getSiteBaseUrl`)          |
| `@internal/configs/site-routes`        | Route manifest: access, indexability, sitemap lists, `matchRoute`     |
| `@internal/configs/require-public-env` | `assertPublicEnv` for build entry points                              |
| `@internal/configs/server.env`         | Server-only environment values                                        |

## Rules

- `appConfig` ships in client bundles: never put secrets in it. Server-only values go in `server.env.js`.
- Keep framework-specific settings (Next.js robots, icons, search-console verification) in the app that uses them.
- Every page in `apps/web` needs an entry in `site-routes.js`; `apps/web/test/site-routes-coverage.test.ts` fails otherwise.
- Point the template at your domain by editing `siteBaseUrls.prod` in `public-urls.js`.
