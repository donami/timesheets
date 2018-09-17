import gql from 'graphql-tag';

// TODO: use logged in user query instead
export const GET_AUTHED_USER = gql`
  query getAuthedUser {
    User(id: "cjm20zkac1e6p0157har4nqfb") {
      id
      firstName
      articles {
        id
        title
      }
    }
  }
`;

export const LOGGED_IN_USER = gql`
  query loggedInUser {
    loggedInUser {
      id
      firstName
      lastName
      image
      role
    }
  }
`;
