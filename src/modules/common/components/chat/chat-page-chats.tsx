import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ChatList from './chat-list';
import styled from '../../../../styled/styled-components';

type Props = {
  loggedInUserId: string;
  activeChatId: string;
};

const ChatPageChats: React.SFC<Props> = ({ loggedInUserId, activeChatId }) => {
  return (
    <Container>
      <Query query={GET_CHATS} variables={{ userId: loggedInUserId }}>
        {({ data: { allChats, user }, loading }) => {
          if (loading) {
            return null;
          }
          return (
            <ChatList
              chats={allChats}
              loggedInUser={user}
              noTitle
              activeChatId={activeChatId}
            />
          );
        }}
      </Query>
    </Container>
  );
};

export const GET_CHATS = gql`
  query($userId: ID!) {
    allChats(filter: { users_some: { user: { id: $userId }, open: true } }) {
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
    user {
      id
      firstName
      lastName
      image {
        __typename
        id
        name
        url
      }
      role
    }
  }
`;

export default ChatPageChats;

const Container = styled.div`
  height: calc(100% - 40px);
  overflow-y: auto;

  /* .feed-item {
    &:hover {
      background: rgba(0, 0, 0, 0.08);
      cursor: pointer;
    }
  } */
`;
