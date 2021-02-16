import { Locale, localeToString } from '../../localizationApi';
import * as React from 'react';
import { SelectOption, FlexDiv } from './toolbarStyles';

interface OptionProps {
  currentLocale: Locale;
  selectedLocale: Locale;
  regionGroup: Record<string, Locale[]>;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  imgMap?: Record<string, string>;
  getLabel: (locale: Locale) => string;
}

// const temp = {(e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (
//       currentLocale.region?.code &&
//       regionGroup[currentLocale.region.code]
//     ) {
//       setFilteredOptions(regionGroup[currentLocale.region.code]);
//       setShowOptions(false);
//     } else {
//       // this is not a region it is a locale
//       locale.setLocale(currentLocale);
//       locale.onSwitch();
//       closeDropdown();
//     }
//   }}
export const Option = ({
  currentLocale,
  selectedLocale,
  getLabel,
  //   regionGroup,
  imgMap,
  onClick,
}: OptionProps): JSX.Element => {
  return (
    <SelectOption
      key={localeToString(currentLocale)}
      active={localeToString(currentLocale) === localeToString(selectedLocale)}
      onClick={onClick}
    >
      <FlexDiv>
        <span>{getLabel(currentLocale)}</span>
        {currentLocale.region &&
          imgMap &&
          imgMap[currentLocale.region.code] && (
            <img
              width="20px"
              height="20px"
              src={imgMap[currentLocale.region.code]}
            />
          )}
      </FlexDiv>
    </SelectOption>
  );
};
