import React, { useState, useRef } from 'react';
import { Input, useCMS } from 'tinacms';
import { ChevronDownIcon } from '@tinacms/icons';
import { Dismissible } from 'react-dismissible';
import styled, { css } from 'styled-components';
import { LoadingDots } from '@tinacms/react-forms';
import { Locale, I18nClient } from '../localizationApi';
import { LeftArrowIcon } from '@tinacms/icons';
// import { useI18n } from '../hooks/useI18n';

export const LocaleSwitcher = () => {
  const cms = useCMS();
  const locale: I18nClient = cms.api.localization;
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = React.useState('');
  const selectListRef = useRef<HTMLElement>();
  const originalFilterOptions = locale.localeList.filter((option) => {
    return locale.localeToString(option).includes(filterValue);
  });
  const [filteredOptions, setFilteredOptions] = React.useState(
    originalFilterOptions
  );
  const [showRegions, setShowRegions] = React.useState(true);

  React.useEffect(() => {
    const currentList = locale.localeList.filter((option) => {
      return locale.localeToString(option).includes(filterValue);
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
  const regions: Locale[] = Array.from(
    new Set(filteredOptions.filter((locale) => locale.region))
  );
  const regionGroup = locale.localeList.reduce(
    (r: Record<string, Locale[]>, a) => {
      if (a.region) {
        r[a.region.code] = [...(r[a.region.code] || []), a];
      } else {
        regions.push(a);
      }
      return r;
    },
    {}
  );
  // get unique regions and filter out all undefined
  const showRegionList = showRegions && regions.length > 0 && !filterValue;

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
                  {showRegionList ? (
                    regions.map((currentLocale, i) => {
                      return (
                        <SelectOption
                          key={i}
                          active={
                            locale.localeToString(currentLocale) ===
                              locale.localeToString(locale.getLocale()) ||
                            currentLocale.region === locale.getLocale().region
                          }
                          onClick={() => {
                            if (
                              currentLocale.region &&
                              regionGroup[currentLocale.region.code]
                            ) {
                              setFilteredOptions(
                                regionGroup[currentLocale.region.code]
                              );
                              setShowRegions(false);
                            } else {
                              // this is not a region it is a locale
                              locale.setLocale(currentLocale);
                              locale.onSwitch();
                              closeDropdown();
                            }
                          }}
                        >
                          <FlexDiv>
                            <span>
                              {currentLocale.region ||
                                locale.localeToString(currentLocale)}
                            </span>
                            {currentLocale.region &&
                              locale.imgMap[currentLocale.region.code] && (
                                <img
                                  width="20px"
                                  height="20px"
                                  src={locale.imgMap[currentLocale.region.code]}
                                />
                              )}
                          </FlexDiv>
                        </SelectOption>
                      );
                    })
                  ) : (
                    <>
                      {regions.length > 0 && (
                        <PanelHeader
                          onClick={() => {
                            setFilterValue('');
                            setShowRegions(true);
                            setFilteredOptions(originalFilterOptions);
                          }}
                        >
                          <LeftArrowIcon /> <span>Back</span>
                        </PanelHeader>
                      )}
                      {filteredOptions.map((option) => (
                        <SelectOption
                          key={locale.localeToString(option)}
                          active={
                            locale.localeToString(option) ===
                            locale.localeToString(locale.getLocale())
                          }
                          onClick={() => {
                            locale.setLocale(option);
                            locale.onSwitch();
                            closeDropdown();
                          }}
                        >
                          {locale.localeToString(option)}
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

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & img {
    display: flex;
  }
  & span {
    display: flex;
  }
`;

const SelectFilter = styled(Input)`
  height: 36px;
  flex: 0 1 auto;

  ::placeholder {
    color: var(--tina-color-grey-4);
  }
`;

const DropdownHeader = styled.div`
  padding: var(--tina-padding-small);
  border-bottom: 1px solid var(--tina-color-grey-2);
`;

const SelectEmptyState = styled.div`
  display: block;
  border: none;
  outline: none;
  padding: var(--tina-padding-small);
  background: transparent;
  color: var(--tina-color-grey-4);
  text-align: left;
  font-size: var(--tina-font-size-2);
  line-height: 1.4;
  width: 100%;
  transition: all 150ms ease-out;
  flex: 0 0 auto;
`;

const SelectLoadingState = styled.div`
  display: flex;
  border: none;
  outline: none;
  padding: var(--tina-padding-small);
  background: transparent;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
`;

export interface SelectOptionProps {
  active?: boolean;
}

const SelectOption = styled.button<SelectOptionProps>`
  display: lock;
  border: none;
  outline: none;
  padding: 4px var(--tina-padding-small);
  background: transparent;
  color: var(--tina-color-grey-6);
  text-align: left;
  font-size: var(--tina-font-size-2);
  line-height: 1.2;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  transition: all 150ms ease-out;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
  flex: 0 0 auto;

  svg {
    width: 20px;
    height: auto;
    margin: -4px -4px -4px -4px;
    fill: currentColor;
    opacity: 0.7;
  }

  :first-child {
    padding-top: 8px;
  }

  :last-child {
    padding-bottom: 8px;
  }

  :hover {
    color: var(--tina-color-primary);
    background-color: var(--tina-color-grey-1);
  }

  ${(p) =>
    p.active &&
    css`
      font-weight: bold;
      color: var(--tina-color-primary);
      background-color: var(--tina-color-grey-1);
      pointer-events: none;
    `};
`;

const SelectList = styled.div`
  min-width: 200px;
  max-height: 170px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

export interface SelectDropdownProps {
  open?: boolean;
}

const SelectDropdown = styled.div<SelectDropdownProps>`
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translate3d(-50%, calc(100% - 16px), 0) scale3d(0.5, 0.5, 1);
  border-radius: var(--tina-radius-small);
  border: 1px solid var(--tina-color-grey-2);
  box-shadow: var(--tina-shadow-big);
  background-color: white;
  transform-origin: 50% 0;
  pointer-events: none;
  transition: all 150ms ease-out;
  opacity: 0;
  width: 350px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate3d(-50%, -100%, 0);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid var(--tina-color-grey-2);
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 1px;
    left: 50%;
    transform: translate3d(-50%, -100%, 0);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }

  ${(p) =>
    p.open &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: translate3d(-50%, 100%, 0) scale3d(1, 1, 1);
    `};
`;

export interface SelectBoxProps {
  open: boolean;
}

const SelectBox = styled.button<SelectBoxProps>`
  border-radius: var(--tina-radius-small);
  border: 1px solid var(--tina-color-grey-2);
  background-color: white;
  padding: 5px 42px 5px var(--tina-padding-small);
  position: relative;
  outline: none;
  cursor: pointer;
  min-width: 140px;
  transition: all 150ms ease-out;

  :hover {
    background-color: var(--tina-color-grey-1);
  }

  svg {
    fill: var(--tina-color-primary);
    position: absolute;
    top: 50%;
    right: 8px;
    transform-origin: 50% 50%;
    transform: translate3d(0, -50%, 0);
    transition: all 150ms ease-out;
    width: 24px;
    height: auto;
  }

  ${(p) =>
    p.open &&
    css`
      background-color: var(--tina-color-grey-1);
      box-shadow: inset 0px 2px 3px rgba(0, 0, 0, 0.06);

      ${SelectLabel} {
        color: var(--tina-color-primary);
      }

      svg {
        transform: translate3d(0, -50%, 0) rotate(180deg);
        fill: var(--tina-color-grey-4);
      }
    `};
`;

const SelectLabel = styled.span`
  color: var(--tina-color-grey-8);
  display: block;
  letter-spacing: 0.01em;
  line-height: 1;
  font-size: var(--tina-font-size-1);
  font-weight: 600;
  text-align: left;
  transition: all 150ms ease-out;
`;

const SelectCurrent = styled.span`
  color: var(--tina-color-grey-6);
  display: block;
  text-align: left;
  line-height: 20px;
  font-size: var(--tina-font-size-3);
  text-overflow: ellipsis;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
`;

export const LocalePickerToolbarPlugin = {
  __type: 'toolbar:widget',
  name: 'locale-branch-switcher',
  weight: 1,
  component: LocaleSwitcher,
};
export const getLocalePickerToolbarPlugin = (i18n: LocalizationApi) => {
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

export const PanelHeader = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  background-color: white;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 6px 18px 6px 18px;
  color: inherit;
  font-size: var(--tina-font-size-3);
  transition: color var(--tina-timing-medium) ease-out;
  user-select: none;
  border-bottom: 1px solid var(--tina-color-grey-2);
  margin: 0;
  span {
    flex: 1 1 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  svg {
    flex: 0 0 auto;
    width: 24px;
    fill: var(--tina-color-grey-3);
    height: auto;
    transform: translate3d(-4px, 0, 0);
    transition: transform var(--tina-timing-medium) ease-out;
  }
  :hover {
    color: var(--tina-color-primary);
    svg {
      fill: var(--tina-color-grey-8);
      transform: translate3d(-7px, 0, 0);
      transition: transform var(--tina-timing-medium) ease-out;
    }
  }
`;
