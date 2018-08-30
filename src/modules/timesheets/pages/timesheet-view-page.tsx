import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button } from 'genui';

import { Calendar, TimesheetInfo, TimesheetLogs } from '../components';
import { TimesheetItem, TimesheetStatus } from '../store/models';
import { selectTimesheet, updateTimesheet } from '../store/actions';
import {
  getSelectedTimesheet,
  getSelectedTimesheetId,
} from '../store/selectors';
import {
  getTimesheetsInProjectsWhereAdmin,
  getProjectOfSelectedTimesheet,
} from '../../common/store/selectors';
import { fetchProjects } from '../../projects/store/actions';
import { Project } from '../../projects/store/models';
import { Box } from '../../ui';
import { PageHeader, ToggleView } from '../../common';
import styled, { withProps, css } from '../../../styled/styled-components';

type Props = {
  match: any;
  timesheet: TimesheetItem;
  timesheetId: number;
  selectTimesheet: (timesheetId: number) => any;
  updateTimesheet: (timesheetId: number, timesheet: TimesheetItem) => any;
  fetchProjects: () => any;
  timesheetsWhereAdmin: TimesheetItem[];
  project: Project | null | undefined;
};

type State = Readonly<{
  logView: boolean;
}>;

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

const initialState: State = {
  logView: false,
};

class TimesheetViewPage extends React.Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    const { match, selectTimesheet, fetchProjects, timesheetId } = this.props;

    fetchProjects();

    if (match && match.params.id && +match.params.id !== timesheetId) {
      selectTimesheet(+match.params.id);
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
    const { logView } = this.state;

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
        <PageHeader
          options={
            isAdmin ? (
              <HeaderOption
                title="View Timesheet Log"
                onClick={() => this.setState({ logView: !logView })}
                active={logView}
              >
                <Icon
                  name={
                    logView ? 'fas fa-times fa-fw' : 'fas fa-calendar fa-fw'
                  }
                />
              </HeaderOption>
            ) : null
          }
        >
          {logView ? 'View Timesheet Log' : 'View Timesheet'}
        </PageHeader>

        <ToggleView
          views={[
            {
              name: 'Logs',
              show: logView,
              view: (
                <>
                  <Box title="Logs">
                    <TimesheetLogs />
                  </Box>
                  <Button onClick={() => this.setState({ logView: !logView })}>
                    Close
                  </Button>
                </>
              ),
            },
            {
              name: 'Calendar',
              show: !logView,
              view: (
                <>
                  {project && (
                    <TimesheetInfo project={project} timesheet={timesheet} />
                  )}

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
                </>
              ),
            },
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  timesheet: getSelectedTimesheet(state),
  timesheetId: getSelectedTimesheetId(state),
  timesheetsWhereAdmin: getTimesheetsInProjectsWhereAdmin(state),
  project: getProjectOfSelectedTimesheet(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectTimesheet,
      updateTimesheet,
      fetchProjects,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetViewPage);

const HeaderOption = withProps<{ active: boolean }, HTMLDivElement>(styled.div)`
  background: #4c84ff;
  color: #fff;
  padding: 10px;
  border-radius: 500px;
  display: inline;
  font-size: 1.2em;
  text-align: center;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  ${({ active }) =>
    active &&
    css`
      opacity: 0.5;
    `}
`;
