import gql from 'graphql-tag';

export const DELETE_GROUP = gql`
  mutation deleteGroup($id: ID!) {
    deleteGroup(id: $id) {
      id
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup(
    $id: ID!
    $name: String!
    $projectId: ID
    $templateId: ID
    $usersIds: [ID!]
  ) {
    updateGroup(
      id: $id
      name: $name
      projectId: $projectId
      templateId: $templateId
      usersIds: $usersIds
    ) {
      id
      name
      project {
        id
        name
      }
      template {
        id
        name
      }
      users {
        id
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createGroup(
    $name: String!
    $projectId: ID
    $templateId: ID
    $usersIds: [ID!]
  ) {
    createGroup(
      name: $name
      projectId: $projectId
      templateId: $templateId
      usersIds: $usersIds
    ) {
      id
      name
      project {
        id
        name
      }
      template {
        id
        name
      }
      users {
        id
        firstName
        lastName
      }
    }
  }
`;
