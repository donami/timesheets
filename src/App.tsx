import * as React from 'react';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';
import ReduxToastr from 'react-redux-toastr';
// import ApolloClient, { gql } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import uuidv4 from 'uuid/v4';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

import store from './store';
import { Routing, Toastr } from './modules/common';
import { theme } from './styled/theme';
import { resolvers, defaults } from './resolvers';
import gql from 'graphql-tag';

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
      uri: 'https://api.graph.cool/simple/v1/cjm8wc3kb0fyb0179vjvepbts',
      // uri: 'https://api.graph.cool/simple/v1/cjm0xg5hy3mgf0179l9ffcdoc',
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
});

// TODO: Apollo Boost, remove
// const client = new ApolloClient({
//   uri: 'https://api.graph.cool/simple/v1/cjm0xg5hy3mgf0179l9ffcdoc',
//   clientState: {
//     defaults: {
//       networkStatus: {
//         __typename: 'NetworkStatus',
//         isConnected: true,
//       },
//       toasts: {
//         __typename: 'Toasts',
//         items: [],
//       },
//     },
//     resolvers: {
//       Mutation: {
//         updateNetworkStatus: (_: any, { isConnected }: any, { cache }: any) => {
//           cache.writeData({
//             data: {
//               networkStatus: {
//                 isConnected,
//                 __typename: 'NetworkStatus',
//               },
//             },
//           });
//           return null;
//         },
//         addToast: (
//           _: any,
//           {
//             title,
//             message,
//             type,
//           }: { title: string; message: string; type: string },
//           { cache }: any
//         ) => {
//           const query = gql`
//             query {
//               toasts @client {
//                 __typename
//                 items {
//                   id
//                   title
//                   message
//                   type
//                 }
//               }
//             }
//           `;
//           const previous = cache.readQuery({ query });
//           cache.writeData({
//             data: {
//               toasts: {
//                 items: previous.toasts.items.concat({
//                   title,
//                   message,
//                   type,
//                   id: uuidv4(),
//                   __typename: 'ToastItem',
//                 }),
//                 __typename: 'Toasts',
//               },
//             },
//           });
//           return null;
//         },
//         removeToast: (_: any, { id }: { id: string }, { cache }: any) => {
//           const query = gql`
//             query {
//               toasts @client {
//                 __typename
//                 items {
//                   id
//                   title
//                   message
//                   type
//                 }
//               }
//             }
//           `;
//           const previous = cache.readQuery({ query });
//           cache.writeData({
//             data: {
//               toasts: {
//                 items: previous.toasts.items.filter(
//                   (item: any) => item.id !== id
//                 ),
//                 __typename: 'Toasts',
//               },
//             },
//           });
//           return null;
//         },
//       },
//     },
//   },
//   request: async operation => {
//     const token = localStorage.getItem('token');
//     const authorizationHeader = token ? `Bearer ${token}` : null;
//     operation.setContext({
//       headers: {
//         authorization: authorizationHeader,
//       },
//     });
//   },
// });

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
        <Provider store={store}>
          <React.Fragment>
            <Toastr />
            <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              preventDuplicates
              position="top-left"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar
            />
            <Routing />
          </React.Fragment>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
