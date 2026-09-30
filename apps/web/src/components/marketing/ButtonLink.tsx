import type { ComponentProps } from 'react';
import { cn } from '@internal/utils';
import Link from 'next/link';

type ButtonLinkVariant = 'default' | 'outline' | 'ghost';
type ButtonLinkSize = 'sm' | 'md' | 'lg';

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
}

const variantClasses: Record<ButtonLinkVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border-border bg-background hover:bg-accent border',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

const sizeClasses: Record<ButtonLinkSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-8 text-base',
};

/** A `next/link` styled as a button, for navigation CTAs. */
export function ButtonLink({
  variant = 'default',
  size = 'md',
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'focus-visible:ring-ring inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
