import React from 'react';
import { Layout } from '../components/Layout.js';

export default function AddingTina() {
  let code = `
  import { withI18n } from '@tinalabs/react-tinacms-i18n';

  const AppWrapper = withI18n(App, {
    ApiOptions: {
      localeList: [
        { language: { code: 'en', label: 'English' }, region: { code: 'CA', label: 'Canada' } },
        { language: { code: 'fr', label: 'French' }, region: { code: 'CA', label: 'Canada' } },
        { language: { code: 'en', label: 'English' }, region: { code: 'US', label: 'United States' } },
        { language: { code: 'sp', label: 'Spanish' }, region: { code: 'US', label: 'United States' } },
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
    <Layout code={code} prevLink="/" nextLink="/translations">
      <React.Fragment>
        <h1 className="title is-2">Register the API</h1>
        <p>First we need to set up the plugin</p>
        <p>
          You could put all the bits and pieces together ourself or we can use a
          helper function.
        </p>
        <p>This helper function:</p>
        <ol>
          <li>registers the localization api</li>
          <li>registers the locale picker toolbar plugin</li>
          <li>
            wraps out app in a provides that we can accesses with a useI18n hook
          </li>
        </ol>
        <p>
          Now you will have access to a locale selection dropdown in the
          toolbar. (see it in the toolbar at the top of the screen?)
        </p>

        <p>
          <strong>Note:</strong> that that all of of our pages are inside of the
          App component
        </p>
      </React.Fragment>
    </Layout>
  );
}
