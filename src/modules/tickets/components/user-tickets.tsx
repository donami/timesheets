import React from 'react';
import { PageLoader } from '../../ui';
import { Query } from 'react-apollo';
import { TICKET_LIST_ITEM_FRAGMENT } from '../store/queries';
import gql from 'graphql-tag';
import { List, Button } from 'genui';
import { Card, Elevation } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import styled from '../../../styled/styled-components';
import TicketStatusLabel from './ticket-status-label';

type Props = {
  userId: string;
};

const UserTickets: React.SFC<Props> = ({ userId }) => {
  return (
    <Query query={GET_USER_TICKETS} variables={{ ownerId: userId }}>
      {({ data: { allTickets }, loading }) => {
        if (loading) {
          return <PageLoader />;
        }

        return (
          <div>
            {!allTickets.length && (
              <Card elevation={Elevation.ZERO}>You have no open tickets.</Card>
            )}
            {!!allTickets.length && (
              <div>
                {allTickets.map((ticket: any) => (
                  <Card
                    key={ticket.id}
                    elevation={Elevation.ZERO}
                    style={{ marginBottom: 10 }}
                  >
                    <Top>
                      <h3>
                        <Link to={`/help-desk/ticket/${ticket.id}`}>
                          {ticket.title}
                        </Link>
                      </h3>
                      <div>
                        <TicketStatusLabel status={ticket.status} />
                      </div>
                    </Top>
                    <p>{ticket.description}</p>
                    <Button to={`/help-desk/ticket/${ticket.id}`} color="blue">
                      View ticket
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
      }}
    </Query>
  );
};

export const GET_USER_TICKETS = gql`
  query($ownerId: ID!) {
    allTickets(filter: { owner: { id: $ownerId } }) {
      ...TicketListItem
    }
  }
  ${TICKET_LIST_ITEM_FRAGMENT}
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 1.2em;
    margin-top: 0;
  }
`;

export default UserTickets;
