// @ts-check

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://example.com', // Update this to your actual domain
  generateRobotsTxt: true, // Generate robots.txt since we removed the native one
  exclude: ['/admin/*', '/private/*'],
  generateIndexSitemap: false,
  outDir: './public', // Ensure output goes to public directory
  transform: async (config, path) => ({
    loc: path,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),
  additionalPaths: async (_config) => [],
};
