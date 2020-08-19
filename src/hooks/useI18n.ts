import React from 'react';
import { LocalizationApi } from '../localizationApi';

export const I18nContext = React.createContext<LocalizationApi | null>(null);

export function useI18n(): LocalizationApi {
  const i18n = React.useContext(I18nContext);

  if (!i18n) {
    throw new Error('Missing localization plugin');
  }
  // const [locale, setLocale] = useState(i18n.getFormateLocale());
  // i18n.onSwitch = () => {
  //   setLocale(i18n.getFormateLocale());
  // };

  return i18n;
}
