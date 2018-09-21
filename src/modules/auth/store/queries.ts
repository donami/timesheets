import gql from 'graphql-tag';

export const LOGGED_IN_USER = gql`
  query user {
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
