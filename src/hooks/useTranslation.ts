import { LocalizationApi } from '../../src';
import { useCMS } from 'tinacms';
import get from 'lodash.get';
export type RealDoc<T = { [key: string]: any }> = T;
export type Translate = (translationKey: string) => string | undefined;
export function useTranslation(
  currentDoc: RealDoc,
  defaultDoc: RealDoc
): [Translate, LocalizationApi] {
  const cms = useCMS();
  const translate = (translationsKey: string) => {
    return get(currentDoc, translationsKey) || get(defaultDoc, translationsKey);
  };
  return [translate, cms.api.localization];
}
