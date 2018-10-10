import gql from 'graphql-tag';

export const CHAT_USER_INFO_MUTATION = gql`
  mutation($user: String, $open: Boolean) {
    chatUserInfo(user: $user, open: $open) @client
  }
`;
