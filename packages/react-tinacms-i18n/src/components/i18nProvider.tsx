import React, { useState } from 'react';
import { I18nContext } from '../hooks/useI18n';
import { I18nClient, Locale } from '../i18nClient';

export const I18nProvider: React.FC<{ i18n: I18nClient }> = ({
  i18n,
  children,
}) => {
  const [locale, setLocale] = useState<Locale>(i18n.locale);
  const [defaultLocale] = useState<Locale>(i18n.locale);
  const context = {
    locale,
    defaultLocale,
    setLocale,
    locales: i18n.locales,
    getLocaleString: i18n.getLocaleString.bind(i18n)
  }

  return (
    <I18nContext.Provider value={context}>{children}</I18nContext.Provider>
  );
};

export const i18nProvider = I18nProvider;
