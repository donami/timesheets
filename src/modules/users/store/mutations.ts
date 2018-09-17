import gql from 'graphql-tag';

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $role: String
    $groupId: ID
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      role: $role
      groupId: $groupId
    ) {
      id
      firstName
      lastName
      role
      group {
        id
        name
      }
    }
  }
`;

export const DISABLE_USER = gql`
  mutation disableUser($id: ID!) {
    updateUser(id: $id, disabled: true) {
      id
      disabled
    }
  }
`;

export const ENABLE_USER = gql`
  mutation disableUser($id: ID!) {
    updateUser(id: $id, disabled: false) {
      id
      disabled
    }
  }
`;
