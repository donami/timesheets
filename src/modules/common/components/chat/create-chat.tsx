import React, { Component } from 'react';
import { Button } from 'genui';
import { Mutation, Query } from 'react-apollo';
import { History } from 'history';
import gql from 'graphql-tag';

import { LOGGED_IN_USER } from '../../../auth/store/queries';
import OpenChat from './open-chat';
import { GET_CHATS } from './queries';

type Props = {
  history: History;
  otherUser: any;
  children: React.ReactNode;
};

class CreateChat extends Component<Props> {
  render() {
    const { otherUser, history, children } = this.props;

    return (
      <Query query={LOGGED_IN_USER}>
        {({ data: { user: authedUser }, loading }) => {
          if (loading) {
            return null;
          }
          // User should not be able to chat with himself
          if (authedUser.id === otherUser.id) {
            return null;
          }
          return (
            <Query
              query={GET_EXISTING_CHAT}
              variables={{
                loggedInUser: authedUser.id,
                otherUser: otherUser.id,
              }}
            >
              {({ data: { allChats }, loading }) => {
                if (loading) {
                  return null;
                }

                if (allChats.length > 0) {
                  return (
                    <OpenChat
                      chat={allChats[0]}
                      history={history}
                      loggedInUserId={authedUser.id}
                    >
                      {children}
                    </OpenChat>
                  );
                }

                return (
                  <Mutation
                    mutation={CREATE_CHAT}
                    update={(proxy, { data: { createChat } }) => {
                      const cache: any = proxy.readQuery({
                        query: GET_CHATS,
                        variables: { userId: authedUser.id },
                      });

                      proxy.writeQuery({
                        query: GET_CHATS,
                        data: {
                          user: cache.user,
                          allChats: cache.allChats.concat(createChat),
                        },
                        variables: {
                          userId: authedUser.id,
                        },
                      });

                      if (createChat && createChat.id) {
                        history.push(`/messages/${createChat.id}`);
                      }
                    }}
                  >
                    {createChat => (
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          createChat({
                            variables: {
                              loggedInUser: authedUser.id,
                              otherUser: otherUser.id,
                              lastMessage: new Date(),
                            },
                          });
                        }}
                      >
                        {children}
                      </div>
                    )}
                  </Mutation>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default CreateChat;

const CREATE_CHAT = gql`
  mutation($loggedInUser: ID!, $otherUser: ID!, $lastMessage: DateTime!) {
    createChat(
      lastMessage: $lastMessage
      users: [
        { open: true, unread: false, userId: $loggedInUser }
        { open: false, unread: false, userId: $otherUser }
      ]
    ) {
      id
      lastMessage
      messages {
        id
        message
        createdAt
        owner {
          id
          firstName
          lastName
        }
      }
      users {
        id
        unread
        open
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const GET_EXISTING_CHAT = gql`
  query($loggedInUser: ID!, $otherUser: ID!) {
    allChats(
      filter: {
        users_every: {
          OR: [{ user: { id: $loggedInUser } }, { user: { id: $otherUser } }]
        }
      }
    ) {
      id
      messages {
        id
        message
        createdAt
        owner {
          id
          firstName
          lastName
        }
      }
      users {
        id
        open
        unread
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
