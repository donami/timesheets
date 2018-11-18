import gql from 'graphql-tag';
import { USER_VIEW_FRAGMENT } from './queries';

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
      ...UserView
      group {
        id
        name
        template {
          id
          name
          hoursDays {
            id
            break
            holiday
            inTime
            outTime
            totalHours
          }
        }
      }
    }
  }
  ${USER_VIEW_FRAGMENT}
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
