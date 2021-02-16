import React from 'react';
import { Locale, localeToString } from '../../localizationApi/LocalizationAPI';
import { FlexDiv, SelectOption } from './toolbarStyles';

interface FilterOptionProps {
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    currentLocale: Locale
  ) => void;
  currentLocales: Locale[];
  selectedLocale: Locale;
}
export const FilterOptions = ({
  onClick,
  currentLocales,
  selectedLocale,
}: FilterOptionProps) => {
  const rest: Locale[] = [];
  const regionCodes: string[] = [];
  const regionGroup = currentLocales.reduce(
    (r: Record<string, Locale[]>, a) => {
      if (a.region?.code) {
        if (!regionCodes.includes(a.region.code)) {
          regionCodes.push(a.region.code);
        }
        r[a.region.code] = [...(r[a.region.code] || []), a];
      } else {
        rest.push(a);
      }
      return r;
    },
    {}
  );
  console.log({ regionGroup });
  console.log({ rest });

  return (
    <>
      {regionCodes.map((region) => (
        <div key={region}>
          <div key={region}>{region}</div>
          {regionGroup[region].map((currentLocale) => {
            return (
              <SelectOption
                style={{
                  paddingLeft: '1rem',
                }}
                key={localeToString(currentLocale)}
                active={
                  localeToString(currentLocale) ===
                  localeToString(selectedLocale)
                }
                onClick={(e) => {
                  onClick(e, currentLocale);
                }}
              >
                <FlexDiv>
                  <span>{currentLocale.language?.label}</span>
                  <div
                    style={{
                      color: 'var(--tina-color-grey-0)',
                      backgroundColor: 'var(--tina-color-primary)',
                      border: '2px solid var(--tina-color-grey-6)',
                      borderRadius: '5px',
                    }}
                  >
                    {localeToString(currentLocale)}
                  </div>
                </FlexDiv>
              </SelectOption>
            );
          })}
        </div>
      ))}
      {rest.length > 0 && <div>No Region</div>}
      {rest.map((currentLocale) => {
        return (
          <SelectOption
            key={localeToString(currentLocale)}
            style={{
              paddingLeft: '1rem',
            }}
            active={
              localeToString(currentLocale) === localeToString(selectedLocale)
            }
            onClick={(e) => {
              onClick(e, currentLocale);
            }}
          >
            <FlexDiv>
              <span>{currentLocale.language?.label}</span>
              <div
                style={{
                  color: 'var(--tina-color-grey-0)',
                  backgroundColor: 'var(--tina-color-primary)',
                  border: '2px solid var(--tina-color-grey-6)',
                  borderRadius: '5px',
                }}
              >
                {localeToString(currentLocale)}
              </div>
            </FlexDiv>
          </SelectOption>
        );
      })}
    </>
  );
};
