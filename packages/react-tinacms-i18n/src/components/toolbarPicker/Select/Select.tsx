import styled, { css } from 'styled-components';
import { Input } from 'tinacms';

export const FlexDiv = styled.div`
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

export const SelectFilter = styled(Input)`
  height: 36px;
  flex: 0 1 auto;

  ::placeholder {
    color: var(--tina-color-grey-4);
  }
`;

export const DropdownHeader = styled.div`
  padding: var(--tina-padding-small);
  border-bottom: 1px solid var(--tina-color-grey-2);
`;

export const SelectEmptyState = styled.div`
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

export const SelectLoadingState = styled.div`
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

export const SelectOptionGroupHeader = styled.div`
  padding: 4px var(--tina-padding-small);
  background-color: var(--tina-color-grey-1);
  color: var(--tina-color-grey-4);
  font-size: var(--tina-font-size-2);
  text-overflow: ellipsis;
`

export const SelectOption = styled.button<SelectOptionProps>`
  display: block;
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
    `};
`;

export const SelectOptionBadge = styled.span`
  display: inline-block;
  color: var(--tina-color-grey-4);
  background-color: var(--tina-color-grey-2);
  border: 2px solid var(--tina-color-primary-grey-3);
  border-radius: 5px;
  padding: 0 5px;
`

export const SelectOptionGroup = styled.div`
  ${SelectOptionGroupHeader},
  ${SelectOption} {
    padding-left: 1rem;
  }
`

export const SelectList = styled.div`
  min-width: 200px;
  max-height: 170px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export interface SelectDropdownProps {
  open?: boolean;
}

export const SelectDropdown = styled.div<SelectDropdownProps>`
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

export const SelectBox = styled.button<SelectBoxProps>`
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

export const SelectLabel = styled.span`
  color: var(--tina-color-grey-8);
  display: block;
  letter-spacing: 0.01em;
  line-height: 1;
  font-size: var(--tina-font-size-1);
  font-weight: 600;
  text-align: left;
  transition: all 150ms ease-out;
`;

export const SelectCurrent = styled.span`
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
