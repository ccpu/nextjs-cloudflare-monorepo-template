'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useRef } from 'react';

/** Emit the theme polyfill before streamed content, without rendering a client script. */
export function NextThemesNamePolyfill() {
  const insertedRef = useRef(false);

  useServerInsertedHTML(() => {
    if (insertedRef.current) return null;
    insertedRef.current = true;

    return (
      <script
        id="next-themes-name-polyfill"
        // eslint-disable-next-line react/dom-no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{
          // https://github.com/pacocoursey/next-themes/issues/349
          __html: `
            if (typeof __name === 'undefined') {
              window.__name = function(fn, name) {
                if (fn && typeof fn === 'function') {
                  Object.defineProperty(fn, 'name', { value: name, configurable: true });
                }
                return fn;
              };
            }
          `,
        }}
      />
    );
  });

  return null;
}
