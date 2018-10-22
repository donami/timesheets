import React, { Component } from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ToastrItem from './toastr-item';
import styled from '../../../../styled/styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export type ToastItem = {
  id: string;
  type: 'positive' | 'negative' | 'info' | 'warning';
  title: string;
  message: string;
};

export type WithToastrProps = {
  addToast(title: string, message: string, type: string): void;
};

type State = Readonly<{
  items: ToastItem[];
}>;

type Props = {};
type DataProps = {
  data: any;
  loading: boolean;
  updateNetworkStatus(isConnected: boolean): any;
  removeToast(options: any): any;
};
type EnhancedProps = Props & DataProps;

const initialState: State = {
  items: [],
};

class Toastr extends Component<EnhancedProps, State> {
  readonly state = initialState;

  componentWillReceiveProps(nextProps: any) {
    const { data } = nextProps;

    if (data && data.toasts && data.toasts.items) {
      this.onAddNotification(data.toasts.items);
    }
  }

  onAddNotification = (items: any) => {
    this.setState({
      items,
    });
  };

  onRemoveNotification = (id: string) => {
    this.props.removeToast({ variables: { id } });
  };

  render() {
    if (this.props.data.loading) {
      return null;
    }
    return (
      <Container>
        <TransitionGroup>
          {this.state.items.map(item => (
            <CSSTransition key={item.id} timeout={500} classNames="fade">
              <ToastrItem
                key={item.id}
                title={item.title}
                message={item.message}
                type={item.type}
                clearNotification={() => {
                  if (item.id) {
                    this.onRemoveNotification(item.id);
                  }
                }}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );
  }
}

const GET_MESSAGES = gql`
  query {
    toasts @client {
      __typename
      items {
        id
        title
        message
        type
      }
    }
  }
`;

export const ADD_TOAST = gql`
  mutation($title: String!, $message: String!, $type: String!) {
    addToast(title: $title, message: $message, type: $type) @client
  }
`;

const REMOVE_TOAST = gql`
  mutation($id: String!) {
    removeToast(id: $id) @client
  }
`;

export const withToastr = graphql(ADD_TOAST, {
  name: 'addToastMutate',
  props: (props: any) => {
    return {
      addToast: (title: string, message: string, type: string) => {
        if (!props.addToastMutate) {
          return;
        }

        return props.addToastMutate({ variables: { title, message, type } });
      },
    };
  },
});

const enhance = compose(
  graphql(GET_MESSAGES),
  graphql(REMOVE_TOAST, { name: 'removeToast' })
);

export default enhance(Toastr);

const Container = styled.div`
  position: fixed;
  z-index: 999999;
  pointer-events: none;
  top: 12px;
  right: 12px;

  .fade-enter {
    opacity: 0.01;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0.01;
    transition: opacity 500ms ease-in;
  }
`;
