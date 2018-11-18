import gql from 'graphql-tag';

export const USER_LIST_ITEM_FRAGMENT = gql`
  fragment UserListItem on User {
    id
    firstName
    lastName
    disabled
    role
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
  query allUsers($companyId: ID!) {
    allUsers(filter: { company: { id: $companyId } }) {
      ...UserListItem
    }
  }
  ${USER_LIST_ITEM_FRAGMENT}
`;
export const USER_VIEW_FRAGMENT = gql`
  fragment UserView on User {
    __typename
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
      __typename
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
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    User(id: $id) {
      ...UserView
    }
  }
  ${USER_VIEW_FRAGMENT}
`;
