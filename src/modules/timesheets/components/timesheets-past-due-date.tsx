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
};

class TimesheetsPastDueDate extends Component<Props> {
  render() {
    const { timesheets, users } = this.props;

    return (
      <div>
        <TimesheetList
          timesheets={timesheets}
          users={users}
          disableFilter={true}
          includeUser={true}
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
