import React from 'react';
import { graphql } from 'react-apollo';
import { compose, renderNothing, branch } from 'recompose';

import { TimesheetList } from '../components';
import gql from 'graphql-tag';
import { TIMESHEET_LIST_ITEM_FRAGMENT } from '../store/queries';

type Props = {
  userId: string;
  limit?: number;
  indicateDueDate?: boolean;
};
type DataProps = { timesheets: any; loading: boolean };
type EnhancedProps = Props & DataProps;

const AuthedUserTimesheets: React.SFC<EnhancedProps> = ({
  timesheets,
  ...rest
}) => (
  <TimesheetList
    items={timesheets}
    noItemsText="You have no timesheets."
    {...rest}
  />
);

const GET_TIMESHEETS_FOR_USER = gql`
  query allTimesheets($userId: ID!) {
    allTimesheets(filter: { owner: { id: $userId } }) {
      ...TimesheetListItem
    }
  }
  ${TIMESHEET_LIST_ITEM_FRAGMENT}
`;

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_TIMESHEETS_FOR_USER, {
    options: ({ userId }: any) => ({
      variables: {
        userId,
      },
    }),
    props: ({ data }: any) => ({
      timesheets: data.allTimesheets,
      loading: data.loading,
    }),
  }),
  branch<EnhancedProps>(({ loading }) => loading, renderNothing)
);

export default enhance(AuthedUserTimesheets);
