/* eslint-disable no-restricted-properties */
// @ts-check

const process = require('node:process');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL, // Use environment variable for domain
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
