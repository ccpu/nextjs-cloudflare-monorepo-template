import siteConfig from '../../../site.config';
import { Footer } from '../../components/marketing';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Navbar } from './Navbar';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const isThemeEnabled = siteConfig.theme?.enabled !== false;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      {isThemeEnabled && (
        <div className="fixed right-4 bottom-4 z-[90]">
          <ThemeToggle />
        </div>
      )}
    </>
  );
}
