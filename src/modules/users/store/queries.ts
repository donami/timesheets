import gql from 'graphql-tag';

export const USER_LIST_ITEM_FRAGMENT = gql`
  fragment UserListItem on User {
    id
    firstName
    lastName
    disabled
    group {
      id
      name
    }
    image {
      __typename
      id
      name
      url
    }
  }
`;

export const GET_USERS = gql`
  query allUsers {
    allUsers {
      ...UserListItem
    }
  }
  ${USER_LIST_ITEM_FRAGMENT}
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
      disabled
      email
      gender
      image {
        __typename
        id
        name
        url
      }
      role
      timesheets {
        id
        status
        periodStart
      }
      projectMember {
        id
        role
        project {
          id
          name
        }
      }
      group {
        id
        name
      }
    }
  }
`;
