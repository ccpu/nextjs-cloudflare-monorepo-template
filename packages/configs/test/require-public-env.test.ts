import { assertPublicEnv, getMissingPublicEnv } from '../require-public-env';

const names = ['API_URL', 'API_KEY'];

describe('getMissingPublicEnv', () => {
  it('should report absent and blank variables in declaration order', () => {
    expect(getMissingPublicEnv({ API_KEY: '  ' }, names)).toEqual(['API_URL', 'API_KEY']);
  });

  it('should report nothing when every variable is set', () => {
    expect(getMissingPublicEnv({ API_URL: 'u', API_KEY: 'k' }, names)).toEqual([]);
  });
});

describe('assertPublicEnv', () => {
  it('should throw naming the missing variables and the context', () => {
    expect(() =>
      assertPublicEnv({ API_URL: 'u' }, 'apps/web (next build)', names),
    ).toThrow('apps/web (next build): missing required environment variable: API_KEY.');
  });

  it('should pass when every variable is set', () => {
    expect(() =>
      assertPublicEnv({ API_URL: 'u', API_KEY: 'k' }, 'apps/web', names),
    ).not.toThrow();
  });
});
