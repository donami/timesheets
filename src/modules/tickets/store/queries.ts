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

export const TICKET_VIEW_FRAGMENT = gql`
  fragment TicketView on Ticket {
    id
    title
    createdAt
    updatedAt
    owner {
      id
      firstName
      lastName
      email
      image {
        id
        url
      }
    }
    type
    status
    priority
    assigned {
      id
      firstName
      lastName
      image {
        id
        url
      }
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
        image {
          id
          url
        }
      }
    }
  }
`;

export const GET_TICKET = gql`
  query($id: ID!) {
    Ticket(id: $id) {
      ...TicketView
    }
  }
  ${TICKET_VIEW_FRAGMENT}
`;

type GetAllTicketsQuery = {
  allTickets: Ticket[];
};

export class AllTicketsQuery extends Query<
  GetAllTicketsQuery,
  GetAllTicketQueryVariables
> {}

type GetAllTicketQueryVariables = {
  companyId: string;
};

export const TICKET_LIST_ITEM_FRAGMENT = gql`
  fragment TicketListItem on Ticket {
    id
    title
    createdAt
    updatedAt
    owner {
      id
      firstName
      lastName
      email
      image {
        id
        url
      }
    }
    type
    status
    priority
    assigned {
      id
      firstName
      lastName
      image {
        id
        url
      }
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
        image {
          id
          url
        }
      }
    }
  }
`;

export const GET_ALL_TICKETS = gql`
  query($companyId: ID!) {
    allTickets(filter: { owner: { company: { id: $companyId } } }) {
      ...TicketListItem
    }
  }
  ${TICKET_LIST_ITEM_FRAGMENT}
`;
