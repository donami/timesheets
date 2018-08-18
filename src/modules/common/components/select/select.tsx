import React, { Component } from 'react';

import styled, { withProps, css } from '../../../../styled/styled-components';

type SelectItem = { value: any; label: string };

type Props = {
  options: SelectItem[];
  name?: string;
  onChange?: any;
  placeholder?: string;
};

type State = Readonly<{
  open: boolean;
  selected: SelectItem | null;
}>;

const initialState: State = { open: false, selected: null };

class Select extends Component<Props, State> {
  readonly state = initialState;

  selectElem: HTMLSelectElement | null;

  selectItem = (item: SelectItem) => {
    this.setState({ selected: item, open: false });

    if (this.selectElem) {
      this.selectElem.value = item.value.toString();

      this.props.onChange && this.props.onChange(item.value.toString());
    }
  };

  render() {
    const { options, placeholder } = this.props;
    const { open, selected } = this.state;

    const defaultOpenText = placeholder || 'Select value';

    return (
      <Container open={open} onClick={() => this.setState({ open: !open })}>
        <Text hasSelectedItem={selected !== null}>
          {selected ? selected.label : defaultOpenText}
        </Text>
        <DropdownIcon className="fas fa-caret-down" />

        <Options open={open}>
          {options.map(option => (
            <Option
              key={option.value}
              selected={selected ? selected.value === option.value : false}
              onClick={() => this.selectItem(option)}
            >
              {option.label}
            </Option>
          ))}
        </Options>

        <select
          ref={element => {
            this.selectElem = element;
          }}
          onChange={() => console.log('changed')}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Container>
    );
  }
}

export default Select;

const Container = withProps<{ open: boolean }, HTMLDivElement>(styled.div)`
  cursor: pointer;
  position: relative;
  display: inline-block;
  outline: 0;
  text-align: left;
  -webkit-transition: width 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: width 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: box-shadow 0.1s ease, width 0.1s ease;
  transition: box-shadow 0.1s ease, width 0.1s ease,
    -webkit-box-shadow 0.1s ease;
  -webkit-tap-highlight-color: transparent;

  word-wrap: break-word;
  line-height: 1em;
  white-space: normal;
  -webkit-transform: rotateZ(0);
  transform: rotateZ(0);
  min-width: 14em;
  background: #fff;
  padding: 0.78571429em 2.1em 0.78571429em 1em;
  color: rgba(0, 0, 0, 0.87);
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;

  &:hover {
    border-color: rgba(34, 36, 38, 0.35);
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  &:focus {
    border-color: #96c8da;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  select {
    display: none;
  }

  ${({ open }) =>
    open &&
    css`
      border-color: #96c8da;
      -webkit-box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
      box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;

      &:hover {
        border-color: #96c8da;
        -webkit-box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
        box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
      }
    `};

  z-index: 999999;
`;

const Text = withProps<{ hasSelectedItem: boolean }, HTMLDivElement>(
  styled.div
)`
  display: inline-block;
  -webkit-transition: none;
  transition: none;

  ${({ hasSelectedItem }) =>
    !hasSelectedItem &&
    css`
      color: rgba(191, 191, 191, 0.87);
    `}
`;

const DropdownIcon = styled.i`
  display: inline-block;
  text-decoration: inherit;

  font-size: 0.85714286em;

  font-style: normal;
  text-align: center;

  cursor: pointer;
  position: absolute;
  width: auto;
  height: auto;
  line-height: 1.21428571em;
  top: 0.78571429em;
  right: 1em;
  z-index: 3;
  margin: -0.78571429em;
  padding: 0.91666667em;
  opacity: 0.8;
  -webkit-transition: opacity 0.1s ease;
  transition: opacity 0.1s ease;
`;

const Options = withProps<{ open: boolean }, HTMLDivElement>(styled.div)`
  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}

  cursor: auto;
  position: absolute;
  outline: 0;
  top: 100%;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  margin: 0;
  padding: 0 0;
  background: #fff;
  font-size: 1em;
  text-shadow: none;
  text-align: left;
  border: 1px solid rgba(34, 36, 38, 0.15);
  -webkit-transition: opacity 0.1s ease;
  transition: opacity 0.1s ease;
  z-index: 11;
  will-change: transform, opacity;

  left: 0;

  overflow-x: hidden;
  overflow-y: auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-overflow-scrolling: touch;
  border-top-width: 0 !important;
  width: auto;
  outline: 0;
  margin: 0 -1px;
  min-width: 100%;
  width: 100%;
  border-radius: 0 0 0.28571429rem 0.28571429rem;
  -webkit-transition: opacity 0.1s ease;
  transition: opacity 0.1s ease;

  max-height: 8.01428571rem;

  border-color: #96c8da;
  -webkit-box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const Option = withProps<{ selected: boolean }, HTMLDivElement>(styled.div)`
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  line-height: 1em;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1em;
  text-transform: none;
  font-weight: 400;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-touch-callout: none;

  border-top: 1px solid #fafafa;
  padding: 0.78571429rem 1.14285714rem !important;
  white-space: normal;
  word-wrap: normal;

  pointer-events: all;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.95);
    z-index: 13;
  }

  ${({ selected }) =>
    selected &&
    css`
      background: rgba(0, 0, 0, 0.03);
      color: rgba(0, 0, 0, 0.95);
      font-weight: 700;
    `}
`;
