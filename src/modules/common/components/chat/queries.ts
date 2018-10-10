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
