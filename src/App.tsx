import * as React from 'react';
// import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import uuidv4 from 'uuid/v4';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';
import gql from 'graphql-tag';

// import store from './store';
import { Routing, Toastr } from './modules/common';
import { theme } from './styled/theme';
import { resolvers, defaults } from './resolvers';
import { API_ENDPOINT } from './config/constants';

const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink,
} = createNetworkStatusNotifier();

const request = async (operation: any) => {
  const token = localStorage.getItem('token');
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
};

export const StatusNotifier = NetworkStatusNotifier;

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          if (forward) {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          }
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const stateLink = withClientState({
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
    toasts: {
      __typename: 'Toasts',
      items: [],
    },
    search: {
      __typename: 'Search',
      value: '',
    },
    helpSearch: {
      __typename: 'HelpSearch',
      value: '',
    },
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_: any, { isConnected }: any, { cache }: any) => {
        cache.writeData({
          data: {
            networkStatus: {
              isConnected,
              __typename: 'NetworkStatus',
            },
          },
        });
        return null;
      },
      search: (_: any, { value }: any, { cache }: any) => {
        cache.writeData({
          data: {
            search: {
              value,
              __typename: 'Search',
            },
          },
        });
        return null;
      },
      helpSearch: (_: any, { value }: any, { cache }: any) => {
        cache.writeData({
          data: {
            helpSearch: {
              value,
              __typename: 'HelpSearch',
            },
          },
        });
        return null;
      },
      addToast: (
        _: any,
        {
          title,
          message,
          type,
        }: { title: string; message: string; type: string },
        { cache }: any
      ) => {
        const query = gql`
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
        const previous = cache.readQuery({ query });
        cache.writeData({
          data: {
            toasts: {
              items: previous.toasts.items.concat({
                title,
                message,
                type,
                id: uuidv4(),
                __typename: 'ToastItem',
              }),
              __typename: 'Toasts',
            },
          },
        });
        return null;
      },
      removeToast: (_: any, { id }: { id: string }, { cache }: any) => {
        const query = gql`
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
        const previous = cache.readQuery({ query });
        cache.writeData({
          data: {
            toasts: {
              items: previous.toasts.items.filter(
                (item: any) => item.id !== id
              ),
              __typename: 'Toasts',
            },
          },
        });
        return null;
      },
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    requestLink,
    networkStatusNotifierLink,
    stateLink,
    new HttpLink({
      uri: API_ENDPOINT,
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
});

injectGlobal`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    color: ${theme.textColor};
  }
  a {
    color: ${theme.linkColor};
  }
  #root {
    height: 100%;
  }
`;

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <React.Fragment>
          <Toastr />
          <Routing />
        </React.Fragment>
      </ApolloProvider>
    );
  }
}

export default App;
