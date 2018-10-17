import React from 'react';
import TicketListItem, {
  Container as ItemContainer,
  Top as ItemTop,
  Cell as ItemCell,
} from './ticket-list-item';
import { Ticket } from '../store/types';
import styled from 'src/styled/styled-components';

type Props = {
  tickets: Ticket[];
};

const TicketList: React.SFC<Props> = ({ tickets }) => {
  return (
    <div>
      {!!tickets.length && (
        <Container>
          <Top>
            <Cell style={{ maxWidth: '50px' }} />
            <Cell>Title</Cell>
            <Cell>Requested by</Cell>
            <Cell>Type</Cell>
            <Cell>Status</Cell>
            <Cell>Priority</Cell>
            <Cell>Assigned</Cell>
          </Top>
          {tickets.map(ticket => (
            <TicketListItem ticket={ticket} key={ticket.id} />
          ))}
        </Container>
      )}
      {!tickets.length && (
        <NoTickets>
          <p>No tickets created.</p>
        </NoTickets>
      )}
    </div>
  );
};

export default TicketList;

const Container = styled(ItemContainer)`
  background: transparent;
  cursor: auto;
`;

const Top = styled(ItemTop)`
  text-transform: uppercase;
  font-weight: 300;
`;

const Cell = styled(ItemCell)``;

const NoTickets = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 10px;
`;
