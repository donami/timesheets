import React, { Component } from 'react';

import { TimesheetItem } from '../store/models';
import { TimesheetList } from '../components';
import { sortByRecentUpdatedDates } from '../../../utils/helpers';
import { getTimesheets } from '../store/selectors';
import { connect } from 'react-redux';

type Props = {
  timesheets: TimesheetItem[];
};

class TimesheetsRecentlyUpdated extends Component<Props> {
  render() {
    const { timesheets } = this.props;

    return (
      <TimesheetList
        sortFunction={sortByRecentUpdatedDates}
        timesheets={timesheets}
      />
    );
  }
}

export default connect((state: any) => ({
  timesheets: getTimesheets(state),
}))(TimesheetsRecentlyUpdated);
