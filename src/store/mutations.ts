import gql from 'graphql-tag';

export const ADD_USER_TO_GROUP = gql`
  mutation addUserToGroup($userId: ID!, $groupId: ID!) {
    addToGroupUsers(groupGroupId: $groupId, usersUserId: $userId) {
      usersUser {
        id
        firstName
      }
      groupGroup {
        id
        name
      }
    }
  }
`;

export const CREATE_PROJECT_MEMBER = gql`
  mutation createProjectMember($userId: ID!, $projectId: ID!) {
    createProjectMember(role: "USER", projectId: $projectId, userId: $userId) {
      id
    }
  }
`;
