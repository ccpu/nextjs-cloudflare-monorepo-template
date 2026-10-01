import { indexablePaths, isPublicPath, matchRoute, sitemapExclude } from '../site-routes';

describe('matchRoute', () => {
  it('should match a route by its exact path', () => {
    expect(matchRoute('/about')?.path).toBe('/about');
  });

  it('should match nested paths by prefix', () => {
    expect(matchRoute('/blog/my-post')?.path).toBe('/blog');
  });

  it('should not let the root rule swallow other paths', () => {
    expect(matchRoute('/unknown')).toBeUndefined();
  });

  it('should not match a path that only shares a prefix string', () => {
    expect(matchRoute('/blogger')).toBeUndefined();
  });
});

describe('isPublicPath', () => {
  it('should treat classified public routes as public', () => {
    expect(isPublicPath('/')).toBe(true);
  });

  it('should treat unclassified routes as private', () => {
    expect(isPublicPath('/unknown')).toBe(false);
  });
});

describe('sitemap lists', () => {
  it('should list indexable routes', () => {
    expect(indexablePaths).toContain('/');
    expect(indexablePaths).toContain('/about');
  });

  it('should exclude non-page paths', () => {
    expect(sitemapExclude).toContain('/manifest.webmanifest');
  });
});
