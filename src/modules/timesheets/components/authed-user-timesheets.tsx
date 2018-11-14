import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spinner } from '@blueprintjs/core';

import { TimesheetList } from '../components';
import { TIMESHEET_LIST_ITEM_FRAGMENT } from '../store/queries';

type Props = {
  userId: string;
  limit?: number;
  indicateDueDate?: boolean;
};

const AuthedUserTimesheets: React.SFC<Props> = ({ userId, ...rest }) => (
  <Query query={GET_TIMESHEETS_FOR_USER} variables={{ userId }}>
    {({ data: { allTimesheets }, loading }: any) => {
      if (loading) {
        return <Spinner />;
      }

      return (
        <TimesheetList
          items={allTimesheets}
          noItemsText="You have no timesheets."
          {...rest}
        />
      );
    }}
  </Query>
);

const GET_TIMESHEETS_FOR_USER = gql`
  query allTimesheets($userId: ID!) {
    allTimesheets(filter: { owner: { id: $userId } }) {
      ...TimesheetListItem
    }
  }
  ${TIMESHEET_LIST_ITEM_FRAGMENT}
`;

export default AuthedUserTimesheets;
