import gql from 'graphql-tag';

export const CHAT_USER_INFO_QUERY = gql`
  query {
    chatUserInfo @client {
      __typename
      user
      open
    }
  }
`;

export const GET_CHATS = gql`
  query($userId: ID!) {
    allChats(
      orderBy: lastMessage_DESC
      filter: { users_some: { user: { id: $userId }, open: true } }
    ) {
      __typename
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
