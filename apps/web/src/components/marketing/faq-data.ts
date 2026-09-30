import siteConfig from '../../../site.config';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export const gettingStartedFaq: FaqItem[] = [
  {
    question: `What is ${siteConfig.name}?`,
    answer: siteConfig.description,
  },
  {
    question: 'How do I get started?',
    answer:
      'Clone the repository, install dependencies with pnpm, and run `pnpm dev`. Edit the pages under `src/app/(marketing)` to make the site your own.',
  },
];

export const deploymentFaq: FaqItem[] = [
  {
    question: 'Where does it deploy?',
    answer:
      'The app is built with OpenNext and deployed to Cloudflare Workers. Set your Cloudflare API token and account ID, then push to main.',
  },
  {
    question: 'Do I need a custom domain?',
    answer:
      'Yes, replace the placeholder route in wrangler.jsonc, or remove it to deploy to your workers.dev subdomain.',
  },
];

/** Shown on the home page. Keep it short and link to the full FAQ. */
export const homeFaq: FaqItem[] = [...gettingStartedFaq, deploymentFaq[0]!];

export const faqCategories: FaqCategory[] = [
  { category: 'Getting Started', items: gettingStartedFaq },
  { category: 'Deployment', items: deploymentFaq },
];
