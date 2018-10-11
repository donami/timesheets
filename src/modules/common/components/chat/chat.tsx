import React from 'react';
import { Mutation, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { History } from 'history';
import { compose } from 'recompose';

import ChatBottom from './chat-bottom';
import { ChatTopActions } from './chat-page';
import ChatPageMessageList from './chat-page-message-list';
import styled from '../../../../styled/styled-components';
import CloseChat from './close-chat';
import ChatUserInfoAction from './chat-user-info-action';

type Props = {
  chatId: string;
  chat: any;
  user: any;
  history: History;
};

type DataProps = {
  updateChatUser(options: any): any;
};
type EnhancedProps = Props & DataProps;

class Chat extends React.Component<EnhancedProps> {
  scrollableContent: HTMLElement;

  componentWillMount() {
    const chatUser = this.props.chat.users.find(
      (item: any) => item.user.id === this.props.user.id
    );

    // If the chat is unread for the user it should be updated as no longer unread
    if (chatUser && chatUser.unread) {
      this.props.updateChatUser({
        variables: {
          chatUserId: chatUser.id,
          unread: false,
        },
      });
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    // scroll chat to bottom
    if (this.scrollableContent) {
      this.scrollableContent.scrollTop = this.scrollableContent.scrollHeight;
    }
  };

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
            <Mutation mutation={SEND_MESSAGE}>
              {sendMessage => (
                <ChatBottom
                  sendMessage={sendMessage}
                  loggedInUserId={user.id}
                  chatUserToId={otherUser.id}
                  chatId={chat.id}
                  scrollChatToBottom={this.scrollToBottom}
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
  mutation(
    $ownerId: ID!
    $message: String!
    $chatId: ID!
    $chatUserToId: ID!
    $lastMessage: DateTime
  ) {
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
    updateChat(id: $chatId, lastMessage: $lastMessage) {
      __typename
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
    updateChatUser(id: $chatUserToId, open: true, unread: true) {
      __typename
      id
    }
  }
`;

export const UPDATE_CHAT_USER = gql`
  mutation($chatUserId: ID!, $open: Boolean, $unread: Boolean) {
    updateChatUser(id: $chatUserId, open: $open, unread: $unread) {
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

export default compose<EnhancedProps, Props>(
  graphql(UPDATE_CHAT_USER, { name: 'updateChatUser' })
)(Chat);

const ChatTop = styled.div`
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
  padding-left: 20px;
`;

const ChatContent = styled.div`
  height: calc(100% - 61px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #e9ecf2;
`;

const ChatMessages = styled.div`
  overflow-y: auto;
`;

const ChatBottomContainer = styled.div`
  padding: 10px;
  border-top: #e8e8e8 1px solid;
  background: #fff;
`;
