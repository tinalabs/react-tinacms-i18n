import { Locale, localeToString } from '../../localizationApi';
import * as React from 'react';
import { SelectOption, FlexDiv } from './toolbarStyles';

interface OptionProps {
  currentLocale: Locale;
  selectedLocale: Locale;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  imgMap?: Record<string, string>;
  getLabel: (locale: Locale) => string;
}

export const Option = ({
  currentLocale,
  selectedLocale,
  getLabel,
  imgMap,
  onClick,
}: OptionProps): JSX.Element => {
  return (
    <SelectOption
      key={localeToString(currentLocale)}
      active={
        !currentLocale.region &&
        localeToString(currentLocale) === localeToString(selectedLocale)
      }
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
