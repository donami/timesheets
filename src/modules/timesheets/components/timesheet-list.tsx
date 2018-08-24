import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList, StatusColor } from 'genui';

import { TimesheetItem } from '../store/models';
import { dateFormat } from '../../../utils/calendar';
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
  users: [],
};

type DefaultProps = {
  disableFilter: boolean;
  // noTimesheetsText: string;
  includeUser: boolean;
  users: { [key: number]: User };
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

  render() {
    const {
      timesheets,
      noTimesheetsText,
      disableFilter,
      includeUser,
      users,
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
      .sort(sortByDate)
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
