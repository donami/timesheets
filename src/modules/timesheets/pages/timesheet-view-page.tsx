import * as React from 'react';
import { Icon, Button } from 'genui';
import * as moment from 'moment';
import {
  compose,
  branch,
  renderNothing,
  withHandlers,
  withState,
} from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { TimesheetInfo, TimesheetLogs, Calendar } from '../components';
import { TimesheetStatus } from '../store/models';
import { Box } from '../../ui';
import { PageHeader, ToggleView } from '../../common';
import styled, { withProps, css } from '../../../styled/styled-components';
import { UserRole } from '../../users/store/models';
import { paddEmptyDates } from '../../../utils/calendar';
import { UPDATE_TIMESHEET } from '../store/mutations';

type Props = {
  match: any;
};

type DataProps = {
  timesheet: any;
  loggedInUser: any;
  updateTimesheet(options: any): any;
};
type HandlerProps = {
  onSaveDraft(dates: any[]): any;
  onSubmit(dates: any[]): any;
  onApprove(): any;
  onDecline(): any;
};
type StateProps = { logView: boolean };
type StateHandlerProps = { setLogView(logView: boolean): void };
type EnhancedProps = Props &
  HandlerProps &
  DataProps &
  StateProps &
  StateHandlerProps;

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

const parseDates = (dates: any) => {
  const weeks: any[] = [];

  let weekIndex = 0;

  dates.forEach((date: any) => {
    if (!weeks[weekIndex]) {
      weeks[weekIndex] = [];
    }

    const current = moment(date.date);

    weeks[weekIndex].push(date);

    if (current.isoWeekday() === 7) {
      weekIndex = weekIndex + 1;
    }
  });

  return paddEmptyDates(weeks);
};

const TimesheetViewPage: React.SFC<any> = ({
  timesheet,
  onSubmit,
  onApprove,
  onSaveDraft,
  onDecline,
  loggedInUser,
  logView,
  setLogView,
}) => {
  if (!timesheet) {
    return null;
  }

  // If viewing the timesheet as admin or as user
  const isAdmin =
    [UserRole.Manager, UserRole.Admin].indexOf(loggedInUser.role) > -1;

  // If the calendar (hours) should be editable
  const editable = calendarEditable(timesheet.status, isAdmin);

  return (
    <div>
      <PageHeader
        options={
          isAdmin ? (
            <HeaderOption
              title="View Timesheet Log"
              onClick={() => setLogView(true)}
              active={logView}
            >
              <Icon
                name={logView ? 'fas fa-times fa-fw' : 'fas fa-calendar fa-fw'}
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
                  <TimesheetLogs logs={timesheet.logs} />
                </Box>
                <Button onClick={() => setLogView(false)}>Close</Button>
              </>
            ),
          },
          {
            name: 'Calendar',
            show: !logView,
            view: (
              <>
                <TimesheetInfo
                  project={timesheet.project}
                  timesheet={timesheet}
                  owner={timesheet.owner}
                />
                <Calendar
                  dates={parseDates(timesheet.dates)}
                  editable={editable}
                  isAdmin={isAdmin}
                  startOfMonth={timesheet.periodStart}
                  onSaveDraft={onSaveDraft}
                  onSubmit={onSubmit}
                  onApprove={onApprove}
                  onDecline={onDecline}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

const GET_TIMESHEET = gql`
  query getTimesheet($id: ID!) {
    Timesheet(id: $id) {
      id
      dateApproved
      dates {
        id
        date
        hours
        expected {
          inTime
          outTime
          break
          totalHours
        }
        reported {
          inTime
          outTime
          break
          totalHours
          message
        }
      }
      project {
        id
        name
      }
      logs {
        id
        message
        createdAt
      }
      owner {
        id
        firstName
        lastName
      }
      periodStart
      status
      updatedAt
      createdAt
    }
    user {
      id
      role
    }
  }
`;

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_TIMESHEET, {
    options: (props: any) => {
      return {
        variables: { id: props.match.params.id },
      };
    },
    props: ({ data }: any) => ({
      loading: data.loading,
      timesheet: data.Timesheet,
      loggedInUser: data.user,
    }),
  }),
  graphql(UPDATE_TIMESHEET, { name: 'updateTimesheet' }),
  withState('logView', 'setLogView', false),
  withHandlers<EnhancedProps, HandlerProps>({
    onSaveDraft: props => (dates: any[]) => {
      const { timesheet } = props;

      props.updateTimesheet({
        variables: {
          id: timesheet.id,
          status: TimesheetStatus.InProgressSaved,
        },
      });
    },
    onSubmit: props => (dates: any[]) => {
      const { timesheet } = props;

      props.updateTimesheet({
        variables: {
          id: timesheet.id,
          status: TimesheetStatus.WaitingForApproval,
        },
      });
    },
    onApprove: props => () => {
      const { timesheet } = props;

      props.updateTimesheet({
        variables: {
          id: timesheet.id,
          status: TimesheetStatus.Approved,
        },
      });
    },
    onDecline: props => () => {
      const { timesheet } = props;

      props.updateTimesheet({
        variables: {
          id: timesheet.id,
          status: TimesheetStatus.NeedsRevisement,
        },
      });
    },
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(TimesheetViewPage);

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
