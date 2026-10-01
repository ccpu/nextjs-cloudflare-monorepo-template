export interface AppConfig {
  isDev: boolean;
  name: string;
  description: string;
  /** Search and store keywords describing the product. */
  keywords: string[];
  /** BCP 47 language tag, e.g. `en-US`. */
  locale: string;
  /** Origin with protocol and no trailing slash, e.g. `https://example.com`. */
  siteUrl: string;
  /** Host without protocol, e.g. `example.com` or `localhost:3000`. */
  siteBaseUrl: string;
  /** Absolute URL of the default social preview image. */
  ogImage: string;
  author: {
    name: string;
    email: string;
    url: string;
  };
  theme?: {
    enabled?: boolean;
    defaultTheme?: 'light' | 'dark' | 'system';
  };
}

declare const appConfig: AppConfig;
export default appConfig;
export { appConfig };
