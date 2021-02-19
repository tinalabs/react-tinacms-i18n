import { usePlugin } from '@tinacms/react-core';
import React from 'react';
import { LocalePickerToolbarPlugin } from 'react-tinacms-i18n';
import { Layout } from '../components/Layout';

export default function WhatsNext() {
  usePlugin(LocalePickerToolbarPlugin);

  return (
    <Layout prevLink="/using-prompts">
      <h1 className="title is-3">Next Steps</h1>
      <p>i18n is made easy with tina!</p>
      <h3 className="title is-5">What can I do next?</h3>
      <ul>
        <li>
          <a href="https://tinalabs.github.io/react-tinacms-i18n/docs/">
            Look at our the docs for react-tinacms-i18n for more specific
            details
          </a>
        </li>
        <li>
          <a href="http://tinacms.org">
            Check out tinacms and all the of cool stuff you can do with it
          </a>
        </li>
      </ul>
    </Layout>
  );
}
