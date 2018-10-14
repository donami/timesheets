import React from 'react';
import { Button, Icon } from 'genui';
import { Mutation } from 'react-apollo';

import styled from '../../../styled/styled-components';
import { UPDATE_TICKET_STATUS } from '../store/mutations';
import { TicketStatus } from '../store/types';

type Props = {
  ticketId: string;
};

const TicketClosed: React.SFC<Props> = ({ ticketId }) => {
  return (
    <Container>
      <Left>
        <Icon name="fas fa-lock" />
      </Left>
      <div>
        <p>
          This ticket is closed. In order to respond to it, you need to re-open
          it.
        </p>
        <Mutation
          mutation={UPDATE_TICKET_STATUS}
          optimisticResponse={{
            updateTicket: {
              id: ticketId,
              status: TicketStatus.Open,
              updatedAt: new Date(),
              __typename: 'Ticket',
            },
          }}
        >
          {mutate => (
            <Button
              type="button"
              color="green"
              onClick={() => {
                mutate({
                  variables: {
                    id: ticketId,
                    status: TicketStatus.Open,
                  },
                });
              }}
            >
              Re-open ticket
            </Button>
          )}
        </Mutation>
      </div>
    </Container>
  );
};

export default TicketClosed;

const Container = styled.div`
  padding: 20px 0;
  border-radius: 10px;
  background: #f1f1f1;
  display: flex;
  align-items: center;

  button {
    display: block;
  }

  p {
    font-style: italic;
  }
`;

const Left = styled.div`
  color: #ced4da;
  font-size: 3.5em;
  padding: 0 30px;
`;
