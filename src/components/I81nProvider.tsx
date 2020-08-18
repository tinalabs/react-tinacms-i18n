import { useCMS } from 'tinacms';
import React from 'react';
import { I18nContext } from '../hooks/useI18n';
import { LocalizationApi } from '../localizationApi';

export const I18nProvider: React.FC<{ i18n?: LocalizationApi }> = ({
  children,
  i18n,
}) => {
  const cms = useCMS();
  const i18nInstance = i18n || cms.api.localization;

  if (!i18nInstance) {
    throw new Error('Localization plugin is not defined');
  }

  return (
    <I18nContext.Provider value={i18nInstance}>{children}</I18nContext.Provider>
  );
};
