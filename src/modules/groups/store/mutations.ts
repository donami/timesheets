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
  ) {
    updateGroup(
      id: $id
      name: $name
      projectId: $projectId
      templateId: $templateId
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
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createGroup($name: String!, $projectId: ID, $templateId: ID) {
    createGroup(name: $name, projectId: $projectId, templateId: $templateId) {
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
    }
  }
`;
