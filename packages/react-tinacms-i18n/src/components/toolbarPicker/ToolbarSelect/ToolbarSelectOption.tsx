import * as React from 'react';
import { SelectOption, FlexDiv } from '../Select/Select';
import { ToolbarSelectValue } from './ToolbarSelect';

export interface ToolbarSelectOptionProps extends ToolbarSelectValue {
  key: any;
  selected: boolean;
  onSelect?: (value: any) => void;
  icons?: (value: any) => React.ReactNode | React.ReactNode[];
}

export const ToolbarSelectOption = ({
  key,
  label,
  value,
  selected,
  onSelect,
  icons
}: ToolbarSelectOptionProps): JSX.Element => (
  <SelectOption
    key={key}
    onClick={() => onSelect && onSelect(value)}
    active={selected}
  >
    <FlexDiv>
      <span>{label}</span>
      {icons || null}
    </FlexDiv>
  </SelectOption>
);
