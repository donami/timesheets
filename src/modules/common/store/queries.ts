import gql from 'graphql-tag';

export const ALL_LOGS = gql`
  query {
    allLogs {
      __typename
      id
      message
      user {
        id
      }
      timesheet {
        id
      }
    }
  }
`;
