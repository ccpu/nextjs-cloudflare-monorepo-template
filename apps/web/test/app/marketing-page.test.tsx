import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import siteConfig from '../../site.config';
import Page from '../../src/app/(marketing)/page';

describe('marketing home page', () => {
  it('should render the Page component without crashing', () => {
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
  });

  it('should render the hero and main sections', () => {
    render(<Page />);

    expect(
      screen.getByRole('heading', { level: 1, name: siteConfig.name }),
    ).toBeDefined();
    expect(screen.getByText('Everything You Need to Ship')).toBeDefined();
    expect(screen.getByText('How It Works')).toBeDefined();
    expect(screen.getByText('Frequently Asked Questions')).toBeDefined();
    expect(screen.getByRole('link', { name: 'See all FAQs' })).toBeDefined();
  });
});
