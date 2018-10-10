import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { History } from 'history';
import { Icon } from 'genui';

import ChatBottom from './chat-bottom';
import { ChatTop, CHAT_QUERY, ChatTopActions } from './chat-page';
import ChatPageMessageList from './chat-page-message-list';
import styled from '../../../../styled/styled-components';
import CloseChat from './close-chat';
import { GET_CHATS } from './chat-page-chats';
import ChatUserInfoAction from './chat-user-info-action';

type Props = {
  chatId: string;
  chat: any;
  user: any;
  history: History;
};

class Chat extends React.Component<Props> {
  scrollableContent: HTMLElement;

  render() {
    const { chatId, chat, user, history } = this.props;
    const chatAuthedUser = chat.users.find(
      (chatUser: any) => chatUser.user.id === user.id
    );
    const otherUser = chat.users.find(
      (other: any) => other.user.id !== user.id
    );

    return (
      <>
        <ChatTop>
          <div>{`${otherUser.user.firstName} ${otherUser.user.lastName}`}</div>

          <ChatTopActions>
            <ChatUserInfoAction userId={otherUser.user.id} />
            <CloseChat
              chatAuthedUser={chatAuthedUser}
              authedUserId={user.id}
              history={history}
            />
          </ChatTopActions>
        </ChatTop>
        <ChatContent>
          <ChatMessages
            className="chat-messages"
            innerRef={(node: any) => (this.scrollableContent = node)}
          >
            <ChatPageMessageList
              loggedInUserId={user.id}
              messages={chat.messages}
            />
          </ChatMessages>
          <ChatBottomContainer>
            <Mutation
              mutation={SEND_MESSAGE}
              update={(proxy, { data: { createChatMessage } }) => {
                const { Chat, user }: any = proxy.readQuery({
                  query: CHAT_QUERY,
                  variables: { id: chatId },
                });

                proxy.writeQuery({
                  query: CHAT_QUERY,
                  data: {
                    Chat: {
                      ...Chat,
                      messages: Chat.messages.concat(createChatMessage),
                    },
                    user: {
                      ...user,
                    },
                  },
                  variables: {
                    id: chatId,
                  },
                });

                // scroll chat to bottom
                if (this.scrollableContent) {
                  setTimeout(() => {
                    this.scrollableContent.scrollTop = this.scrollableContent.scrollHeight;
                  }, 10);
                }
              }}
            >
              {sendMessage => (
                <ChatBottom
                  sendMessage={sendMessage}
                  loggedInUserId={user.id}
                  chatUserToId={otherUser.id}
                  chatId={chat.id}
                />
              )}
            </Mutation>
          </ChatBottomContainer>
        </ChatContent>
      </>
    );
  }
}

const SEND_MESSAGE = gql`
  mutation($ownerId: ID!, $message: String!, $chatId: ID!, $chatUserToId: ID!) {
    createChatMessage(message: $message, chatId: $chatId, ownerId: $ownerId) {
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
    updateChatUser(id: $chatUserToId, open: true, unread: true) {
      __typename
      id
    }
  }
`;

export const UPDATE_CHAT_USER = gql`
  mutation($chatUserId: ID!, $open: Boolean) {
    updateChatUser(id: $chatUserId, open: $open) {
      __typename
      id
      unread
      open
      user {
        id
        firstName
        lastName
      }
      chat {
        __typename
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
          __typename
          id
          unread
          open
          user {
            __typename
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export default Chat;

const ChatContent = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
`;

const ChatMessages = styled.div`
  overflow-y: auto;
`;

const ChatBottomContainer = styled.div`
  padding: 10px;
  border-top: #e8e8e8 1px solid;
  background: #fff;
`;
