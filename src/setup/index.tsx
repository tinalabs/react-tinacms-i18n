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

const Wrapper: React.FC = (props) => {
  const cms = useCMS();
  useEffect(() => {
    cms.plugins.add(LocalePickerToolbarPlugin);
  }, []);
  return <I18nProvider>{props.children}</I18nProvider>;
};

export const withI18n = (component: any, options: SetupProps): JSX.Element => {
  const cms = useCMS();
  cms.registerApi(
    'localization',
    new ReactLocalizationAPI(
      options.ApiOptions.localeList,
      options.ApiOptions.imgMap
    )
  );
  return (
    <I18nProvider>
      <Wrapper>{component}</Wrapper>
    </I18nProvider>
  );
};
