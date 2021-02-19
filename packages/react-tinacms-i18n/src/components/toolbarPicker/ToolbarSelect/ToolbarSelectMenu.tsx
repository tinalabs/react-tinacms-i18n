import React, { useCallback, useState } from "react";
import { LeftArrowIcon } from '@tinacms/icons';
import { PanelHeader, SelectOptionGroup, SelectOptionGroupHeader } from "../Select/Select";
import { groupOptions, ToolbarSelectValue } from "./ToolbarSelect";
import { useEffect } from "react";
import { ToolbarSelectOption } from "./ToolbarSelectOption";

export interface ToolbarSelectSubMenuProps {
  options: ToolbarSelectValue[];
  selectedOption?: ToolbarSelectValue;
  groupBy?: string | string[];
  onSelect: (value: any, back?: boolean) => void;
  icons?: (value: any) => React.ReactNode | React.ReactNode[]
}

export function ToolbarSelectSubMenu({options, groupBy, selectedOption, onSelect}: ToolbarSelectSubMenuProps) {
  const onPanelClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(selectedOption, true);
  }, [])

  // Handle grouping
  const [groupedOptions, setGroupedOptions] = useState<Record<string, ToolbarSelectValue[]>>();
  useEffect(() => {
    if (!groupBy) return;

    const groupedOpts = groupOptions(options, groupBy);
    if (groupedOpts) setGroupedOptions(groupedOpts);
  }, [groupBy, options]);

  return (
    <>
      <PanelHeader onClick={onPanelClick}>
        <LeftArrowIcon /> <span>Back</span>
      </PanelHeader>
      {groupedOptions && Object.keys(groupedOptions).map(key => {
        const options = groupedOptions[key];

        // Don't render empty groups
        if (options.length === 0) return null;

        // Don't render group headers for groups of one
        if (options.length === -1) {
          return options.map((option, i) => {
            return (
              <ToolbarSelectOption
                key={i}
                label={option.label}
                value={option.value}
                onSelect={() => onSelect(option)}
                selected={selectedOption?.value === option.value || selectedOption?.label === option.label}
              />
            );
          })
        }

        // Render a group w/ header
        return (
          <SelectOptionGroup key={key}>
            <SelectOptionGroupHeader>{key}</SelectOptionGroupHeader>
            {options.map((option, i) => {
              return (
                <ToolbarSelectOption
                  key={i}
                  label={option.label}
                  value={option.value}
                  onSelect={() => onSelect(option)}
                  selected={selectedOption?.value === option.value || selectedOption?.label === option.label}
                />
              );
            })}
          </SelectOptionGroup>
        )
      })}
      {/** Render ungrouped options */}
      {!groupedOptions && options.map((option, i) => {
        return (
          <ToolbarSelectOption
            key={i}
            label={option.label}
            value={option.value}
            onSelect={() => onSelect(option)}
            selected={selectedOption?.value === option.value || selectedOption?.label === option.label}
          />
        );
      })}
    </>
  )
}