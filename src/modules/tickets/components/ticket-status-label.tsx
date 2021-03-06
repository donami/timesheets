import React from 'react';
import { Label } from 'genui';
import { TicketStatus } from '../store/types';

type Props = {
  status: TicketStatus;
};

const TicketStatusLabel: React.SFC<Props> = ({ status }) => {
  const colors = {
    [TicketStatus.Pending]: 'teal',
    [TicketStatus.Open]: 'green',
    [TicketStatus.Closed]: 'red',
  };

  const injectedProps: any = {
    color: colors[status],
  };

  return (
    <Label className="ticket-status-label" {...injectedProps}>
      {status}
    </Label>
  );
};

export default TicketStatusLabel;
