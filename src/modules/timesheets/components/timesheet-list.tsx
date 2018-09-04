import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList, StatusColor, Label } from 'genui';

import { TimesheetItem, TimesheetStatus } from '../store/models';
import { dateFormat, monthIsInPast } from '../../../utils/calendar';
import withDefaultProps from '../../common/components/with-default-props';
import { Translate } from '../../common';
import {
  sortByDate,
  filterOutFutureTimesheets,
  getStatusColor,
} from '../utils';
import { User } from '../../users/store/models';

type Props = {
  timesheets: TimesheetItem[];
  noTimesheetsText?: string;
} & DefaultProps;

const defaultProps: DefaultProps = {
  // noTimesheetsText: 'No timesheets',
  disableFilter: false,
  includeUser: false,
  indicateDueDate: false,
  users: [],
  sortFunction: sortByDate,
  limit: 99999,
};

type DefaultProps = {
  disableFilter: boolean;
  sortFunction(item: TimesheetItem, other: TimesheetItem): number;
  // noTimesheetsText: string;
  includeUser: boolean;
  users: { [key: number]: User };
  indicateDueDate: boolean;
  limit: number;
};

class TimesheetList extends React.Component<Props> {
  getUserLink(timesheet: any) {
    const { users } = this.props;

    if (!users || !timesheet.owner) {
      return null;
    }

    const user = users[timesheet.owner];

    if (!user) {
      return null;
    }

    return <Link to={`/user/${user.id}`}>{user.fullName}</Link>;
  }

  renderPastDueDate(date: string, status: TimesheetStatus) {
    if (!this.props.indicateDueDate) {
      return null;
    }

    if (
      monthIsInPast(date) &&
      [TimesheetStatus.InProgress, TimesheetStatus.InProgressSaved].indexOf(
        status
      ) > -1
    ) {
      return (
        <Label color="red" style={{ float: 'right' }}>
          Past due date
        </Label>
      );
    }
    return null;
  }

  render() {
    const {
      timesheets,
      noTimesheetsText,
      disableFilter,
      includeUser,
      users,
      sortFunction,
      limit,
    } = this.props;

    if (!timesheets.length) {
      return (
        <div>
          {noTimesheetsText || (
            <Translate text="timesheet.labels.NO_TIMESHEETS" />
          )}
        </div>
      );
    }

    // If disableFilter is true, there should be
    // no filtering of future timesheets
    const filter = disableFilter ? () => true : filterOutFutureTimesheets;

    const tableItems = timesheets
      .filter(filter)
      .sort(sortFunction)
      .slice(0, limit)
      .map(timesheet => ({
        id: <Link to={`/timesheet/${timesheet.id}`}>{timesheet.id}</Link>,
        period: dateFormat(timesheet.periodStart, 'MMMM, YYYY'),
        status: (
          <>
            <StatusColor
              style={{ marginRight: 5 }}
              {...getStatusColor(timesheet.status)}
            />
            <Translate text={`timesheet.status.${timesheet.status}`} />
            {this.renderPastDueDate(timesheet.periodStart, timesheet.status)}
          </>
        ),
        user: includeUser ? this.getUserLink(timesheet) : null,
      }));

    const headings = ['ID', 'Period', 'Status'];

    if (includeUser && Object.keys(users).length > 0) {
      headings.push('User');
    }

    return (
      <div>
        <TableList headings={headings} items={tableItems} />
      </div>
    );
  }
}

export default withDefaultProps<Props>(defaultProps)(TimesheetList);
