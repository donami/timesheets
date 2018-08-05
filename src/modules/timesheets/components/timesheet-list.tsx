import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'genui';

import { TimesheetItem } from '../store/models';
import { dateFormat } from '../../../utils/calendar';
import withDefaultProps from '../../common/components/with-default-props';
import { Translate } from '../../common';
import { sortByDate, filterOutFutureTimesheets } from '../utils';
import { User } from '../../users/store/models';

type Props = {
  timesheets: TimesheetItem[];
} & DefaultProps;

const defaultProps: DefaultProps = {
  noTimesheetsText: 'No timesheets',
  disableFilter: false,
  includeUser: false,
  users: [],
};

type DefaultProps = {
  disableFilter: boolean;
  noTimesheetsText: string;
  includeUser: boolean;
  users: { [key: number]: User };
};

class TimesheetList extends React.Component<Props> {
  render() {
    const {
      timesheets,
      noTimesheetsText,
      disableFilter,
      includeUser,
      users,
    } = this.props;

    if (!timesheets.length) {
      return <div>{noTimesheetsText || 'No timesheets'}</div>;
    }

    // If disableFilter is true, there should be
    // no filtering of future timesheets
    const filter = disableFilter ? () => true : filterOutFutureTimesheets;

    const tableItems = timesheets
      .filter(filter)
      .sort(sortByDate)
      .map((timesheet: any) => ({
        id: <Link to={`/timesheet/${timesheet.id}`}>{timesheet.id}</Link>,
        period: dateFormat(timesheet.periodStart, 'MMMM, YYYY'),
        status: <Translate text={`timesheet.status.${timesheet.status}`} />,
        user: includeUser ? (
          <Link to={`/user/${users[timesheet.owner].id}`}>
            {users[timesheet.owner].fullName}
          </Link>
        ) : null,
      }));

    const headings = ['ID', 'Period', 'Status'];

    if (includeUser && Object.keys(users).length > 0) {
      headings.push('User');
    }

    return (
      <div>
        <Table headings={headings} items={tableItems} />
      </div>
    );
  }
}

export default withDefaultProps<Props>(defaultProps)(TimesheetList);
