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
import { CompanyContext } from '../../common/components/routing';

type Props = {
  match: match<any>;
};

type DataProps = {
  data: any;
};
type EnhancedProps = Props & DataProps;

class AccountPage extends Component<EnhancedProps> {
  render() {
    const {
      match: { params },
      data: { user },
    } = this.props;

    return (
      <CompanyContext.Consumer>
        {({ company }: any) => (
          <Container>
            <AccountMenu active={params.page} />

            <ContentWrapper>
              <Switch>
                <Route
                  path="/account/billing"
                  render={props => {
                    return <Billing {...props} company={company} user={user} />;
                  }}
                />
                <Route
                  path="/account/integrations"
                  render={props => {
                    return (
                      <Integrations {...props} company={company} user={user} />
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
        )}
      </CompanyContext.Consumer>
    );
  }
}

const enhance = compose<EnhancedProps, Props>(graphql(LOGGED_IN_USER));

export default enhance(AccountPage);
