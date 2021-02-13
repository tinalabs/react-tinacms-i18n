// import { useState } from 'react';
const defaultLocale: Locale = {
  language: {
    code: 'en',
    label: 'English',
  },
  // region: { code: "ca", label: "Canada" },
  // encoding: "utf-8",
  // modifiers: ["example"],
};
const defaultList: LocaleList = [
  {
    language: {
      code: 'en',
      label: 'English',
    },
  },
  {
    language: {
      code: 'fr',
      label: 'French',
    },
  },
  { language: { code: 'sp', label: 'Spanish' } },
];
const defaultOptions: LocalizationApiOptions = {
  localeList: defaultList, 
  locale: defaultLocale, 
  imgMap: {}
}
const LOCALE_CACHE_KEY = 'locale-cache';

export interface CodeAndLabel {
  code: string;
  label: string;
}
export type Region = CodeAndLabel;
export type Language = CodeAndLabel;
export type LocaleList = Locale[];
export type ImgMap = Record<string, any>;
export interface Locale {
  language?: Language;
  region?: Region;
  encoding?: string;
  modifiers?: string[];
}
export interface LocalizationApiOptions {
  localeList: LocaleList;
  imgMap: ImgMap;
  locale: Locale;
}
/**
 * @deprecated
 * Preferred use case of API class is as I18nClient alias
 */
export class LocalizationApi {
  /**
   * TODO: determine wether or not this should go into the API
   * is a called when switching the locale
   * @returns  void
   */
  public onSwitch() {
    return;
  }
  // private setTest: any;

  /**
   * Default locale of localization api
   * @type Locale
   */
  public locale: Locale;
  /**
   * Locale list of localization api
   * @type LocaleList
   */
  public localeList: LocaleList;
  /**
   * Default imgMap
   * @type ImgMap
   */
  public imgMap: ImgMap
  /**
   * constructs the localization API and sets the current local from local storage, or default locale
   *
   * @param locale the default locale for the application, will default to current locale if set.
   * @param localeList the list of locales Available in the application
   * @param imgMap A object that maps the region to a path to the img scr
   */
  constructor(options: LocalizationApiOptions = defaultOptions) {
    const { locale, localeList, imgMap } = options
    
    this.locale = this.getCachedData(LOCALE_CACHE_KEY) || locale;
    this.localeList = localeList;
    this.imgMap = imgMap
  }

  /**
   * Gets formatted locale
   * @returns formatted locale in the form language[_region][.encoding][@modifier]
   */
  public getFormateLocale(): string {
    return this.localeToString(this.locale);
  }
  /**
   * Sets locale and stores it in locale storage
   */
  setLocale(locale: Locale): void {
    // this.setTest(locale);
    this.locale = locale;
    this.setCachedData(LOCALE_CACHE_KEY, locale);
  }
  /**
   * Gets locale from memory
   */
  getLocale(): Locale {
    return this.locale;
  }
  /**
   * converts a given locale to a formatted string
   * @param currentLocal the given locale
   * @returns the formatted string
   */
  public localeToString(currentLocal: Locale): string {
    return `${currentLocal.language?.code || ''}${
      currentLocal.region?.code ? '_' + currentLocal.region.code : ''
    }${currentLocal.encoding ? '.' + currentLocal.encoding : ''}${
      currentLocal.modifiers ? '@' + currentLocal.modifiers.join('@') : ''
    }`;
  }
  private getCachedData = (id: string): Locale | undefined => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      const cache = JSON.parse(localStorage.getItem(id) || '{}');
      if (Object.keys(cache).length === 0) {
        return;
      }
      return cache as Locale;
    } catch (e) {
      console.warn(e);
      console.warn(`Malformed localstorage with ID ${id}`);
      return;
    }
  };
  private setCachedData = (id: string, data: Locale) => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(id, JSON.stringify(data));
  };
}

export const I18nClient = LocalizationApi
