import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Ticket } from './types';

type GetTicketQuery = {
  Ticket: Ticket;
};

export class TicketQuery extends Query<
  GetTicketQuery,
  GetTicketQueryVariables
> {}

type GetTicketQueryVariables = {
  id: string;
};

export const GET_TICKET = gql`
  query($id: ID!) {
    Ticket(id: $id) {
      id
      title
      createdAt
      updatedAt
      owner {
        id
        firstName
        lastName
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

type GetAllTicketsQuery = {
  allTickets: Ticket[];
};

export class AllTicketsQuery extends Query<
  GetAllTicketsQuery,
  GetAllTicketQueryVariables
> {}

type GetAllTicketQueryVariables = {};

export const GET_ALL_TICKETS = gql`
  query {
    allTickets {
      id
      title
      createdAt
      updatedAt
      owner {
        id
        firstName
        lastName
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
