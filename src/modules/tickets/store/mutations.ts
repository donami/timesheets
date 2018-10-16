import gql from 'graphql-tag';

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
      id
      title
      createdAt
      updatedAt
      owner {
        id
        firstName
        lastName
        email
      }
      type
      status
      priority
      assigned {
        id
        firstName
        lastName
      }
      description
      comments {
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
  }
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
  mutation($id: ID!, $status: String, $assignedId: ID) {
    updateTicket(id: $id, status: $status, assignedId: $assignedId) {
      __typename
      id
      title
      createdAt
      updatedAt
      owner {
        id
        firstName
        lastName
        email
      }
      type
      status
      priority
      assigned {
        id
        firstName
        lastName
      }
      description
      comments {
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
  }
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
