import React, { Component } from 'react';
import { PageHeader } from 'src/modules/common';
import { Switch, Route, match, Link } from 'react-router-dom';
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
import HelpDeskHome from '../components/help-desk-home';
import { CompanyContext } from '../../common/components/routing';

type Props = {
  match: match<{ id: string }>;
};

type State = {
  trail: any[];
};

class HelpDeskPage extends Component<Props, State> {
  state: State = {
    trail: [],
  };

  componentWillMount() {
    this.updateBreadcrumbs(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.updateBreadcrumbs(nextProps);
  }

  updateBreadcrumbs = (props: Props) => {
    const { match } = props;
    let trail: any[] = [];
    const root = { to: '/help-desk', label: 'Help Desk' };

    if (match.url === '/help-desk/ticket/create') {
      trail = [
        root,
        {
          to: '/help-desk/ticket/create',
          label: 'Create ticket',
        },
      ];
    }

    if (match.path === '/help-desk/ticket/:id?') {
      trail = [
        root,
        {
          to: `/help-desk/ticket/${match.params.id}`,
          label: 'View ticket',
        },
      ];
    }

    this.setState({ trail });
  };

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

        {!!this.state.trail.length && (
          <ul className="bp3-breadcrumbs">
            {this.state.trail.map(part => (
              <li key={part.label}>
                <Link className="bp3-breadcrumb" to={part.to}>
                  {part.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Switch>
          <Route
            exact
            path={`/help-desk/ticket/create`}
            render={props => {
              return (
                <Mutation
                  mutation={CREATE_TICKET_MUTATION}
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
                  {({ data, loading }) => (
                    <TicketView
                      loading={loading}
                      ticket={data && data.Ticket}
                    />
                  )}
                </TicketQuery>
              );
            }}
          />
          <Route
            path={`/help-desk`}
            render={props => {
              return (
                <CompanyContext.Consumer>
                  {({ company }: any) => (
                    <AllTicketsQuery
                      query={GET_ALL_TICKETS}
                      variables={{
                        companyId: company.id,
                      }}
                    >
                      {({ data, loading }) => (
                        <HelpDeskHome
                          loading={loading}
                          tickets={(data && data.allTickets) || []}
                        />
                      )}
                    </AllTicketsQuery>
                  )}
                </CompanyContext.Consumer>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default HelpDeskPage;
