import React from 'react';
import { Label, Dropdown, Icon, Button } from 'genui';

import { Ticket, TicketStatus } from '../store/types';
import styled from '../../../styled/styled-components';
import TicketComments from './ticket-comments';
import TicketReply from './ticket-reply';
import { Link } from 'react-router-dom';
import TicketComment from './ticket-comment';
import { Mutation, graphql } from 'react-apollo';
import {
  CREATE_TICKET_COMMENT,
  UPDATE_TICKET_STATUS,
} from '../store/mutations';
import { LOGGED_IN_USER } from 'src/modules/auth/pages/auth-page';
import { GET_TICKET } from '../store/queries';
import TicketStatusLabel from './ticket-status-label';
import TicketClosed from './ticket-closed';

type Props = {
  ticket: Ticket;
};

type DataProps = {
  data: any;
};

type EnhancedProps = Props & DataProps;

type DropdownItem = {
  label: string;
  icon: string;
  onClick: any;
};

const TicketView: React.SFC<EnhancedProps> = ({ ticket, data }) => {
  if (data.loading) {
    return null;
  }

  const options = [
    {
      label: 'Close ticket',
      icon: 'far fa-times-circle',
      onClick: (item: any) => {
        console.log('clicked', item);
      },
    },
    {
      label: 'Mark as pending',
      icon: 'fas fa-clock',
      onClick: (item: any) => {
        console.log('clicked', item);
      },
    },
  ];

  return (
    <Container>
      <Top>
        <Title>
          <h2>{ticket.title}</h2>
          <TicketStatusLabel status={ticket.status} />
        </Title>
        <div>
          <StyledDropdown
            className="dropdown"
            items={options}
            renderItem={(item: DropdownItem) => {
              return (
                <div onClick={() => item.onClick(item)}>
                  <i className={item.icon} />
                  {item.label}
                </div>
              );
            }}
          >
            <Button icon="fas fa-cog" />
          </StyledDropdown>
        </div>
      </Top>

      <TicketComment
        comment={{
          id: ticket.id,
          body: ticket.description,
          createdAt: ticket.createdAt || new Date(),
          owner: ticket.owner,
        }}
      />

      <TicketComments comments={ticket.comments} />

      {ticket.status !== TicketStatus.Closed && (
        <Mutation
          mutation={CREATE_TICKET_COMMENT}
          update={(proxy, { data: { createTicketComment } }) => {
            const { Ticket }: any = proxy.readQuery({
              query: GET_TICKET,
              variables: { id: ticket.id },
            });

            proxy.writeQuery({
              query: GET_TICKET,
              variables: { id: ticket.id },
              data: {
                Ticket: {
                  ...Ticket,
                  comments: Ticket.comments.concat(createTicketComment),
                },
              },
            });
          }}
        >
          {mutate => (
            <TicketReply
              ticketId={ticket.id}
              userId={data.user.id}
              createComment={mutate}
            />
          )}
        </Mutation>
      )}
      {ticket.status === TicketStatus.Closed && (
        <TicketClosed ticketId={ticket.id} />
      )}
    </Container>
  );
};

export default graphql<Props>(LOGGED_IN_USER)(TicketView);

const Container = styled.div`
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  padding: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  text-transform: uppercase;

  h2 {
    font-weight: 300;
    margin: 0;
    margin-right: 10px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDropdown = styled(Dropdown)`
  line-height: normal;
  align-self: center;

  .g-dropdown-menu {
    left: -102px;
    top: 90%;

    a {
      color: #232c55;
    }

    i {
      margin-right: 0.5em;
    }
  }
`;
