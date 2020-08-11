const defaultList: Locale[] = [
  { language: 'en' },
  { language: 'fr' },
  { language: 'sp' },
];
const LOCALE_CACHE_KEY = 'locale-cache';

// TODO:  use Region and Language
// export interface CodeAndLabel {
//   code: string;
//   label: string;
// }
// export type Region = CodeAndLabel;
// export type Language = CodeAndLabel;

export interface Locale {
  language?: string;
  region?: string;
  encoding?: string;
  modifiers?: string[];
}

export class LocalizationApi {
  /**
   * TODO: determine wether or not this should go into the API
   * is a called when switching the locale
   * @returns  null
   */
  public onSwitch() {
    return null;
  }
  public default: Locale = {
    language: 'en',
    // region: "CA",
    // encoding: "utf-8",
    // modifiers: ["example"],
  };
  private props: {
    locale: Locale;
  };
  /**
   * Locale list of localization api
   * @type Locale[]
   */
  public localeList: Locale[];
  /**
   * constructs the localization API and sets the current local from local storage
   *
   * @param localeList the list of locales Available in the application
   * @param imgMap A object that maps the region to a path to the img scr
   */
  constructor(
    localeList = defaultList,
    public imgMap: Record<string, any> = {}
  ) {
    this.props = {
      locale: this.getCachedData(LOCALE_CACHE_KEY) || this.default,
    };
    this.localeList = localeList;
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
  set locale(locale: Locale) {
    this.props.locale = locale;
    this.setCachedData(LOCALE_CACHE_KEY, locale);
  }
  /**
   * Gets locale from memory
   */
  get locale(): Locale {
    return this.props.locale;
  }
  /**
   * converts a given locale to a formatted string
   * @param currentLocal the given locale
   * @returns the formatted string
   */
  public localeToString(currentLocal: Locale): string {
    return `${currentLocal.language || ''}${
      currentLocal.region ? '_' + currentLocal.region : ''
    }${currentLocal.encoding ? '.' + currentLocal.encoding : ''}${
      currentLocal.modifiers ? '@' + currentLocal.modifiers.join('@') : ''
    }`;
  }
  private getCachedData = (id: string): Locale | undefined => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const cache = JSON.parse(localStorage.getItem(id) || '{}');
    if (Object.keys(cache).length === 0) {
      return;
    }
    return cache;
  };
  private setCachedData = (id: string, data: Record<string, any>) => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(id, JSON.stringify(data));
  };
}
