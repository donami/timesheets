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
import { Mutation, Query } from 'react-apollo';
import { CREATE_TICKET_MUTATION } from '../store/mutations';
import HelpDeskHome from '../components/help-desk-home';
import { CompanyContext } from '../../common/components/routing';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { PageLoader } from '../../ui';
import { UserRole } from '../../users/store/models';
import UserTickets, { GET_USER_TICKETS } from '../components/user-tickets';

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

        <Query query={LOGGED_IN_USER}>
          {({ data, loading }) => {
            if (loading) {
              return <PageLoader />;
            }

            return (
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
                            let query = GET_ALL_TICKETS;
                            let variables: any = {
                              companyId: data.user.company.id,
                            };
                            if (data.user.role === UserRole.User) {
                              query = GET_USER_TICKETS;
                              variables = {
                                ownerId: data.user.id,
                              };
                            }

                            const { allTickets }: any = proxy.readQuery({
                              query,
                              variables,
                            });

                            allTickets.push(createTicket);

                            proxy.writeQuery({
                              query,
                              variables,
                              data: { allTickets },
                            });
                          } catch {}
                        }}
                      >
                        {(mutation, { loading }) => (
                          <CreateTicket
                            {...props}
                            createTicket={mutation}
                            loading={loading}
                          />
                        )}
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
                    if (data.user.role === UserRole.User) {
                      return <UserTickets userId={data.user.id} />;
                    }

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
            );
          }}
        </Query>
      </div>
    );
  }
}

export default HelpDeskPage;
