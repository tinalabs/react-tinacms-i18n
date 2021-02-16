import React from 'react';
import { I18nContext } from '../hooks/useI18n';
import { I18nClient } from '../localizationApi';

export const I18nProvider: React.FC<{ i18n: I18nClient }> = ({
  children,
  i18n,
}) => {
  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
};
