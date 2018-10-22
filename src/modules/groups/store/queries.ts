import gql from 'graphql-tag';

export const GROUP_LIST_ITEM_FRAGMENT = gql`
  fragment GroupListItem on Group {
    id
    name
    project {
      id
      name
    }
  }
`;

export const GET_GROUPS = gql`
  query allGroups {
    allGroups {
      ...GroupListItem
    }
  }
  ${GROUP_LIST_ITEM_FRAGMENT}
`;

export const GET_GROUP = gql`
  query getGroup($id: ID!) {
    Group(id: $id) {
      id
      name
      project {
        id
        name
      }
      users {
        id
        firstName
        lastName
        email
        role
      }
      template {
        id
        name
        hoursDays {
          id
          totalHours
          inTime
          outTime
        }
      }
    }
  }
`;
