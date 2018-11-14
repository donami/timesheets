import React from 'react';
import { compose, branch, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { TimesheetList } from '../components';
import { TIMESHEET_LIST_ITEM_FRAGMENT } from '../store/queries';
import { monthIsInPast } from '../../../utils/calendar';
import { TimesheetStatus } from '../store/models';
import { Spinner } from '@blueprintjs/core';
import { UserRole } from '../../users/store/models';

type Props = {
  limit?: number;
};
type DataProps = {
  timesheets: any;
  loading: boolean;
  user: any;
};
type EnhancedProps = Props & DataProps;

const TimesheetsPastDueDate: React.SFC<EnhancedProps> = ({
  timesheets,
  user,
  ...rest
}) => {
  let filteredItems = timesheets;

  if (user.role === UserRole.Manager || user.role === UserRole.User) {
    filteredItems = timesheets.filter((timesheet: any) => {
      return !!user.projectMember.find(
        (userProject: any) => userProject.project.id === timesheet.project.id
      );
    });
  }

  return (
    <div>
      <TimesheetList
        items={filteredItems}
        noItemsText="No timesheets past due date."
        disableFilter={true}
        includeUser={true}
        {...rest}
      />
    </div>
  );
};

const GET_TIMESHEETS_PAST_DUE_DATE = gql`
  query allTimesheets {
    allTimesheets {
      ...TimesheetListItem
      project {
        id
      }
    }
    user {
      id
      role
      projectMember {
        id
        project {
          id
          name
        }
      }
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
      user: data.user,
      loading: data.loading,
    }),
  }),
  branch(({ loading }) => loading, renderComponent(Spinner))
);

export default enhance(TimesheetsPastDueDate);
