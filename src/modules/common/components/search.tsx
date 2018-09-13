import React from 'react';
import { Icon } from 'genui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { search } from '../store/actions';
import styled, { withProps, css } from '../../../styled/styled-components';
import { compose, withHandlers, withState } from 'recompose';

type Props = {};

type State = {
  value: string;
};

type ActionCreatorProps = {
  search(query: string): any;
};

type HandlerProps = {
  handleSubmit(event: any): void;
  onChange(event: any): void;
};

type StateHandlerProps = {
  setValue(value: string): void;
};

type EnhancedProps = Props &
  State &
  ActionCreatorProps &
  StateHandlerProps &
  HandlerProps;

const Search: React.SFC<EnhancedProps> = ({
  handleSubmit,
  value,
  onChange,
}) => (
  <Container>
    <form onSubmit={handleSubmit}>
      <InputField value={value} onChange={onChange} />
      <SearchButton type="submit">
        <Icon name="fas fa-search" />
      </SearchButton>
    </form>
  </Container>
);

const enhance = compose<EnhancedProps, Props>(
  connect(
    undefined,
    (dispatch: any) => bindActionCreators({ search }, dispatch)
  ),
  withState<Props, string, 'value', 'setValue'>('value', 'setValue', ''),
  withHandlers<EnhancedProps, HandlerProps>({
    handleSubmit: props => (event: any) => {
      event.preventDefault();

      if (!props.value.length) {
        return;
      }

      props.search(props.value);
      props.setValue('');
    },
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
  right: 10px;
  top: 22px;
  background: #fff;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
  opacity: 0.2;
`;
