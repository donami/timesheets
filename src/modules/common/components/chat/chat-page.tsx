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
                return null;
              }

              return (
                <ChatPageChats loggedInUserId={user.id} activeChatId={chatId} />
              );
            }}
          </Query>
        </LeftNode>
        <RightNode>
          {chatId && (
            <Query query={CHAT_QUERY} variables={{ id: chatId }}>
              {({ data: { Chat: chat, user }, loading }) => {
                if (loading) {
                  return null;
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

export const ChatTop = styled.div`
  background: #fff;
  border-bottom: #e8e8e8 1px solid;
  font-size: 1.3em;
  text-transform: uppercase;
  font-weight: 300;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
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
