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
    $gender: String
    $role: String
    $groupId: ID
    $imageId: ID
    $companyId: ID
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      role: $role
      groupId: $groupId
      imageId: $imageId
      companyId: $companyId
    ) {
      id
      firstName
      lastName
      gender
      image {
        __typename
        id
        name
        url
      }
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
