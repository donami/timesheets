import React, { Component } from 'react';
import { Button, Input } from 'genui';
import { History } from 'history';
import { match } from 'react-router';
import { Query, Mutation } from 'react-apollo';

import styled, { withProps, css } from '../../../../styled/styled-components';
import { Avatar } from '../../components';
import ChatPageMessageList from './chat-page-message-list';
import gql from 'graphql-tag';
import ChatPageChats from './chat-page-chats';
import { LOGGED_IN_USER } from '../../../auth/store/queries';
import Chat from './chat';
import ChatUserInfo from './chat-user-info';
import ChatLoader from './chat-loader';

type Props = {
  match: match<any>;
  history: History;
};

class ChatPage extends Component<Props> {
  render() {
    const {
      match: { params },
      history,
    } = this.props;

    const chatId = params.chatId;

    return (
      <Container>
        <ChatUserInfo />
        <LeftNode>
          <div>
            <h3>Inbox</h3>
          </div>

          <Query query={LOGGED_IN_USER}>
            {({ data: { user }, loading }) => {
              if (loading) {
                return <ChatLoader />;
              }

              return (
                <ChatPageChats loggedInUserId={user.id} activeChatId={chatId} />
              );
            }}
          </Query>
        </LeftNode>
        <RightNode>
          {!chatId && (
            <NoSelectedChat>
              <h3>Hello there!</h3>
              <p>Start chatting by selecting an open chat to the left</p>
            </NoSelectedChat>
          )}
          {chatId && (
            <Query query={CHAT_QUERY} variables={{ id: chatId }}>
              {({ data: { Chat: chat, user }, loading }) => {
                if (loading) {
                  return <ChatLoader />;
                }

                return (
                  <Chat
                    chatId={chatId}
                    chat={chat}
                    user={user}
                    history={history}
                  />
                );
              }}
            </Query>
          )}
        </RightNode>
      </Container>
    );
  }
}

export const CHAT_QUERY = gql`
  query($id: ID!) {
    Chat(id: $id) {
      id
      lastMessage
      messages {
        __typename
        id
        message
        createdAt
        owner {
          id
          image {
            id
            url
          }
        }
      }
      users {
        __typename
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
    user {
      id
    }
  }
`;

export default ChatPage;

const Container = styled.div`
  display: flex;
  height: calc(100% - 2px);
  border: #e8e8e8 1px solid;
  position: relative;
  overflow: hidden;
`;

const LeftNode = styled.div`
  flex: 1;
  background: #252b32;
  border-right: #e8e8e8 1px solid;

  > div > h3 {
    color: #fff;
    padding: 20px;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 1.4em;
    border-bottom: #40454c 1px solid;
    margin: 0;
  }
`;

const RightNode = styled.div`
  flex: 2;
`;

export const ChatTopActions = styled.div`
  height: 100%;

  > div {
    height: 100%;
    width: 60px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #d4d6d9;
    color: #81868c;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const NoSelectedChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-style: italic;

  h3 {
    font-size: 1.8em;
    font-weight: 300;
    margin: 0;
    font-size: 2.4em;
  }
  p {
    font-size: 1.1em;
  }
`;
