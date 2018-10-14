import React from 'react';
import TicketListItem from './ticket-list-item';
import { Ticket, TicketStatus, TicketPriority } from '../store/types';

type Props = {
  tickets: Ticket[];
};

const TicketList: React.SFC<Props> = ({ tickets }) => {
  return (
    <div>
      {tickets.map(ticket => (
        <TicketListItem ticket={ticket} key={ticket.id} />
      ))}
    </div>
  );
};

export default TicketList;
