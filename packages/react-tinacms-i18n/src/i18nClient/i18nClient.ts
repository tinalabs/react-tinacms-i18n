import { ReactNode } from "react";

export interface LocaleDefinition {
  code: string;
  label: string;
  icon?: ReactNode;
}

export type Language<Language = LocaleDefinition | string> = Language;
export type Region<Region = LocaleDefinition | string> = Region;
export type LocaleList = Locale[];
export type ImgMap = Record<string, any>;

export interface Locale {
  language?: Language;
  region?: Region;
  encoding?: string;
  modifiers?: string[];
}

export interface i18nClientOptions {
  locales: LocaleList;
  /** @deprecated Will be removed in 1.0.0. Please use locales */
  localeList?: LocaleList;
  locale?: Locale;
  /* @deprecated No longer supported in 0.3.0. Please use the icon option of locales */
  imgMap?: ImgMap
}

/**
 * @deprecated Please use i18nClientOptions
 */
export type LocalizationApiOptions = i18nClientOptions;

const LOCALE_CACHE_KEY = 'locale-cache';
const DEFAULT_LOCALE = {
  language: {
    code: 'en',
    label: 'English',
  },
}
const DEFAULT_LOCALES: LocaleList = [
  DEFAULT_LOCALE,
  {
    language: {
      code: 'fr',
      label: 'French',
    }
  }
];

export class I18nClient {
  /**
   * constructs the i18n API and sets the current local from local storage, or default locale
   *
   * @param locale the default locale for the application, will default to current locale if set.
   * @param localeList the list of locales Available in the application
   * @param imgMap A object that maps the region to a path to the img scr
   */
  constructor({locale = DEFAULT_LOCALE, locales = DEFAULT_LOCALES, localeList}: i18nClientOptions) {
    this.locale = this.getCachedData(LOCALE_CACHE_KEY) ?? locale;
    this.locales = locales || localeList;
  }

  /**
   * Default locale of localization api
   * @type Locale
   */
  public locale: Locale;

  /**
   * Locale list of localization api
   * @type LocaleList
   */
  public locales: LocaleList;

  /**
   * Default imgMap
   * @type ImgMap
   * @deprecated No longer supported in 0.3.0
   */
  public imgMap!: ImgMap;

  /**
   * Gets formatted locale
   * @returns formatted locale for l10n or i18n
   */
  public getLocaleString(l10n: boolean = false): string {
    if (l10n) {
      return getl10nStringFromLocale(this.locale);
    }

    return getI18nStringFromLocale(this.locale);
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
   * @deprecated Please use getLocaleString
   */
  public localeToString(currentLocal: Locale): string {
    return getI18nStringFromLocale(currentLocal);
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

/**
 * @deprecated
 * Preferred use case of API class is as I18nClient alias
 */
export const LocalizationApi = I18nClient;

/**
 * converts a given locale to a formatted i18n string
 * @param locale the given locale
 * @returns the formatted string
 */
export function getI18nStringFromLocale(locale: Locale): string {
  const language = getCode(locale.language);
  const region = getCode(locale.region);
  let localeString = "";

  localeString += language;

  if (region) localeString += `_${region.toString().toUpperCase()}`;
  if (locale.encoding) localeString += `.${locale.encoding}`
  if (locale.modifiers && locale.modifiers.length > 0) localeString += `@${locale.modifiers.join("@")}`;
    
  return localeString;
}

/**
 * converts a given locale to a formatted i10n string
 * @param locale the given locale
 * @returns the formatted string
 */
export function getl10nStringFromLocale(locale: Locale): string {
  const language = getCode(locale.language);
  const region = getCode(locale.region);
  let localeString = "";

  localeString += language;

  if (region) localeString += `-${region.toString().toUpperCase()}`;
    
  return localeString;
}

/**
 * Gets the code from a language or region definition, irregardless of shape
 * @param languageOrRegion 
 */
export function getCode(languageOrRegion: Language | Region | undefined): string | undefined {
  if (typeof languageOrRegion === "object") {
    return languageOrRegion.code;
  }

  return languageOrRegion;
}

/**
 * Gets the label from a language or region definition, irregardless of shape
 * @param languageOrRegion 
 */
export function getLabel(languageOrRegion: Language | Region | undefined): string | undefined {
  if (typeof languageOrRegion === "object") {
    return languageOrRegion.label;
  }

  return languageOrRegion;
}