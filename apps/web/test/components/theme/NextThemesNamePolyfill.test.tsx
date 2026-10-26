import { render } from '@testing-library/react';
import { ServerInsertedHTMLContext } from 'next/navigation';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { NextThemesNamePolyfill } from '../../../src/components/theme/NextThemesNamePolyfill';

describe('next themes name polyfill', () => {
  it('should insert the polyfill once during server streaming', () => {
    const callbacks: Array<() => React.ReactNode> = [];
    const markup = renderToString(
      <ServerInsertedHTMLContext value={(callback) => callbacks.push(callback)}>
        <NextThemesNamePolyfill />
      </ServerInsertedHTMLContext>,
    );

    expect(markup).toBe('');
    expect(callbacks).toHaveLength(1);
    const insertedMarkup = renderToStaticMarkup(<>{callbacks[0]?.()}</>);
    expect(insertedMarkup).toContain('<script id="next-themes-name-polyfill">');
    expect(insertedMarkup).toContain('window.__name = function');
    expect(callbacks[0]?.()).toBeNull();
  });

  it('should render no script on client mounts or rerenders', () => {
    const { container, rerender } = render(<NextThemesNamePolyfill />);
    expect(container.innerHTML).toBe('');

    rerender(<NextThemesNamePolyfill />);
    expect(container.innerHTML).toBe('');
  });
});
