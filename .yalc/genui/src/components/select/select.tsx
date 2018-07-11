import * as React from 'react';
import { Transition } from 'react-transition-group';

import styled, { withProps, css } from '../../styled/styled-components';
import Icon from '../icon';

export interface SelectItem {
  value: string;
  label: string;
}

export interface SelectProps {
  items: SelectItem[];
  name?: string;
  defaultSelected?: SelectItem[];
  placeholder?: string;
  onChange?: (selected: SelectItem[]) => any;
}

export interface SelectState {
  selected: SelectItem[];
  expanded: boolean;
  dirty: boolean;
  filter: string;
  active: boolean;
}

class Select extends React.Component<SelectProps, SelectState> {
  state: SelectState = {
    selected: [],
    active: false,
    filter: '',
    expanded: false,
    dirty: false,
  };

  private inputElem: HTMLInputElement;

  componentWillMount() {
    if (this.props.defaultSelected && !this.state.dirty) {
      this.setState({
        selected: this.props.defaultSelected,
      });
    }
  }

  componentDidMount() {
    document.body.addEventListener('click', this.clickListener, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.clickListener, false);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.defaultSelected && !this.state.dirty) {
      this.setState({
        selected: nextProps.defaultSelected,
      });
    }
  }

  clickListener = (event: any) => {
    if (
      event.target.classList.contains('menu-item') ||
      event.target.classList.contains('select-input')
    ) {
      return;
    }

    if (this.state.expanded) {
      this.setState({
        expanded: false,
      });
    }
  };

  handleSelect = (item: SelectItem) => {
    const { selected } = this.state;

    const indexOf = selected
      .map((item: SelectItem) => item.value)
      .indexOf(item.value);

    const newState: any = {};

    // If item already is selected, it should be de-selected
    if (indexOf > -1) {
      newState.selected = [
        ...this.state.selected.slice(0, indexOf),
        ...this.state.selected.slice(indexOf + 1),
      ];
    } else {
      // Add item value to selected
      newState.selected = [...this.state.selected, item];
    }

    this.setState(
      {
        ...this.state,
        ...newState,
        dirty: true,
        filter: '',
      },
      () => {
        this.props.onChange && this.props.onChange(this.state.selected);
      }
    );

    this.inputElem.value = '';
    this.inputElem.focus();
  };

  handleExpand(show: boolean): void {
    this.setState({ expanded: show });
  }

  handleInputChange = () => {
    this.setState({ filter: this.inputElem.value });
  };

  searchFilter = (item: SelectItem) => {
    if (!this.state.filter.length) {
      return true;
    }

    return (
      item.label.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1
    );
  };

  render() {
    const { expanded, selected, filter, active } = this.state;
    const { items, placeholder } = this.props;

    const filteredItems = items.filter(this.searchFilter);

    return (
      <Container
        expanded={expanded}
        active={active}
        className="select-container"
      >
        {selected.map(item => (
          <Label
            key={item.value}
            onClick={() => this.handleSelect(item)}
            className="label"
          >
            {item.label} <Icon name="fas fa-times" />
          </Label>
        ))}

        <Input
          type="text"
          className="select-input"
          innerRef={(value: any) => {
            this.inputElem = value;
          }}
          onChange={this.handleInputChange}
          onFocus={() => {
            this.handleExpand(true);
            this.setState({ active: true });
          }}
          onBlur={() => {
            this.setState({ active: false });
          }}
        />

        {!selected.length &&
          !filter.length && (
            <Text
              active={active}
              className="default-text"
              onClick={() => {
                this.inputElem.focus();
              }}
            >
              {placeholder ? (
                <React.Fragment>{placeholder}</React.Fragment>
              ) : (
                <React.Fragment>Filter...</React.Fragment>
              )}
            </Text>
          )}

        <HiddenSelect
          name={this.props.name || ''}
          multiple
          onChange={() => {}}
          value={this.state.selected.map((item: SelectItem) => item.value)}
        >
          {items.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </HiddenSelect>

        <Transition in={expanded} timeout={500}>
          {(state: any) => (
            <Menu
              expanded={expanded}
              active={active}
              transitionState={state}
              className="menu"
            >
              {!filteredItems.length && (
                <NoResults>No results found.</NoResults>
              )}
              {filteredItems.map((item, index) => (
                <MenuItem
                  selected={
                    selected.map(item => item.value).indexOf(item.value) > -1
                  }
                  key={index}
                  className="menu-item"
                  onClick={() => this.handleSelect(item)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          )}
        </Transition>
      </Container>
    );
  }
}

const Container = withProps<
  { expanded: boolean; active: boolean },
  HTMLDivElement
>(styled.div)`
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-size: 1rem;
  position: relative;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 5px;
  margin-bottom: 10px;
  height: 30px;

  ${props => {
    if (props.expanded) {
      return `
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      `;
    }
    return null;
  }}
  ${props => {
    if (props.active) {
      return `
        border-color: #96c8da;
        -webkit-box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
        box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
      `;
    }
    return `
      &:hover {
        border-color: rgba(34, 36, 38, .35);
      }
    `;
  }}
`;

const Label = styled.a`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  font-size: 0.7rem;
  padding: 0.5em 0.8em;
  margin: 0.14285714rem 0.28571429rem 0.14285714rem 0;
  -webkit-box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
  box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset;
  cursor: pointer;
  -webkit-transition: background 0.1s ease;
  transition: background 0.1s ease;
  color: rgba(0, 0, 0, 0.6);
  text-transform: none;
  border: 0 solid transparent;
  border-radius: 0.28571429rem;
  background-color: #e8e8e8;
  line-height: 1;

  &:first-of-type {
    margin-left: 5px;
  }
`;

const Input = styled.input`
  position: static;
  top: 0;
  left: 0;
  border: 0;
  outline: none;

  margin-left: 10px;
  line-height: 100%;
  background: #fff;
  height: calc(100% - 2px);
`;

const NoResults = styled.div`
  padding: 0.78571429rem 1.14285714rem !important;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8rem;
`;

const Text = withProps<{ active: boolean }, HTMLDivElement>(styled.div)`
  cursor: text;
  position: absolute;
  top: 0;
  left: 10px;
  color: rgba(191, 191, 191, 0.87);
  height: 30px;
  line-height: 30px;
  font-size: 0.8rem;

  ${props => {
    if (props.active) {
      return `
        color: rgba(115, 115, 115, .87);
      `;
    }
    return ``;
  }}
`;

const Menu = withProps<
  { expanded: boolean; active: boolean; transitionState: any },
  HTMLDivElement
>(styled.div)`
  position: absolute;
  background: #fff;
  width: 100%;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 5px;
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  left: -1px;
  margin-top: 1px;
  max-height: 0px;
  overflow: hidden;

  ${({ expanded }) =>
    expanded &&
    css`
      border: none;
    `}

  ${({ transitionState }) => {
    if (transitionState === 'entering') {
      return css`
        opacity: 1;
        transition: max-height 0.3s ease-in;
      `;
    }
    if (transitionState === 'entered') {
      return css`
        max-height: 1000px;
        opacity: 1;
        transition: max-height 0.3s ease-in;
      `;
    }
    if (transitionState === 'exiting') {
      return css`
        max-height: 0;
        transition: max-height 0.3s ease-out;
      `;
    }
    if (transitionState === 'exited') {
      return css`
        max-height: 0;
        transition: max-height 0.3s ease-out;
        border: none;
      `;
    }
    return null;
  }}
  
  ${({ active }) =>
    active &&
    css`
      border-color: #96c8da;
      -webkit-box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
      box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    `}
`;

const MenuItem = withProps<{ selected: boolean }, HTMLDivElement>(styled.a)`
  border: none;
  height: auto;
  text-align: left;
  line-height: 1em;
  font-size: 0.8rem;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;
  border-top: 1px solid #fafafa;
  white-space: normal;
  word-wrap: normal;
  padding: .78571429rem 1.14285714rem !important;
  display: block;
  cursor: pointer;
  color: rgba(0, 0, 0, .87);

  &:hover {
    background: rgba(0,0,0,.05);
    color: rgba(0,0,0,.95);
  }

  &:first-of-type {
    border-top: none;
  }

  ${props => {
    if (props.selected) {
      return `
        background: rgba(0,0,0,.03);
        color: rgba(0,0,0,.95);
      `;
    }
    return ``;
  }}
`;

const HiddenSelect = styled.select`
  display: none !important;
`;

export default Select;
