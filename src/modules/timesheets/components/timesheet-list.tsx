import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'genui';

import { TimesheetItem } from '../store/models';
import { dateFormat } from '../../../utils/calendar';
import withDefaultProps from '../../common/components/with-default-props';
import { Translate } from '../../common';

type Props = {
  timesheets: TimesheetItem[];
} & DefaultProps;

const defaultProps: DefaultProps = {
  noTimesheetsText: 'No timesheets',
};

type DefaultProps = {
  noTimesheetsText: string;
};

class TimesheetList extends React.Component<Props> {
  render() {
    const { timesheets, noTimesheetsText } = this.props;

    if (!timesheets.length) {
      return <div>{noTimesheetsText || 'No timesheets'}</div>;
    }

    const tableItems = timesheets.map(timesheet => ({
      id: <Link to={`/timesheet/${timesheet.id}`}>{timesheet.id}</Link>,
      period: dateFormat(timesheet.periodStart, 'MMMM, YYYY'),
      status: <Translate text={`timesheet.status.${timesheet.status}`} />,
    }));

    return (
      <div>
        <Table headings={['ID', 'Period', 'Status']} items={tableItems} />
      </div>
    );
  }
}

export default withDefaultProps<Props>(defaultProps)(TimesheetList);
