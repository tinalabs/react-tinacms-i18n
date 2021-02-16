import React, { useState, useRef } from 'react';
import { ChevronDownIcon } from '@tinacms/icons';
import { Dismissible } from 'react-dismissible';
import { LoadingDots } from '@tinacms/react-forms';
import { Locale, I18nClient, localeToString } from '../../localizationApi';
import { LeftArrowIcon } from '@tinacms/icons';
import {
  PanelHeader,
  SelectWrapper,
  SelectBox,
  SelectLabel,
  SelectCurrent,
  SelectDropdown,
  DropdownHeader,
  SelectFilter,
  SelectLoadingState,
  SelectOption,
  SelectEmptyState,
  SelectList,
} from './toolbarStyles';
import { Option } from './Option';
import { useI18n } from '../../hooks/useI18n';
// import { useI18n } from '../hooks/useI18n';

export const LocaleSwitcher = () => {
  const locale: I18nClient = useI18n();
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = React.useState('');
  const selectListRef = useRef<HTMLElement>();
  const originalFilterOptions = locale.localeList.filter((option) => {
    return locale.localeToString(option).includes(filterValue);
  });
  const [filteredOptions, setFilteredOptions] = React.useState(
    originalFilterOptions
  );
  const [showOptions, setShowOptions] = React.useState(true);

  React.useEffect(() => {
    const currentList = locale.localeList.filter((option) => {
      return localeToString(option).includes(filterValue);
    });
    setFilteredOptions(currentList);
  }, [filterValue, setFilterValue]);

  const [status] = React.useState<'pending' | 'loaded' | 'error'>('loaded');

  const closeDropdown = () => {
    setOpen(false);
    setFilterValue('');
    if (selectListRef.current) {
      selectListRef.current.scrollTop = 0;
    }
  };

  const seenRegions = new Set();
  const options: Locale[] = Array.from(
    filteredOptions.filter((locale) => {
      if (!locale?.region?.code) return false;

      if (seenRegions.has(locale.region.code)) return false;

      seenRegions.add(locale.region.code);
      return true;
    })
  );
  const regionGroup = locale.localeList.reduce(
    (r: Record<string, Locale[]>, a) => {
      if (a.region?.code) {
        r[a.region.code] = [...(r[a.region.code] || []), a];
      } else {
        options.push(a);
      }
      return r;
    },
    {}
  );
  // get unique regions and filter out all undefined
  const showOptionList = showOptions && options.length > 0 && !filterValue;

  return (
    <>
      <SelectWrapper>
        <SelectBox onClick={() => setOpen(!open)} open={open}>
          <SelectLabel>Locale</SelectLabel>
          <SelectCurrent>
            {locale.localeToString(locale.getLocale())}
          </SelectCurrent>
          <ChevronDownIcon />
        </SelectBox>
        <SelectDropdown open={open}>
          <Dismissible click escape disabled={!open} onDismiss={closeDropdown}>
            <DropdownHeader>
              <SelectFilter
                placeholder="Filter"
                onChange={(event) => setFilterValue(event.target.value)}
                value={filterValue}
              />
            </DropdownHeader>
            <SelectList ref={selectListRef as any}>
              {status === 'pending' && (
                <SelectLoadingState>
                  <LoadingDots color="var(--tina-color-primary)" />
                </SelectLoadingState>
              )}
              {status === 'loaded' && (
                <>
                  {showOptionList ? (
                    options.map((currentLocale, i) => {
                      return (
                        <Option
                          getLabel={(l) =>
                            l.region?.label ||
                            l.language?.label ||
                            localeToString(l)
                          }
                          currentLocale={currentLocale}
                          selectedLocale={locale.getLocale()}
                          regionGroup={regionGroup}
                          imgMap={locale.imgMap}
                          key={i}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (
                              currentLocale.region?.code &&
                              regionGroup[currentLocale.region.code]
                            ) {
                              setFilteredOptions(
                                regionGroup[currentLocale.region.code]
                              );
                              setShowOptions(false);
                            } else {
                              // this is not a region it is a locale
                              locale.setLocale(currentLocale);
                              locale.onSwitch();
                              closeDropdown();
                            }
                          }}
                        />
                      );
                    })
                  ) : (
                    <>
                      {options.length > 0 && (
                        <PanelHeader
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFilterValue('');
                            setShowOptions(true);
                            setFilteredOptions(originalFilterOptions);
                          }}
                        >
                          <LeftArrowIcon /> <span>Back</span>
                        </PanelHeader>
                      )}
                      {filteredOptions.map((option) => (
                        <SelectOption
                          key={localeToString(option)}
                          active={
                            locale.getFormateLocale() === localeToString(option)
                          }
                          onClick={() => {
                            locale.setLocale(option);
                            locale.onSwitch();
                            closeDropdown();
                          }}
                        >
                          {localeToString(option)}
                        </SelectOption>
                      ))}
                    </>
                  )}
                  {filteredOptions.length === 0 && (
                    <SelectEmptyState>No locales to display</SelectEmptyState>
                  )}
                </>
              )}
              {status === 'error' && (
                <SelectEmptyState>
                  We had trouble loading branches. Please refresh to try again.
                </SelectEmptyState>
              )}
            </SelectList>
          </Dismissible>
        </SelectDropdown>
      </SelectWrapper>
    </>
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
