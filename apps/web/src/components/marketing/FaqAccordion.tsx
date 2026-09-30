'use client';

import type { FaqItem } from './faq-data';
import { cn } from '@internal/utils';

import { useState } from 'react';

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn('divide-border divide-y', className)}>
      {items.map((item, index) => (
        <div key={item.question} className="py-4">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="text-foreground flex w-full items-center justify-between text-left text-base font-medium"
            aria-expanded={openIndex === index}
          >
            <span>{item.question}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={cn(
                'text-muted-foreground ml-4 shrink-0 transition-transform duration-200',
                openIndex === index && 'rotate-180',
              )}
              aria-hidden="true"
            >
              <path d="M5 7l5 5 5-5" />
            </svg>
          </button>
          {openIndex === index && (
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
