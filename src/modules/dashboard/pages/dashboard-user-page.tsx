import React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';

import { Row, Column, Box } from '../../ui';
import { AuthedUserTimesheets } from '../../timesheets';
import { ExpenseReportList } from '../../expenses';
import { PageHeader } from '../../common';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { GET_EXPENSES } from '../../expenses/store/queries';

type Props = {
  user: any;
};
type DataProps = {
  expenses: any[];
  loading: boolean;
};
type EnhancedProps = Props & DataProps;

const DashboardUserPage: React.SFC<EnhancedProps> = ({ expenses, user }) => (
  <div>
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
          <ExpenseReportList limit={20} items={expenses} />
        </Box>
      </Column>
    </Row>
  </div>
);

const enhance = compose(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      user: data.user || null,
    }),
  }),
  graphql(GET_EXPENSES, {
    props: ({ data }: any) => ({
      expenses: data.allExpenses,
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(DashboardUserPage);
