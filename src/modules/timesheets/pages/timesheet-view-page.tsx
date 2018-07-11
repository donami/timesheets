import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Calendar, TimesheetInfo } from '../components';
import { TimesheetItem, TimesheetStatus } from '../store/models';
import {
  selectTimesheet,
  fetchTimesheetById,
  updateTimesheet,
} from '../store/actions';
import { getSelectedTimesheet } from '../store/selectors';

export interface TimesheetViewPageProps {
  match: any;
  timesheet: TimesheetItem;
  selectTimesheet: (timesheetId: number) => any;
  updateTimesheet: (timesheetId: number, timesheet: TimesheetItem) => any;
  fetchTimesheetById: (timesheetId: number) => any;
}

const calendarEditable = (status: TimesheetStatus): boolean => {
  return (
    status === TimesheetStatus.InProgress ||
    status === TimesheetStatus.InProgressSaved ||
    status === TimesheetStatus.NeedsRevisement
  );
};

class TimesheetViewPage extends React.Component<TimesheetViewPageProps> {
  componentWillMount() {
    const { match, selectTimesheet, fetchTimesheetById } = this.props;

    if (match && match.params.id) {
      selectTimesheet(+match.params.id);
      fetchTimesheetById(+match.params.id);
    }
  }

  handleSaveDraft = (dates: any[]) => {
    const { timesheet } = this.props;
    const data = Object.assign({}, timesheet, {
      dates,
      status: TimesheetStatus.InProgressSaved,
    });

    this.props.updateTimesheet(timesheet.id, data);
  };

  handleSubmit = (dates: any[]) => {
    const { timesheet } = this.props;
    const data = Object.assign({}, timesheet, {
      dates,
      status: TimesheetStatus.WaitingForApproval,
    });

    this.props.updateTimesheet(timesheet.id, data);
  };

  render() {
    const { timesheet } = this.props;

    if (!timesheet) {
      return null;
    }

    const editable = calendarEditable(timesheet.status);

    return (
      <div>
        <TimesheetInfo timesheet={timesheet} />

        <div>
          <Calendar
            onSaveDraft={this.handleSaveDraft}
            onSubmit={this.handleSubmit}
            dates={timesheet.dates}
            editable={editable}
            startOfMonth={timesheet.periodStart}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  timesheet: getSelectedTimesheet(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectTimesheet,
      fetchTimesheetById,
      updateTimesheet,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetViewPage);
