import gql from 'graphql-tag';

export const LOGGED_IN_USER = gql`
  query user {
    user {
      id
      firstName
      lastName
      company {
        id
        subscriptionEnds
        subscriptionStatus
      }
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
