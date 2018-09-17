import * as React from 'react';

import { TimesheetList } from '../components';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TIMESHEET_LIST_ITEM_FRAGMENT } from '../store/queries';

type Props = {
  limit?: number;
};

type DataProps = {
  timesheets: any[];
};
type EnhancedProps = Props & DataProps;

const TimesheetsReadyForReview: React.SFC<EnhancedProps> = ({
  timesheets,
  ...rest
}) => (
  <div>
    <TimesheetList items={timesheets} {...rest} />
  </div>
);

export const GET_TIMESHEETS_READY_FOR_REVIEW = gql`
  query allTimesheets {
    allTimesheets(filter: { status: "WAITING_FOR_APPROVAL" }) {
      ...TimesheetListItem
    }
  }
  ${TIMESHEET_LIST_ITEM_FRAGMENT}
`;

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_TIMESHEETS_READY_FOR_REVIEW, {
    props: ({ data }: any) => ({
      timesheets: data.allTimesheets,
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(TimesheetsReadyForReview);
