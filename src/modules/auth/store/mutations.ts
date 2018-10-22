import gql from 'graphql-tag';

export const CREATE_NOTIFICATION = gql`
  mutation(
    $message: String!
    $icon: String!
    $notificationType: String!
    $userId: ID!
  ) {
    createNotification(
      message: $message
      icon: $icon
      notificationType: $notificationType
      userId: $userId
      unread: true
    ) {
      __typename
      id
      icon
      notificationType
      unread
    }
  }
`;
