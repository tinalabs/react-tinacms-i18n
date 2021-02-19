import React, { useState, useEffect, useCallback } from "react";
import { Dismissible } from "react-dismissible";
import { ChevronDownIcon } from '@tinacms/icons';
import { SelectBox, SelectDropdown, DropdownHeader, SelectFilter, SelectList, SelectCurrent, SelectLabel, SelectEmptyState, SelectWrapper } from "../Select/Select";
import { ToolbarSelectOption } from "./ToolbarSelectOption";
import { ToolbarSelectSubMenu } from "./ToolbarSelectMenu";
import { getIn } from 'final-form';

export interface ToolbarSelectValue {
  label: string;
  value: any;
}

export interface ToolbarSelectOptions {
  ref: React.Ref<any>;
  options: ToolbarSelectValue[];
  selectedOption?: ToolbarSelectValue;
  labels?: {
    active?: string;
    single?: string;
    plural?: string;
  };
  sortBy?: string | string[];
  groupBy?: string | string[];
  open?: boolean;
  filter?: boolean | string;
  onFilter?: (filter: string) => void;
  onSelect?: (value: any) => void;
  icons?: (value: any) => React.ReactNode | React.ReactNode[];
}

export function ToolbarSelect({
  ref,
  options,
  selectedOption,
  labels,
  sortBy,
  groupBy,
  open = false,
  filter,
  onFilter,
  onSelect,
  icons
}: ToolbarSelectOptions) {
  const [selectOptions, setSelectOptions] = useState(options);
  useEffect(() => setSelectOptions(options), [JSON.stringify(options)]);

  // Handle dropdown
  const [dropdownState, setDropdownState] = useState<"open" | "closed">("closed");
  const toggleDropdown = useCallback(() => {
    setDropdownState(dropdownState === "open" ? "closed" : "open");
  }, [dropdownState]);
  useEffect(() => setDropdownState(open ? "open" : "closed"), [open]);

  // Handle filter
  const [optionFilter, setOptionFilter] = useState(typeof filter === "string" ? filter : undefined);
  const filterOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionFilter(event.target.value);
    onFilter && onFilter(event.target.value);
  }, [])
  useEffect(() => setOptionFilter(typeof filter === "string" ? filter : undefined), [filter]);
  useEffect(() => {
    if (!onFilter && optionFilter && optionFilter.length > 0) {
      const filteredOptions = options.filter(option => {
        switch (true) {
          case typeof option.value === "object" &&
            JSON.stringify(Object.values(option.value)).includes(optionFilter):
          case option.value.toString().includes(optionFilter):
          case option.label.includes(optionFilter):
            return true;
          default:
            return false;
        }
      });

      setSelectOptions(filteredOptions);
    }
  }, [optionFilter]);

  // Handle selected state
  const [selected, setSelected] = useState<any>(selectedOption);
  const handleSelect = useCallback((option: ToolbarSelectValue, back?: boolean) => {
    if (back) {
      setSelectOptions(options)
      setSortGroup(undefined);

      return;
    }

    if (option.value === null) {
      setSortGroup(option.label);

      return;
    }

    if (onSelect && option) onSelect(option.value);
    setSelected(option);
  }, [])
  useEffect(() => setSelected(selectedOption), [selectedOption]);

  // Handle sorting
  const [sortGroup, setSortGroup] = useState<string>();
  const isSorting = sortBy && sortGroup;

  useEffect(() => {
    if (!sortBy) return;

    const sortedOptions = groupOptions(options, sortBy);

    if (!sortGroup) {
      const unsortedOptions = sortedOptions.default;
      const sortGroups = Object.keys(sortedOptions).map(groupCode => {
        return {
          label: groupCode,
          value: null
        }
      })
        .filter(option => option.label !== "default")
      const sortedLanguagesAndRegions = unsortedOptions.concat(sortGroups as any);

      if (JSON.stringify(sortedLanguagesAndRegions) !== JSON.stringify(selectOptions)) {
        setSelectOptions(sortedLanguagesAndRegions);
      }
    }
    else {
      if (JSON.stringify(sortedOptions[sortGroup]) !== JSON.stringify(selectOptions)) {
        setSelectOptions(sortedOptions[sortGroup]);
      }
    }
  }, [sortBy, sortGroup, selectOptions]);
  
  return (
    <SelectWrapper>
      <SelectBox onClick={() => toggleDropdown()} open={dropdownState === "open"}>
        {labels?.single && <SelectLabel>{labels.single}</SelectLabel>}
        <SelectCurrent>
          {labels?.active ?? selectedOption?.toString()}
        </SelectCurrent>
        <ChevronDownIcon />
      </SelectBox>
      <SelectDropdown open={dropdownState === "open"}>
        <Dismissible click escape disabled={!open} onDismiss={() => setDropdownState("closed")}>
          {filter && <DropdownHeader>
            <SelectFilter
              placeholder="Filter"
              onChange={(e) => filterOnChange(e)}
              value={optionFilter}
            />
          </DropdownHeader>}
          <SelectList ref={ref}>
            {selectOptions.length === 0 && (
              <SelectEmptyState>
                No {labels?.plural || "results"} found{filter ? ` for ${filter}...` : `...`}
              </SelectEmptyState>
            )}
            {isSorting && selectOptions.length > 0 && (
              <ToolbarSelectSubMenu
                options={selectOptions}
                selectedOption={selected}
                groupBy={groupBy}
                onSelect={(option, back) => handleSelect(option, back)}
                icons={icons}
              />
            )}
            {!isSorting && selectOptions.length > 0 && (
              selectOptions.map((option, i) => {
                return (
                  <ToolbarSelectOption
                    key={i}
                    label={option.label}
                    value={option.value}
                    onSelect={() => handleSelect(option)}
                    selected={selected?.value === option.value || sortBy && getGroupCode(selected, sortBy) === option.label || false}
                    icons={icons}
                  />
                );
              })
            )}
          </SelectList>
        </Dismissible>
      </SelectDropdown>
    </SelectWrapper>
  )
}

export const getGroupCode = (option: ToolbarSelectValue, groupBy: string | string[]) => {
  const groupKeys = Array.isArray(groupBy) ? groupBy : [groupBy];
  
  return groupKeys.reduce((value: string | undefined, key) => {
    const groupCode: string = getIn(option.value, key) ?? "default";

    if (typeof value === "string") return value;
    if (typeof groupCode !== "string") return value;
    else return groupCode;
  }, undefined)
}

export const groupOptions = (options: ToolbarSelectValue[], groupBy: string | string[]) => {
  const sortedOptions = options.reduce((sortedOptions: Record<string, ToolbarSelectValue[]>, option) => {
    const groupCode: string = getGroupCode(option, groupBy) ?? "default";

    if (!sortedOptions.default) sortedOptions.default = [];
    if (!sortedOptions[groupCode]) sortedOptions[groupCode] = [];

    const defaultIndex = sortedOptions.default.findIndex(o => JSON.stringify(o) === JSON.stringify(option));
    const groupIndex = sortedOptions[groupCode].findIndex(o => JSON.stringify(o) === JSON.stringify(option));

    // Add to group and dedupe default
    if (groupIndex === -1 && defaultIndex > 1) {
      sortedOptions[groupCode].push(option);
      sortedOptions.default.splice(defaultIndex, 1);
    }
    // Else add to default
    else if (groupIndex === -1) {
      sortedOptions[groupCode].push(option);
    }

    return sortedOptions;
  }, {} as any);

  return sortedOptions;
}