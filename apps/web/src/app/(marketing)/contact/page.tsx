import Link from 'next/link';
import siteConfig from '../../../../site.config';
import { createPageMetadata } from '../../../lib/page-metadata';

export const metadata = createPageMetadata({
  title: 'Contact Us',
  description: `Get in touch with the ${siteConfig.name} team.`,
});

const contactEmail = siteConfig.author.email;

export default function ContactPage() {
  return (
    <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
          Contact Us
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Have a question or found a bug? Email us directly at{' '}
          <a href={`mailto:${contactEmail}`} className="text-primary underline">
            {contactEmail}
          </a>
          .
        </p>

        <a
          href={`mailto:${contactEmail}`}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring mt-10 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          Send Email
        </a>

        <p className="text-muted-foreground mt-8 text-sm">
          You can also check our{' '}
          <Link href="/faq" className="text-primary hover:underline">
            FAQ
          </Link>{' '}
          for quick answers.
        </p>
      </div>
    </main>
  );
}
