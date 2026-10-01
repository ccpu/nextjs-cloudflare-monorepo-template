import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { matchRoute } from '@internal/configs/site-routes';
import { analyzeAppRoutes } from '@pixpilot/next-test-utils';
import { describe, expect, it } from 'vitest';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/app');

describe('site route manifest', () => {
  const { routes, unclassifiedRoutes } = analyzeAppRoutes({ appDir, matchRoute });

  it('should find the app routes it is asserting against', () => {
    // Guards the test itself: a broken scan would otherwise pass silently.
    expect(routes).toContain('/dashboard');
    expect(routes).toContain('/privacy');
    expect(routes.length).toBeGreaterThan(20);
  });

  it('should classify every route in the app', () => {
    // A route with no entry is treated as private and non-indexable. That is
    // the safe default, but it is a default nobody chose, so say so here
    // rather than letting a new page quietly inherit it.
    expect(unclassifiedRoutes).toEqual([]);
  });
});
