import React from 'react';
import { useCMS } from 'tinacms';
import NextLink from '../components/NextLink.js';

import Code from '../components/Code.js';
// import { useSetupI18 } from '@tinalabs/react-tinacms-localization';

export default function AddingTina() {
  const cms = useCMS();
  console.log(cms);
  // useSetupI18({
  //   ApiOptions: {
  //     localeList: [
  //       { language: 'en', region: 'ca' },
  //       { language: 'fr', region: 'ca' },
  //       { language: 'en', region: 'us' },
  //       { language: 'sp', region: 'us' },
  //     ],
  //   },
  // });
  // cms.sidebar.isOpen = true;

  let code = `
  import { useSetupI18 } from '@tinalabs/react-tinacms-localization';

  const App = () => {
    useSetupI18({ ApiOptions: {} });
    //...
 `;

  return (
    <>
      <p>First we need to set up the plugin</p>
      <p>we can do it manually or use a built in helper hook that</p>
      <ol>
        <li>registers the localization api</li>
        <li>registers the locale picker toolbar plugin</li>
      </ol>

      <Code
        readMoreLink="https://tinacms.org/docs/cms"
        readMoreText="Read the docs"
      >
        {code}
      </Code>
    </>
  );
}
