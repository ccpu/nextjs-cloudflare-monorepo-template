import Link from 'next/link';
import siteConfig from '../../../../site.config';
import { ButtonLink, FaqAccordion, faqCategories } from '../../../components/marketing';
import { createPageMetadata } from '../../../lib/page-metadata';

export const metadata = createPageMetadata({
  title: 'Frequently Asked Questions',
  description: `Find answers to common questions about ${siteConfig.name}.`,
});

export default function FaqPage() {
  const allFaqItems = faqCategories.flatMap((category) =>
    category.items.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  );

  return (
    <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/dom-no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allFaqItems,
          }),
        }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Can&apos;t find what you are looking for?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>

        {faqCategories.map((category) => (
          <section key={category.category} className="mt-12">
            <h2 className="text-foreground border-border mb-4 border-b pb-2 text-xl font-bold">
              {category.category}
            </h2>
            <FaqAccordion items={category.items} />
          </section>
        ))}

        <div className="border-border/50 bg-muted/30 mt-16 rounded-xl border p-8 text-center">
          <h2 className="text-foreground text-xl font-bold">Still Have Questions?</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Reach out and we will get back to you as soon as possible.
          </p>
          <ButtonLink href="/contact" size="lg" className="mt-6">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
