import React from 'react';
import { Icon } from 'genui';
import { withRouter } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose, withHandlers, withState } from 'recompose';

import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {};

type State = {
  value: string;
  focused: boolean;
};

type DataProps = {
  history: any;
  searchMutation(options: any): any;
};
type ActionCreatorProps = {
  search(query: string): any;
};

type HandlerProps = {
  onChange(event: any): void;
};

type StateHandlerProps = {
  setValue(value: string): void;
  setFocused(focused: boolean): void;
};

type EnhancedProps = Props &
  State &
  DataProps &
  ActionCreatorProps &
  StateHandlerProps &
  HandlerProps;

class Search extends React.Component<EnhancedProps> {
  inputElement: any;

  handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!this.props.value.length) {
      if (!this.props.focused) {
        this.inputElement.focus();
        this.props.setFocused(true);
      }
      return;
    }

    await this.props.searchMutation({ variables: { value: this.props.value } });
    this.props.setValue('');
    this.props.history.push('/search');
  };
  render() {
    const { value, onChange, setFocused } = this.props;
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <InputField
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            innerRef={node => (this.inputElement = node)}
          />
          <SearchButton type="submit">
            <Icon name="fas fa-search" />
          </SearchButton>
        </form>
      </Container>
    );
  }
}

const SEARCH = gql`
  mutation($value: string) {
    search(value: $value) @client
  }
`;

const enhance = compose<EnhancedProps, Props>(
  withRouter,
  graphql(SEARCH, { name: 'searchMutation' }),
  withState<Props, string, 'value', 'setValue'>('value', 'setValue', ''),
  withState<Props, boolean, 'focused', 'setFocused'>(
    'focused',
    'setFocused',
    false
  ),
  withHandlers<EnhancedProps, HandlerProps>({
    onChange: props => (event: any) => {
      const { value } = event.target;

      props.setValue(value);
    },
  })
);

export default enhance(Search);

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
  box-shadow: none;
  font-family: inherit;
  box-sizing: border-box;

  background: transparent;
  border: none;
  transition: background 0.5s ease;

  width: 0px;
  cursor: pointer;

  -webkit-transition: width .5s;
	-moz-transition: width .5s;
	transition: width .5s;

  &:focus {
    width: 200px;
    background: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    cursor: initial;
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
  right: 10px;
  top: 22px;
  background: #fff;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
  opacity: 0.2;
`;
