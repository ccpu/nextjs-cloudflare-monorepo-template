/** Whether a route serves signed-out visitors. */
export type RouteAccess = 'public' | 'private';

/**
 * One top-level route prefix on the site. Prefixes, not leaves: a rule for
 * `/blog` also governs `/blog/my-post`.
 */
export interface SiteRoute {
  /** Path prefix, always leading-slashed and never trailing-slashed. */
  path: string;
  /** `public` serves signed-out visitors; `private` requires a session. */
  access: RouteAccess;
  /** Whether the route belongs in the sitemap and may be indexed. */
  indexable: boolean;
  /** Why this classification, where it is not self-evident. */
  reason?: string;
}

export declare const siteRoutes: readonly SiteRoute[];
export declare const indexablePaths: readonly string[];
export declare const sitemapExclude: readonly string[];
export declare function matchRoute(pathname: string): SiteRoute | undefined;
export declare function isPublicPath(pathname: string): boolean;
