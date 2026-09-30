import Link from 'next/link';
import siteConfig from '../../../../site.config';
import { ButtonLink } from '../../../components/marketing';
import { createPageMetadata } from '../../../lib/page-metadata';

export const metadata = createPageMetadata({
  title: `About ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name}, our mission and what we stand for.`,
});

const values = [
  {
    title: 'Simplicity',
    description: 'Tools should make your life easier, not harder.',
  },
  {
    title: 'Transparency',
    description: 'No hidden fees, no surprises. What you see is what you get.',
  },
];

export default function AboutPage() {
  return (
    <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
          About {siteConfig.name}
        </h1>
        <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
          {siteConfig.description}
        </p>

        <section className="mt-12">
          <h2 className="text-foreground text-2xl font-bold">Our Values</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="border-border/50 bg-card rounded-lg border p-6"
              >
                <h3 className="text-foreground text-lg font-semibold">{value.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-foreground text-2xl font-bold">Get In Touch</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Have a question or suggestion?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Visit our contact page
            </Link>
            .
          </p>
        </section>

        <div className="border-border/50 bg-muted/30 mt-16 rounded-xl border p-8 text-center">
          <h2 className="text-foreground text-2xl font-bold">
            Ready to Try {siteConfig.name}?
          </h2>
          <ButtonLink href="/" size="lg" className="mt-6">
            Get started
          </ButtonLink>
        </div>
      </article>
    </main>
  );
}
