import get from 'lodash.get';
export type RealDoc<T = Record<string, any>> = T;
export type TranslateFunction = (translationKey: string) => string | undefined;

/**
 * Use translation hook provides an easy way to access localized data and provided fallback data
 * @param currentDoc The object structure you wish to localize
 * @param defaultDoc The fallback document of "current doc" if accessing current doc returns undefined or a falsy value
 * @returns A function that is used for transitioning values and an instance of the registered localization plugin
 *
 * Example:
 * ```ts
 * const t = useTranslation({heading: "this is a title"}, {heading: "fallback", "body": "this is a body"})
 *
 * t("heading") // returns "this is a title"
 * t("body") // returns  "this is a body"
 * ```
 */
export function useTranslation(
  currentDoc: RealDoc,
  defaultDoc: RealDoc
): TranslateFunction {
  const translate = (translationsKey: string) => {
    return get(currentDoc, translationsKey) || get(defaultDoc, translationsKey);
  };
  return translate;
}
