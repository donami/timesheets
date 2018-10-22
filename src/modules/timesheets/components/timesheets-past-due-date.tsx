import React from 'react';
import { compose, branch, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { TimesheetList } from '../components';
import { TIMESHEET_LIST_ITEM_FRAGMENT } from '../store/queries';
import { monthIsInPast } from '../../../utils/calendar';
import { TimesheetStatus } from '../store/models';
import { Spinner } from '@blueprintjs/core';

type Props = {
  limit?: number;
};
type DataProps = {
  timesheets: any;
  loading: boolean;
};
type EnhancedProps = Props & DataProps;

const TimesheetsPastDueDate: React.SFC<EnhancedProps> = ({
  timesheets,
  ...rest
}) => (
  <div>
    <TimesheetList
      items={timesheets}
      noItemsText="No timesheets past due date."
      disableFilter={true}
      includeUser={true}
      {...rest}
    />
  </div>
);

/* TODO: Filter out timesheets past due date in query */
const GET_TIMESHEETS_PAST_DUE_DATE = gql`
  query allTimesheets {
    allTimesheets {
      ...TimesheetListItem
    }
  }
  ${TIMESHEET_LIST_ITEM_FRAGMENT}
`;

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_TIMESHEETS_PAST_DUE_DATE, {
    props: ({ data }: any) => ({
      timesheets: ([] || data.allTimesheets).filter(
        (timesheet: any) =>
          monthIsInPast(timesheet.periodStart) &&
          timesheet.status !== TimesheetStatus.Approved
      ),
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderComponent(Spinner))
);

export default enhance(TimesheetsPastDueDate);
