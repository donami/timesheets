import * as React from 'react';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';
import ReduxToastr from 'react-redux-toastr';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import uuidv4 from 'uuid/v4';

import store from './store';
import { Routing, Toastr } from './modules/common';
import { theme } from './styled/theme';
import { resolvers, defaults } from './resolvers';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjm0xg5hy3mgf0179l9ffcdoc',
  clientState: {
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
  },
  // clientState: {
  //   defaults,
  //   resolvers,
  // },
  request: async operation => {
    const token = localStorage.getItem('token');
    const authorizationHeader = token ? `Bearer ${token}` : null;
    operation.setContext({
      headers: {
        authorization: authorizationHeader,
      },
    });
  },
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
