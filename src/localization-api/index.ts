const defaultList: Locale[] = [
  { language: 'en' },
  { language: 'fr' },
  { language: 'sp' },
];
const LOCALE_CACHE_KEY = 'locale-cache';

export interface CodeAndLabel {
  code: string;
  label: string;
}
export type Region = CodeAndLabel;
export type Language = CodeAndLabel;

export interface Locale {
  language?: string;
  region?: string;
  encoding?: string;
  modifiers?: string[];
}

export class LocalizationApi {
  public onSwitch() {
    return null;
  }
  public default: Locale = {
    language: 'en',
    // region: "CA",
    // encoding: "utf-8",
    // modifiers: ["example"],
  };
  public props: {
    locale: Locale;
  };
  public localeList: Locale[];
  constructor(localeList = defaultList) {
    this.props = {
      locale: this.getCachedData(LOCALE_CACHE_KEY) || this.default,
    };
    this.localeList = localeList;
  }
  public getFormateLocale(): string {
    return this.localeToString(this.locale);
  }
  set locale(locale: Locale) {
    this.props.locale = locale;
    this.setCachedData(LOCALE_CACHE_KEY, locale);
  }
  get locale(): Locale {
    return this.props.locale;
  }
  public localeToString(currentLocal: Locale): string {
    return `${currentLocal.language || ''}${
      currentLocal.region ? '_' + currentLocal.region : ''
    }${currentLocal.encoding ? '.' + currentLocal.encoding : ''}${
      currentLocal.modifiers ? '@' + currentLocal.modifiers.join('@') : ''
    }`;
  }
  getCachedData = (id: string): Locale | undefined => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const cache = JSON.parse(localStorage.getItem(id) || '{}');
    if (Object.keys(cache).length === 0) {
      return;
    }
    return cache;
  };
  setCachedData = (id: string, data: Record<string, any>) => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(id, JSON.stringify(data));
  };
}
