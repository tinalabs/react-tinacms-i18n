import { useCMS } from 'tinacms';
import { LocalizationApi } from '../localization-api';
import { RealDoc, Translate, useTranslation } from './useTranslation';

export interface Docs<T> {
  currentDoc: RealDoc<T>;
  defaultDoc: RealDoc<T>;
}

export function useTranslations<
  S extends Record<string, any> = Record<string, any>
>(
  translations: { [key in keyof S]: Docs<any> }
): [{ [key in keyof S]: Translate }, LocalizationApi] {
  type Translations = {
    [key in keyof S]: Translate;
  };
  const cms = useCMS();
  const returnValue: Translations = {} as Translations;

  Object.keys(translations).forEach((key) => {
    const [t] = useTranslation(
      translations[key].currentDoc,
      translations[key].defaultDoc
    );
    returnValue[key as keyof S] = t;
  });

  return [returnValue, cms.api.localization];
}
