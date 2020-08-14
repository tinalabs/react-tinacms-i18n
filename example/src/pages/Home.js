import React from 'react';
import { useCMS } from 'tinacms';
import NextLink from '../components/NextLink';

import Code from '../components/Code.js';

export default function Home() {
  const cms = useCMS();

  // cms.sidebar.hidden = true;

  let code = `export default function Home() {                
return (
  <>
    <p>Hi! This is a simple page created with React.</p>
    <p>Wouldn't it be neat if we could edit pages like this in real time?</p>
  </>
)};`;

  return (
    <>
      <h3>
        Hi! lets get started with learning how to add localization to a tinacms
        site.
      </h3>
      <p>
        This guide assume you have a basic undertanding of tina if you don't{' '}
        <a href="https://tinacms.org/docs">
          head over to our website and check them out!
        </a>
      </p>

      <Code>{code}</Code>
    </>
  );
}
