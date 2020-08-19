import React, { useState } from 'react';
import { LocalizationApi, Locale } from './LocalizationAPI';

export class ReactLocalizationAPI extends LocalizationApi {
  private stateSetLocale: React.Dispatch<React.SetStateAction<Locale>>;
  constructor(...args: any) {
    super(...args);
    const [, stateSetLocale] = useState(this.locale);
    this.stateSetLocale = stateSetLocale;
  }
  setLocale(locale: Locale): Locale {
    console.log('set locale from super class is being called');
    super.setLocale(locale);
    this.stateSetLocale(locale);
    return this.locale;
  }
}
