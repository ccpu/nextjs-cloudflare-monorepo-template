// @ts-check

const { appConfig } = require('@internal/configs');
const { indexablePaths, sitemapExclude } = require('@internal/configs/site-routes');

/*
 * The sitemap is driven by the shared route manifest rather than by
 * next-sitemap's static scan alone. The scan only sees prerendered pages, so
 * server-rendered ones would go missing and private ones would leak in.
 * See `@internal/configs/site-routes`.
 */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: appConfig.siteUrl,
  generateRobotsTxt: true, // Generate robots.txt since we removed the native one
  exclude: [...sitemapExclude],
  generateIndexSitemap: false,
  outDir: './public', // Ensure output goes to public directory
  transform: async (config, path) => ({
    loc: path,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),
  /*
   * next-sitemap merges an addition onto a scanned entry with the same `loc`
   * rather than duplicating it, so listing every indexable path is safe.
   */
  additionalPaths: async (config) =>
    Promise.all(indexablePaths.map(async (path) => config.transform(config, path))),
};
