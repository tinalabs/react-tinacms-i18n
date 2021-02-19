import React, { useState, ReactNode } from 'react';
import { I18nContext } from '../hooks/useI18n';
import { I18nClient, Locale } from '../i18nClient';

export interface I18nProviderProps {
  i18n: I18nClient,
  sortBy?: "language" | "region",
  children?: ReactNode | ReactNode[]
}

export const I18nProvider = ({
  i18n,
  sortBy = "region",
  children,
}: I18nProviderProps) => {
  const [locale, setLocale] = useState<Locale>(i18n.locale);
  const [defaultLocale] = useState<Locale>(i18n.locale);
  const context = {
    locale,
    defaultLocale,
    setLocale,
    sortBy,
    locales: i18n.locales,
    getLocaleString: i18n.getLocaleString.bind(i18n)
  }

  return (
    <I18nContext.Provider value={context}>{children}</I18nContext.Provider>
  );
};

export const i18nProvider = I18nProvider;
