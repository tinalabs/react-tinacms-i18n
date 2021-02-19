import React from 'react';
import { Locale } from '../i18nClient';

export interface I18nContextProps {
  locale: Locale,
  locales: Locale[],
  defaultLocale: Locale,
  sortBy: string,
  getLocaleString: () => string,
  setLocale: (locale: Locale) => void
}

export const I18nContext = React.createContext<I18nContextProps | null>(null);

export function useI18n(): I18nContextProps {
  const i18n = React.useContext(I18nContext);

  if (!i18n) {
    throw new Error('Missing i18n plugin');
  }

  return i18n;
}
