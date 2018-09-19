import * as React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';

import { AuthedUserTimesheets } from '../components';
import { sortByDate, filterOutFutureTimesheets } from '../utils';
import { PageHeader } from '../../common';
import { LOGGED_IN_USER } from '../../auth/store/queries';

type Props = {};
type DataProps = {
  user: any;
  loading: boolean;
};
type EnhancedProps = Props & DataProps;

const TimesheetsPage: React.SFC<EnhancedProps> = ({ user }) => (
  <div>
    <PageHeader>Your Timesheets</PageHeader>
    <AuthedUserTimesheets userId={user.id} indicateDueDate={true} />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      user: data.loggedInUser,
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(TimesheetsPage);
