import { appConfig } from '@internal/configs';
import Link from 'next/link';

// Resolved when the module loads, which is build time for this static footer.
const currentYear = new Date().getFullYear();

const footerLinks = {
  Product: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
  ],
  Support: [
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact Us' },
  ],
};

export function Footer() {
  return (
    <footer className="border-border/50 bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="text-foreground text-lg font-bold">
              {appConfig.name}
            </Link>
            <p className="text-muted-foreground mt-3 max-w-sm text-sm">
              {appConfig.description}
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-foreground mb-3 text-sm font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border/50 mt-10 border-t pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} {appConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
