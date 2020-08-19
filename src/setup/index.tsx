/* eslint-disable react/display-name */
import React from 'react';
import {
  LocalizationApiOptions,
  ReactLocalizationAPI,
} from '../localizationApi';
import { useCMS } from 'tinacms';
import { useEffect } from 'react';
import { LocalePickerToolbarPlugin, I18nProvider } from '../components';
interface SetupProps {
  ApiOptions: LocalizationApiOptions;
}

export const withI18n = (Component: any, options: SetupProps) => {
  return (props: any) => {
    const cms = useCMS();
    const i18n = new ReactLocalizationAPI(
      options.ApiOptions.localeList,
      options.ApiOptions.imgMap
    );
    cms.registerApi('localization', i18n);
    const Wrapper = () => {
      useEffect(() => {
        cms.plugins.add(LocalePickerToolbarPlugin);
      }, []);
      return <Component {...props} />;
    };
    return (
      <I18nProvider i18n={i18n}>
        <Wrapper />
      </I18nProvider>
    );
  };
};
