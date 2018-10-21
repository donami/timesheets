import gql from 'graphql-tag';
import { TICKET_VIEW_FRAGMENT } from './queries';

export const CREATE_TICKET_MUTATION = gql`
  mutation createTicket(
    $title: String!
    $ownerId: ID!
    $type: String!
    $status: String!
    $priority: String!
    $assignedId: ID
    $description: String!
  ) {
    createTicket(
      title: $title
      ownerId: $ownerId
      type: $type
      status: $status
      priority: $priority
      assignedId: $assignedId
      description: $description
    ) {
      ...TicketView
    }
  }
  ${TICKET_VIEW_FRAGMENT}
`;

export const CREATE_TICKET_COMMENT = gql`
  mutation createTicketComment($body: String!, $ownerId: ID!, $ticketId: ID!) {
    createTicketComment(body: $body, ownerId: $ownerId, ticketId: $ticketId) {
      __typename
      id
      body
      createdAt
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_TICKET = gql`
  mutation($id: ID!, $status: String, $assignedId: ID, $type: String) {
    updateTicket(
      id: $id
      status: $status
      assignedId: $assignedId
      type: $type
    ) {
      ...TicketView
    }
  }
  ${TICKET_VIEW_FRAGMENT}
`;

export const UPDATE_TICKET_STATUS = gql`
  mutation updateTicketStatus($id: ID!, $status: String!) {
    updateTicket(id: $id, status: $status) {
      __typename
      id
      updatedAt
      status
    }
  }
`;

export const DELETE_TICKET = gql`
  mutation($id: ID!) {
    deleteTicket(id: $id) {
      __typename
      id
    }
  }
`;
