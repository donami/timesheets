import React from 'react';
import { List } from 'genui';
import { connect } from 'react-redux';

import { Log } from '../../logs/store/models';
import { getLogsOfSelectedTimesheet } from '../../common/store/selectors';
import { parseDate, sortByRecentCreatedDates } from '../../../utils/helpers';
import styled from '../../../styled/styled-components';

type Props = {
  logs: Log[];
};

class TimesheetLogs extends React.Component<Props> {
  render() {
    const { logs } = this.props;

    if (logs.length === 0) {
      return <div>No logs for this timesheet exists.</div>;
    }

    return (
      <List>
        {logs.sort(sortByRecentCreatedDates).map(log => (
          <List.Item key={log.id}>
            <LogDate>{parseDate(log.createdAt, 'YYYY-MM-DD HH:mm')}:</LogDate>
            {log.message}
          </List.Item>
        ))}
      </List>
    );
  }
}

const LogDate = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

export default connect((state: any) => ({
  logs: getLogsOfSelectedTimesheet(state),
}))(TimesheetLogs);
