import gql from 'graphql-tag';

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!, $userId: ID!, $role: String!) {
    createProject(name: $name, members: { userId: $userId, role: $role }) {
      id
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

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: ID!, $name: String!) {
    updateProject(id: $id, name: $name) {
      id
      name
    }
  }
`;
