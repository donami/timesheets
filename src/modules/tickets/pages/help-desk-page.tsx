import React, { Component } from 'react';
import { PageHeader, NotFoundPage } from 'src/modules/common';
import { TicketList } from '../components';
import { Switch, Route, match } from 'react-router-dom';
import TicketView from '../components/ticket-view';
import {
  TicketQuery,
  GET_TICKET,
  AllTicketsQuery,
  GET_ALL_TICKETS,
} from '../store/queries';
import CreateTicket from '../components/create-ticket';
import { Button } from 'genui';
import { Mutation } from 'react-apollo';
import { CREATE_TICKET_MUTATION } from '../store/mutations';
import { TicketStatus, TicketPriority } from '../store/types';

type Props = {
  match: match<{ id: string }>;
};

class HelpDeskPage extends Component<Props> {
  render() {
    return (
      <div>
        <PageHeader
          options={
            <>
              <Button
                to="/help-desk/ticket/create"
                color="green"
                icon="fas fa-plus"
              />
            </>
          }
        >
          Help Desk
        </PageHeader>

        <Switch>
          <Route
            exact
            path={`/help-desk/ticket/create`}
            render={props => {
              return (
                <Mutation
                  mutation={CREATE_TICKET_MUTATION}
                  optimisticResponse={{
                    __typename: 'Mutation',
                    createTicket: {
                      assigned: null,
                      comments: [],
                      createdAt: new Date(),
                      priority: TicketPriority.Medium,
                      status: TicketStatus.Pending,
                      type: 'Question',
                      updatedAt: new Date(),
                      __typename: 'Ticket',
                    },
                  }}
                  update={(proxy, { data: { createTicket } }) => {
                    try {
                      const data: any = proxy.readQuery({
                        query: GET_ALL_TICKETS,
                      });

                      data.allTickets.push(createTicket);

                      proxy.writeQuery({
                        data,
                        query: GET_ALL_TICKETS,
                      });
                    } catch {}
                  }}
                >
                  {mutation => <CreateTicket createTicket={mutation} />}
                </Mutation>
              );
            }}
          />
          <Route
            exact
            path={`/help-desk/ticket/:id`}
            render={props => {
              return (
                <TicketQuery
                  query={GET_TICKET}
                  variables={{ id: this.props.match.params.id }}
                >
                  {({ data, loading }) => {
                    if (loading) {
                      return null;
                    }
                    if (data && data.Ticket) {
                      return <TicketView ticket={data.Ticket} />;
                    }
                    return <NotFoundPage />;
                  }}
                </TicketQuery>
              );
            }}
          />
          <Route
            path={`/help-desk`}
            render={props => {
              return (
                <AllTicketsQuery query={GET_ALL_TICKETS}>
                  {({ data, loading }) => {
                    if (loading) {
                      return null;
                    }

                    return (
                      <TicketList tickets={(data && data.allTickets) || []} />
                    );
                  }}
                </AllTicketsQuery>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default HelpDeskPage;
