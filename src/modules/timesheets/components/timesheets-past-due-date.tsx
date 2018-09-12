import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TimesheetList } from '../components';
import { TimesheetItem } from '../store/models';
import { getTimesheetsPastDueDate } from '../store/selectors';
import { getUserEntities } from '../../users/store/selectors';
import { User } from '../../users/store/models';

type Props = {
  timesheets: TimesheetItem[];
  users: { [key: number]: User };
  limit?: number;
};

class TimesheetsPastDueDate extends Component<Props> {
  render() {
    const { timesheets, users, ...rest } = this.props;

    return (
      <div>
        <TimesheetList
          items={timesheets}
          users={users}
          disableFilter={true}
          includeUser={true}
          {...rest}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  timesheets: getTimesheetsPastDueDate(state),
  users: getUserEntities(state),
});

export default connect(mapStateToProps)(TimesheetsPastDueDate);
