/* eslint-disable react/display-name */
import React from 'react';
import { useEffect } from 'react';
import { useCMS } from 'tinacms';
import {
  I18nClient,
  i18nClientOptions
} from '../i18nClient';
import { LocalePickerToolbarPlugin, I18nProvider } from '../components';

export const withI18n = (Component: any, options: i18nClientOptions) => {
  return (props: any) => {
    const cms = useCMS();
    const i18n = new I18nClient(options);

    cms.registerApi('i18n', i18n);

    return (
      <I18nProvider i18n={i18n}>
        <Wrapper>
          <Component {...props} />
        </Wrapper>
      </I18nProvider>
    );
  };
};

const Wrapper = ({children}: any) => {
  const cms = useCMS();

  useEffect(() => {
    cms.plugins.add(LocalePickerToolbarPlugin);

    () => {
      cms.plugins.remove(LocalePickerToolbarPlugin);
    }
  }, []);

  return children;
};
