import React, { useState, useRef, useCallback } from 'react';
import { I18nClient, getI18nStringFromLocale, Locale, getLabel } from '../../i18nClient';
import { useI18n } from '../../hooks';
import { ToolbarSelect, ToolbarSelectValue } from './ToolbarSelect';
import { SelectOptionBadge } from './Select/Select';

export const LocaleSwitcher = () => {
  const { locale, locales, setLocale, sortBy } = useI18n();
  const selectRef = useRef<HTMLElement>();
  const sortKeys = sortBy === "region"
    ? ["region.label", "region.code", "region"]
    : ["language.label", "language.code", "language"];
  const baseOptions: ToolbarSelectValue[] = locales.map(locale => ({
    label: getLabel(locale.language) || getI18nStringFromLocale(locale),
    value: locale
  }));
  const [options, setOptions] = useState<ToolbarSelectValue[]>(baseOptions);

  // Set locale on select
  const onSelect = (value: Locale) => {
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
      sortBy={sortKeys}
      groupBy={sortKeys}
      filter={true}
      onFilter={onFilter}
      onSelect={onSelect}
      labels={{
        active: locale.region ? `${getLabel(locale.language)} - ${getLabel(locale.region)}` : getLabel(locale.language),
        single: "Locale",
        plural: "locales"
      }}
      icons={(value) => (
        <SelectOptionBadge>
          {getI18nStringFromLocale(value)}
        </SelectOptionBadge>
      )}
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
