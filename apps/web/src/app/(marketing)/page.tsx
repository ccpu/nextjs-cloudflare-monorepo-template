import Link from 'next/link';
import siteConfig from '../../../site.config';
import { ButtonLink, FaqAccordion, homeFaq } from '../../components/marketing';
import { createPageMetadata } from '../../lib/page-metadata';

export const metadata = {
  ...createPageMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
  }),
  // The title is the brand itself, so skip the root `%s | Name` template.
  title: { absolute: siteConfig.name },
};

interface Feature {
  title: string;
  description: string;
}

interface Step {
  step: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: 'Next.js App Router',
    description:
      'Route groups keep marketing, app and admin areas separate, each with its own layout.',
  },
  {
    title: 'Cloudflare Workers',
    description:
      'Built with OpenNext and deployed to the edge with zero server configuration.',
  },
  {
    title: 'Turborepo Monorepo',
    description:
      'Shared UI, utils, ESLint, TypeScript and Vitest config packages across every app.',
  },
  {
    title: 'SEO Ready',
    description:
      'Sitemap, robots.txt, manifest and per-page Open Graph metadata out of the box.',
  },
];

const steps: Step[] = [
  {
    step: '1',
    title: 'Edit the pages',
    description: 'Start with src/app/(marketing)/page.tsx and save to see changes.',
  },
  {
    step: '2',
    title: 'Configure the site',
    description: 'Set the name, URL and theme in site.config.js.',
  },
  {
    step: '3',
    title: 'Connect Cloudflare',
    description: 'Add your Cloudflare API token and account ID.',
  },
  {
    step: '4',
    title: 'Deploy',
    description: 'Push to the main branch for automatic deployment.',
  },
];

export default function LandingPage() {
  return (
    <main>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/dom-no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="animate-fade-up mx-auto max-w-4xl text-center">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg sm:text-xl">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="#features" size="lg" className="w-[200px]">
              Get started
            </ButtonLink>
            <ButtonLink href="/about" variant="outline" size="lg" className="w-[200px]">
              Learn more
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8" id="features">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Ship
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              A production-ready starting point, so you can focus on your product.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="border-border/50 bg-card rounded-xl border p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="text-foreground text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article key={step.step} className="text-center">
                <div className="bg-primary text-primary-foreground mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                  {step.step}
                </div>
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-foreground text-center text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-center text-lg">
            Quick answers to common questions.{' '}
            <Link href="/faq" className="text-primary hover:underline">
              See all FAQs
            </Link>
          </p>
          <div className="mt-10">
            <FaqAccordion items={homeFaq} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-primary-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 mt-4 text-lg">
            Have a question or want to talk? We would love to hear from you.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink
              href="/contact"
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 min-w-[230px]"
            >
              Contact us
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
