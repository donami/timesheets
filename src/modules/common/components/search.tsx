import React, { Component } from 'react';
import { Icon } from 'genui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { search } from '../store/actions';
import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {
  search(query: string): any;
};
type State = Readonly<{
  value: string;
}>;

const initialState: State = {
  value: '',
};

class Search extends Component<Props, State> {
  readonly state = initialState;
  inputField: any;

  handleChange = (e: any) => {
    const { value } = e.target;

    this.setState({ value });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (!this.state.value.length) {
      if (this.inputField) {
        this.inputField.focus();
      }
      return;
    }

    this.props.search(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <InputField
            innerRef={inputField => {
              this.inputField = inputField;
            }}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <SearchButton type="submit">
            <Icon name="fas fa-search" />
          </SearchButton>
        </form>
      </Container>
    );
  }
}

export default connect(
  undefined,
  (dispatch: any) => bindActionCreators({ search }, dispatch)
)(Search);

const Container = styled.div`
  position: relative;
`;

const InputField = withProps<{ value: string }, HTMLInputElement>(styled.input)`
  margin: 0;
  max-width: 100%;
  outline: 0;
  text-align: left;
  line-height: 1.2em;
  padding: 0.67em 1em;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  // -webkit-transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  // -webkit-transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  // transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  // -webkit-transition: box-shadow 0.1s ease, border-color 0.1s ease;
  // transition: box-shadow 0.1s ease, border-color 0.1s ease;
  // -webkit-transition: box-shadow 0.1s ease, border-color 0.1s ease,
  //   -webkit-box-shadow 0.1s ease;
  // transition: box-shadow 0.1s ease, border-color 0.1s ease,
  //   -webkit-box-shadow 0.1s ease;
  // -webkit-box-shadow: none;
  box-shadow: none;
  font-family: inherit;
  box-sizing: border-box;

  background: transparent;
  border: none;
  transition: background 0.5s ease;

  &:focus {
    background: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
  }

  ${({ value }) =>
    value.length > 0 &&
    css`
      background: #fff;
      border: 1px solid rgba(34, 36, 38, 0.15);
    `}
`;

const SearchButton = styled.button`
  position: absolute;
  right: 10px
  top: 22px;
  background: #fff;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
  opacity: 0.2;
`;
