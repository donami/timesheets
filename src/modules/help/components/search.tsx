import React, { Component } from 'react';
import { Icon } from 'genui';

import styled, { withProps, css } from '../../../styled/styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchArticlesClear, searchArticles } from '../store/actions';
import { getArticleSearchQuery } from '../store/selectors';

type Props = {
  query: string;
  clearSearch: () => any;
  searchArticles: (query: string) => any;
};
type State = Readonly<{
  focused: boolean;
  value: string;
}>;

const initialState: State = {
  focused: false,
  value: '',
};

class Search extends Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    if (this.props.query) {
      this.setState({ value: this.props.query });
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (this.state.value.length) {
      this.props.searchArticles(this.state.value);
    }
  };

  handleFocus = (e: any) => {
    this.setState({ focused: true });
  };

  handleBlur = (e: any) => this.setState({ focused: false });

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as any;

    this.setState({ value });
  };

  handleClear = (e: any) => {
    this.setState({ value: '' });
    this.props.clearSearch();
  };

  render() {
    const { focused, value } = this.state;

    return (
      <Container>
        <h3>Help Center</h3>
        <Form onSubmit={this.handleSubmit}>
          <Input
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            value={value}
            placeholder="Search in our Help Center..."
          />
          <SearchButton type="submit" focused={focused}>
            <Icon name="fas fa-search" />
          </SearchButton>

          <ClearButton
            focused={focused}
            hasValue={value.length > 0}
            onClick={this.handleClear}
          >
            <Icon name="fas fa-times" />
          </ClearButton>
        </Form>
      </Container>
    );
  }
}

const Container = styled.div`
  background-color: #9088d9;
  padding: 25px;
  color: #fff;

  h3 {
    margin: 0;
    margin-bottom: 10px;
    font-weight: 300;
    text-transform: uppercase;
  }
`;

const Form = styled.form`
  position: relative;
`;

const SearchButton = withProps<{ focused: boolean }, HTMLButtonElement>(
  styled.button
)`
  position: absolute;
  top: 50%;
  left: 19px;
  width: 22px;
  height: 22px;
  border: none;
  background: transparent;
  margin-top: -10px;
  outline: none;
  cursor: pointer;
  -webkit-transition: -webkit-transform 0.1s linear;
  transition: -webkit-transform 0.1s linear;
  transition: transform 0.1s linear;
  transition: transform 0.1s linear, -webkit-transform 0.1s linear;

  i,
  svg {
    font-size: 1.5em;
    color: #fff;
    ${({ focused }) =>
      focused &&
      css`
        color: #9fa0a8;
      `}
  }
`;

const ClearButton = withProps<
  { focused: boolean; hasValue: boolean },
  HTMLButtonElement
>(styled.button)`
  position: absolute;
  right: 0;
  top: 50%;
  width: 32px;
  height: 32px;
  margin-top: -14px;
  color: #fff;
  background: transparent;
  border: 0;
  display: none;
  cursor: pointer;
  outline: none;

  ${({ hasValue }) =>
    hasValue &&
    css`
      display: block;
    `}

  i,
  svg {
    color: #fff;
    ${({ focused }) =>
      focused &&
      css`
        color: #9fa0a8;
      `}
  }
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 32px 16px 59px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  -webkit-transition: background 0.4s, box-shadow 0.2s;
  transition: background 0.4s, box-shadow 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:active,
  &:focus {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.14);
    background: white;
    color: #3a3c4c;
  }
`;

export default connect(
  (state: any) => ({
    query: getArticleSearchQuery(state),
  }),
  (dispatch: any) =>
    bindActionCreators(
      { searchArticles, clearSearch: searchArticlesClear },
      dispatch
    )
)(Search);
