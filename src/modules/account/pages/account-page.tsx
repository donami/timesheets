import React, { Component } from 'react';
import { Switch, Route, Redirect, match } from 'react-router';

import {
  AccountMenu,
  Billing,
  CompanySettings,
  Integrations,
} from '../components';
import { Container, ContentWrapper } from './account-page.css';
import { compose } from 'recompose';
import { graphql, Query, Mutation } from 'react-apollo';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { PageLoader } from '../../ui';
import { GET_COMPANIES_BY_USER_ID } from '../store/queries';
import { UPDATE_COMPANY } from '../store/mutations';

type Props = {
  match: match<any>;
};

type DataProps = {
  data: any;
  loading: boolean;
};
type EnhancedProps = Props & DataProps;

class AccountPage extends Component<EnhancedProps> {
  render() {
    const {
      match: { params },
      loading,
      data: { user },
    } = this.props;

    if (loading) {
      return <PageLoader />;
    }

    return (
      <Query query={GET_COMPANIES_BY_USER_ID} variables={{ userId: user.id }}>
        {({ data: { allCompanies }, loading }) => {
          if (loading) {
            return null;
          }

          if (!allCompanies.length) {
            return null;
          }

          const company = allCompanies[0];

          return (
            <Container>
              <AccountMenu active={params.page} />

              <ContentWrapper>
                <Switch>
                  <Route
                    path="/account/billing"
                    render={props => {
                      return (
                        <Billing {...props} company={company} user={user} />
                      );
                    }}
                  />
                  <Route
                    path="/account/integrations"
                    render={props => {
                      return (
                        <Integrations
                          {...props}
                          company={company}
                          user={user}
                        />
                      );
                    }}
                  />
                  <Route
                    path="/account/company-settings"
                    render={props => {
                      return (
                        <Mutation mutation={UPDATE_COMPANY}>
                          {(mutate, { loading }) => (
                            <CompanySettings
                              {...props}
                              updateCompany={mutate}
                              loading={loading}
                              company={company}
                              user={user}
                            />
                          )}
                        </Mutation>
                      );
                    }}
                  />
                  <Route
                    path="/account"
                    render={() => {
                      return <Redirect to="/account/billing" />;
                    }}
                  />
                </Switch>
              </ContentWrapper>
            </Container>
          );
        }}
      </Query>
    );
  }
}

const enhance = compose<EnhancedProps, Props>(graphql(LOGGED_IN_USER));

export default enhance(AccountPage);
