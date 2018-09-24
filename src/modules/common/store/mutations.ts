import gql from 'graphql-tag';

export const SEND_EMAIL = gql`
  mutation($email: String!, $subject: String!, $body: String!) {
    sendMail(email: $email, subject: $subject, body: $body) {
      success
    }
  }
`;
