import React from 'react';
import { useCMS } from 'tinacms';
import NextLink from '../components/NextLink.js';

import Code from '../components/Code.js';
// import { useSetupI18 } from '@tinalabs/react-tinacms-localization';

export default function AddingTina() {
  const cms = useCMS();

  let code = `
  import { withI18n } from '@tinalabs/react-tinacms-localization';

  const AppWrapper = withI18n(App, {
    ApiOptions: {
      localeList: [
        { language: 'en', region: 'ca' },
        { language: 'fr', region: 'ca' },
        { language: 'en', region: 'us' },
        { language: 'sp', region: 'us' },
      ],
    },
  });
  export default () => {
    const cms = new TinaCMS({
      sidebar: {
        position: 'displace',
      },
      enabled: true,
      toolbar: true,
    });
    return (
      <TinaProvider cms={cms}>
        <AppWrapper />
      </TinaProvider>
    );
  };
 `;

  return (
    <>
      <p>First we need to set up the plugin</p>
      <p>
        We could put all the bits and pieces together ourself or we can use a
        helper function
      </p>
      <p>This helper function</p>
      <ol>
        <li>registers the localization api</li>
        <li>registers the locale picker toolbar plugin</li>
        <li>
          wraps out app in a provides that we can accesses with a useI18n hook
        </li>
      </ol>
      <p>
        Now you will have access to a locale selection dropdown in the toolbar
      </p>

      <Code
        readMoreLink="https://tinacms.org/docs/cms"
        readMoreText="Read the docs"
      >
        {code}
      </Code>
    </>
  );
}
