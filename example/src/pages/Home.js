import React from 'react';

import Code from '../components/Code.js';

export default function Home() {
  let code = `return (
    <>
      <p>
        Hi! lets get started with learning how to add localization to a tinacms
        site.
      </p>
      <p>
        This guide assume you have a basic understanding of tina if you don't{' '}
        <a href="https://tinacms.org/docs">
          head over to our website and check them out!
        </a>
      </p>
    </>
  );`;

  return (
    <>
      <p>
        Hi! lets get started with learning how to add localization to a tinacms
        site.
      </p>
      <p>
        To get started you can open the sidebar (pencil icon at the bottom of
        the screen)
      </p>
      <p>
        Note: This guide assume you have a basic understanding of tina if you
        don't{' '}
        <a href="https://tinacms.org/docs">
          head over to our website check out our get started guide
        </a>
      </p>

      <Code>{code}</Code>
    </>
  );
}
