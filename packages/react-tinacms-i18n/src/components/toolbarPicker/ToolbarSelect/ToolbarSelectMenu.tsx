import React, { useCallback, useState } from "react";
import { LeftArrowIcon } from '@tinacms/icons';
import { PanelHeader, SelectOptionGroup, SelectOptionGroupHeader } from "../Select/Select";
import { groupOptions, ToolbarSelectValue } from "./ToolbarSelect";
import { useEffect } from "react";
import { ToolbarSelectOption } from "./ToolbarSelectOption";

export interface ToolbarSelectSubMenuProps {
  options: ToolbarSelectValue[];
  groupBy?: string;
  selectedOption?: ToolbarSelectValue;
  onSelect: (value: any) => void;
  icons?: (value: any) => React.ReactNode | React.ReactNode[]
}

export function ToolbarSelectSubMenu({options, groupBy, selectedOption, onSelect}: ToolbarSelectSubMenuProps) {
  const onPanelClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(null);
  }, [])

  // Handle grouping
  const [groupedOptions, setGroupedOptions] = useState<Record<string, ToolbarSelectValue[]>>();
  useEffect(() => {
    if (!groupBy) return;

    const canBeGrouped = options.findIndex(option => typeof option.value[groupBy] !== "undefined");
    if (!canBeGrouped) return;

    const groupedOpts = groupOptions(options, groupBy);
    if (groupedOpts) setGroupedOptions(groupedOpts);
  }, [groupBy]);

  return (
    <>
      <PanelHeader onClick={onPanelClick}>
        <LeftArrowIcon /> <span>Back</span>
      </PanelHeader>
      {groupedOptions && Object.keys(groupedOptions).map(key => {
        const options = groupedOptions[key];

        return (
          <SelectOptionGroup key={key}>
            <SelectOptionGroupHeader>{key}</SelectOptionGroupHeader>
            {options.map((option, i) => {
              return (
                <ToolbarSelectOption
                  key={i}
                  label={option.label}
                  value={option.value}
                  onSelect={onSelect}
                  selected={selectedOption?.value === option.value}
                />
              );
            })}
          </SelectOptionGroup>
        )
      })}
      {options.map((option, i) => {
        return (
          <ToolbarSelectOption
            key={i}
            label={option.label}
            value={option.value}
            onSelect={onSelect}
            selected={selectedOption?.value === option.value}
          />
        );
      })}
    </>
  )
}