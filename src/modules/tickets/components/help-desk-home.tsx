import React from 'react';

import { Ticket } from '../store/types';
import TicketList from './ticket-list';
import { PageLoader } from 'src/modules/ui';

type Props = {
  tickets: Ticket[];
  loading: boolean;
};

const HelpDeskHome: React.SFC<Props> = ({ tickets, loading }) => {
  if (loading) {
    return <PageLoader />;
  }

  return <TicketList tickets={tickets || []} />;
};

export default HelpDeskHome;
