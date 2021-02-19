import React, { useState, useEffect, useCallback } from "react";
import { Dismissible } from "react-dismissible";
import { ChevronDownIcon } from '@tinacms/icons';
import { SelectBox, SelectDropdown, DropdownHeader, SelectFilter, SelectList, SelectCurrent, SelectLabel, SelectEmptyState } from "../Select/Select";
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
    single?: string;
    plural?: string;
  };
  sortBy?: string;
  groupBy?: string;
  open?: boolean;
  filter?: string;
  onFilter?: (filter: string) => void;
  onSelect?: (value: any) => void;
  icons?: (value: any) => React.ReactNode | React.ReactNode[];
}

export function ToolbarSelect({ ref, options, labels, selectedOption, sortBy, open = false, filter, onFilter }: ToolbarSelectOptions) {
  const [selectOptions, setSelectOptions] = useState(options);
  useEffect(() => setSelectOptions(options), [JSON.stringify(options)]);

  // Handle dropdown
  const [dropdownState, setDropdownState] = useState<"open" | "closed">("closed");
  const toggleDropdown = useCallback(() => {
    setDropdownState(dropdownState === "open" ? "closed" : "open");
  }, [dropdownState]);
  useEffect(() => setDropdownState(open ? "open" : "closed"), [open]);

  // Handle filter
  const [optionFilter, setOptionFilter] = useState(filter);
  const filterOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionFilter(event.target.value);
    onFilter && onFilter(event.target.value);
  }, [])
  useEffect(() => setOptionFilter(filter), [filter]);
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
  const onSelect = useCallback((value: any) => {
    const option = options.find(option => option.value === value);

    if (!option) return;
    if (onSelect) onSelect(option);
    setSelected(option);
  }, [])
  useEffect(() => setSelected(selectedOption), [selectedOption]);

  // Handle sorting
  const [sortGroup, setSortGroup] = useState<string>();
  const isSorting = sortBy && sortGroup;

  useEffect(() => {
    if (!sortBy) return;

    const sortedOptions = groupOptions(options, sortBy);

    console.log({
      sortBy,
      sortedOptions
    })

    if (!sortGroup) {
      const unsortedOptions = sortedOptions.default;
      const sortGroups = Object.keys(sortedOptions).map(groupCode => {
        return {
          label: groupCode,
          value: null
        }
      })
        .filter(option => option.label === "default")

      setSelectOptions([...unsortedOptions, ...sortGroups]);
    }
    else {
      setSelectOptions(sortedOptions[sortGroup]);
    }
  }, [sortBy]);
  
  return (
    <>
      <SelectBox onClick={() => toggleDropdown()} open={dropdownState === "open"}>
        {labels?.single && <SelectLabel>{labels.single}</SelectLabel>}
        <SelectCurrent>
          {selectedOption?.toString()}
        </SelectCurrent>
        <ChevronDownIcon />
      </SelectBox>
      <SelectDropdown open={dropdownState === "open"}>
        <Dismissible click escape disabled={!open} onDismiss={() => setDropdownState("closed")}>
          <DropdownHeader>
            <SelectFilter
              placeholder="Filter"
              onChange={(e) => filterOnChange(e)}
              value={optionFilter}
            />
          </DropdownHeader>
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
                onSelect={onSelect}
              />
            )}
            {!isSorting && selectOptions.length > 0 && (
              options.map((option, i) => {
                return (
                  <ToolbarSelectOption
                    key={i}
                    label={option.label}
                    value={option.value}
                    onSelect={(value) => {
                      if (value) onSelect(value)
                      else setSortGroup(option.label)
                    }}
                    selected={selected?.value === option.value}
                  />
                );
              })
            )}
          </SelectList>
        </Dismissible>
      </SelectDropdown>
    </>
  )
}

export const groupOptions = (options: ToolbarSelectValue[], groupBy: string) => {
  const canBeSorted = options.findIndex(option => typeof option.value[groupBy] !== "undefined") > -1;
  const sortedOptions = options.reduce((sortedOptions: Record<string, ToolbarSelectValue[]>, option) => {
    if (!sortedOptions.default) sortedOptions.default = [];

    if (canBeSorted) {
      const groupCode: string = getIn(option.value, groupBy);

      if (typeof groupCode !== "string") return sortedOptions;
      if (!sortedOptions[groupCode]) sortedOptions[groupCode] = [];

      sortedOptions[groupCode].push(option);
    } else {
      sortedOptions.default.push(option);
    }

    return sortedOptions;
  }, {});

  return sortedOptions;
}