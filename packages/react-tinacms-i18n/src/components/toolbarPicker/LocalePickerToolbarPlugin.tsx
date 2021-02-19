import React, { useState, useRef, useCallback } from 'react';
import { I18nClient, getI18nStringFromLocale, Locale, getLabel } from '../../i18nClient';
import { useI18n } from '../../hooks';
import { ToolbarSelect, ToolbarSelectValue } from './ToolbarSelect';

export const LocaleSwitcher = () => {
  const { locale, locales, setLocale } = useI18n();
  const selectRef = useRef<HTMLElement>();
  const sortBy = locales.findIndex(locale => typeof locale.region === "string") > -1
    ? "region" : "region.label"
  const groupBy = locales.findIndex(locale => typeof locale.language === "string") > -1
    ? "language.label"
    : "language"
  const baseOptions: ToolbarSelectValue[] = locales.map(locale => ({
    label: getLabel(locale.region) || getLabel(locale.language) || getI18nStringFromLocale(locale),
    value: locale
  }));
  const [options, setOptions] = useState<ToolbarSelectValue[]>(baseOptions);

  // Set locale on select
  const onSelect = (value: Locale) => {
    console.log({value});
    setLocale(value);
  }

  // Update locales on filter
  const onFilter = useCallback((filter: string) => {
    if (filter.length > 0) {
      const needle = filter.toLowerCase();
      const filteredOptions = baseOptions.filter(option => {
        const haystack = getI18nStringFromLocale(option.value).toLowerCase();

        return haystack.includes(needle) ||
               option.label.toLowerCase().includes(needle);
      });

      return setOptions(filteredOptions);
    }   

    return setOptions(baseOptions);
  }, []);

  return (
    <ToolbarSelect
      ref={selectRef}
      options={options}
      selectedOption={{
        label: getLabel(locale.region) || getLabel(locale.language) || getI18nStringFromLocale(locale),
        value: locale
      }}
      sortBy={sortBy}
      groupBy={groupBy}
      onFilter={onFilter}
      onSelect={onSelect}
    />
  );
};

export const LocalePickerToolbarPlugin = {
  __type: 'toolbar:widget',
  name: 'locale-branch-switcher',
  weight: 1,
  component: LocaleSwitcher,
};

export const getLocalePickerToolbarPlugin = (i18n: I18nClient) => {
  return {
    __type: 'toolbar:widget',
    name: 'locale-branch-switcher',
    weight: 1,
    component: LocaleSwitcher,
    props: {
      i18n,
    },
  };
};
