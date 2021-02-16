import React from 'react';
import { I18nClient } from '../localizationApi';

export const I18nContext = React.createContext<I18nClient | null>(null);

export function useI18n(): I18nClient {
  const i18n = React.useContext(I18nContext);

  if (!i18n) {
    throw new Error('Missing localization plugin');
  }

  return i18n;
}
