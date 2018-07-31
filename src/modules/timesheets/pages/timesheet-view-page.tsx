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
import {
  getTimesheetsInProjectsWhereAdmin,
  getProjectOfSelectedTimesheet,
} from '../../common/store/selectors';
import { fetchProjects } from '../../projects/store/actions';
import { Project } from '../../projects/store/models';

export interface TimesheetViewPageProps {
  match: any;
  timesheet: TimesheetItem;
  selectTimesheet: (timesheetId: number) => any;
  updateTimesheet: (timesheetId: number, timesheet: TimesheetItem) => any;
  fetchTimesheetById: (timesheetId: number) => any;
  fetchProjects: () => any;
  timesheetsWhereAdmin: TimesheetItem[];
  project: Project;
}

const calendarEditable = (
  status: TimesheetStatus,
  isAdmin: boolean
): boolean => {
  // Admins should not be allowed to edit the hours
  if (isAdmin) {
    return false;
  }

  return (
    status === TimesheetStatus.InProgress ||
    status === TimesheetStatus.InProgressSaved ||
    status === TimesheetStatus.NeedsRevisement
  );
};

class TimesheetViewPage extends React.Component<TimesheetViewPageProps> {
  componentWillMount() {
    const {
      match,
      selectTimesheet,
      fetchTimesheetById,
      fetchProjects,
    } = this.props;

    fetchProjects();
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

  handleApprove = () => {
    const { timesheet } = this.props;

    const data = Object.assign({}, timesheet, {
      status: TimesheetStatus.Approved,
    });

    this.props.updateTimesheet(timesheet.id, data);
  };

  handleDecline = () => {
    const { timesheet } = this.props;

    const data = Object.assign({}, timesheet, {
      status: TimesheetStatus.NeedsRevisement,
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
    const { timesheet, timesheetsWhereAdmin, project } = this.props;

    if (!timesheet) {
      return null;
    }

    // If viewing the timesheet as admin or as user
    const isAdmin = Boolean(
      timesheetsWhereAdmin.find(item => item.id === timesheet.id)
    );
    // If the calendar (hours) should be editable
    const editable = calendarEditable(timesheet.status, isAdmin);

    return (
      <div>
        <TimesheetInfo project={project} timesheet={timesheet} />

        <div>
          <Calendar
            onSaveDraft={this.handleSaveDraft}
            onSubmit={this.handleSubmit}
            onApprove={this.handleApprove}
            onDecline={this.handleDecline}
            status={timesheet.status}
            dates={timesheet.dates}
            editable={editable}
            startOfMonth={timesheet.periodStart}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  timesheet: getSelectedTimesheet(state),
  timesheetsWhereAdmin: getTimesheetsInProjectsWhereAdmin(state),
  project: getProjectOfSelectedTimesheet(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectTimesheet,
      fetchTimesheetById,
      updateTimesheet,
      fetchProjects,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetViewPage);
