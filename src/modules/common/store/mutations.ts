import gql from 'graphql-tag';

export const SEND_EMAIL = gql`
  mutation($email: String!, $subject: String!, $body: String!) {
    sendMail(email: $email, subject: $subject, body: $body) {
      success
    }
  }
`;

export const CREATE_LOG = gql`
  mutation($message: String!, $timesheetId: ID!, $userId: ID!) {
    createLog(message: $message, timesheetId: $timesheetId, userId: $userId) {
      __typename
      id
      message
      createdAt
      user {
        id
      }
      timesheet {
        id
        createdAt
      }
    }
  }
`;
