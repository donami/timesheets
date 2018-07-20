import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TimesheetList } from '../components';
import { fetchTimesheets } from '../store/actions';
import { TimesheetItem } from '../store/models';
import { timesheetSelectors } from '../store';
import { isSameOrBeforeMonth } from '../../../utils/calendar';
import { DISPLAY_ONLY_PAST_AND_CURRENT_TIMESHEET } from '../../../config/constants';
import { sortByDate } from '../utils';

type Props = {
  fetchTimesheets: () => any;
  timesheets: any;
};

class TimesheetsPage extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchTimesheets();
  }

  render() {
    const { timesheets } = this.props;

    const filteredTimesheets = DISPLAY_ONLY_PAST_AND_CURRENT_TIMESHEET
      ? timesheets
          .filter((timesheet: TimesheetItem) =>
            isSameOrBeforeMonth(timesheet.periodStart)
          )
          .sort(sortByDate)
      : timesheets.sort(sortByDate);

    return (
      <div>
        <TimesheetList timesheets={filteredTimesheets} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  timesheets: timesheetSelectors.getTimesheets(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchTimesheets,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetsPage);
