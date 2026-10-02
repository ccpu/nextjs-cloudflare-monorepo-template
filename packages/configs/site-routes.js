/** @typedef {import("./site-routes").SiteRoute} SiteRoute */

/*
 * Who may see each route, and whether search engines should.
 *
 * This list is the single source of truth for everything that must agree on
 * a route's visibility: the sitemap today, and an auth middleware once the app
 * has one. Maintained separately, they drift, and pages end up in the sitemap
 * while the middleware redirects crawlers to a login page.
 *
 * Entries are path *prefixes*: `/blog` also governs `/blog/my-post`. A route
 * with no entry here is treated as private and non-indexable, so forgetting to
 * classify a new page fails closed rather than leaking it. The coverage test in
 * apps/web asserts every route in the app has an entry, so the omission is
 * caught in CI rather than in Search Console weeks later.
 *
 * Keep this file free of Node APIs: it may be imported by edge middleware.
 */

/** @type {readonly SiteRoute[]} */
export const siteRoutes = [
  // Marketing and content.
  { path: '/', access: 'public', indexable: true },
  { path: '/about', access: 'public', indexable: true },
  { path: '/blog', access: 'public', indexable: true },
  { path: '/contact', access: 'public', indexable: true },
  { path: '/faq', access: 'public', indexable: true },
  // Public resources, excluded from the sitemap.
  { path: '/og.png', access: 'public', indexable: false },
  { path: '/security.txt', access: 'public', indexable: false },
  { path: '/.well-known/security.txt', access: 'public', indexable: false },
];

/*
 * Served from the site root but not pages: excluded so next-sitemap's static
 * scan does not advertise them.
 */
const nonPagePaths = ['/manifest.webmanifest'];

/** Paths that belong in the sitemap. */
export const indexablePaths = siteRoutes
  .filter((route) => route.indexable)
  .map((route) => route.path);

/*
 * Everything the sitemap must not advertise. Each prefix is emitted twice
 * because next-sitemap matches with globs, and `/admin/*` does not match the
 * bare `/admin` it is anchored to.
 */
export const sitemapExclude = [
  ...siteRoutes
    .filter((route) => !route.indexable && route.path !== '/')
    .flatMap((route) => [route.path, `${route.path}/*`]),
  ...nonPagePaths,
];

/**
 * Finds the rule governing a pathname, or `undefined` when none does.
 * @param {string} pathname
 * @returns {SiteRoute | undefined} The matching rule, or `undefined` when the path is unclassified.
 */
export function matchRoute(pathname) {
  return siteRoutes.find(
    (route) =>
      pathname === route.path ||
      (route.path !== '/' && pathname.startsWith(`${route.path}/`)),
  );
}

/**
 * Whether a signed-out visitor may load this pathname.
 * @param {string} pathname
 * @returns {boolean} True when the path is public.
 */
export function isPublicPath(pathname) {
  return matchRoute(pathname)?.access === 'public';
}
