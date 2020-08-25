import React from 'react';

import Code from '../components/Code.js';

export default function Home() {
  let code = `  return (
    <>
      <h1 className="title is-1">Welcome!</h1>
      <p>
        Hi! lets get started with learning how to add localization to a tinacms
        site.
      </p>
      <p>
        To get started you can open the sidebar (pencil icon at the bottom of
        the screen)
      </p>
      <p>
        <strong>Note: </strong>This guide assume you have a basic understanding
        of Tina
        <div>
          if you don't{' '}
          <a href="https://tinacms.org/docs">
            {' '}
            head over to our website check out our get started guide
          </a>
        </div>
      </p>

      <Code>{code}</Code>
    </>
  );`;

  return (
    <>
      <h1 className="title is-1">Welcome!</h1>
      <p>
        Hi! lets get started with learning how to add localization to a tinacms
        site.
      </p>
      <p>
        To get started you can open the sidebar (pencil icon at the bottom of
        the screen)
      </p>
      <p>
        <strong>Note: </strong>This guide assume you have a basic understanding
        of Tina
        <div>
          if you don't{' '}
          <a href="https://tinacms.org/docs">
            {' '}
            head over to our website check out our get started guide
          </a>
        </div>
      </p>

      <Code>{code}</Code>
    </>
  );
}
