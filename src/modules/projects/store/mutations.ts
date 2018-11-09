import gql from 'graphql-tag';

export const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $userId: ID!
    $role: String!
    $companyId: ID!
  ) {
    createProject(
      name: $name
      companyId: $companyId
      members: { userId: $userId, role: $role }
    ) {
      id
      company {
        id
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const DELETE_PROJECT_MEMBER = gql`
  mutation($id: ID!) {
    deleteProjectMember(id: $id) {
      id
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: ID!, $name: String!) {
    updateProject(id: $id, name: $name) {
      id
      name
    }
  }
`;
