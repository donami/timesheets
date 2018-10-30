import React from 'react';
import { compose } from 'recompose';
import { graphql, Query } from 'react-apollo';
import { Spinner } from '@blueprintjs/core';

import { Row, Column, Box } from '../../ui';
import { AuthedUserTimesheets } from '../../timesheets';
import { ExpenseReportList } from '../../expenses';
import { PageHeader } from '../../common';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { GET_EXPENSES } from '../../expenses/store/queries';
import { CompanyContext } from '../../common/components/routing';

type Props = {
  user: any;
};
type DataProps = {};
type EnhancedProps = Props & DataProps;

const DashboardUserPage: React.SFC<EnhancedProps> = ({ user }) => (
  <div>
    <CompanyContext.Consumer>
      {({ company }: any) => (
        <>
          <PageHeader>Welcome {user.firstName}!</PageHeader>
          <Row>
            <Column xs={12} sm={6}>
              <Box title="Timesheets">
                <AuthedUserTimesheets
                  limit={20}
                  indicateDueDate={true}
                  userId={user.id}
                />
              </Box>
            </Column>
            <Column xs={12} sm={6}>
              <Box title="Expenses">
                <Query
                  query={GET_EXPENSES}
                  variables={{ companyId: company.id }}
                >
                  {({ data, loading }) => {
                    if (loading) {
                      return <Spinner />;
                    }

                    return (
                      <ExpenseReportList limit={20} items={data.allExpenses} />
                    );
                  }}
                </Query>
              </Box>
            </Column>
          </Row>
        </>
      )}
    </CompanyContext.Consumer>
  </div>
);

const enhance = compose(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      user: data.user || null,
    }),
  })
);

export default enhance(DashboardUserPage);
