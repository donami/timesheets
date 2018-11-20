import * as React from 'react';
import { Icon, Button } from 'genui';
import * as moment from 'moment';
import {
  compose,
  branch,
  withHandlers,
  withState,
  renderComponent,
} from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { TimesheetInfo, TimesheetLogs, Calendar } from '../components';
import { TimesheetStatus } from '../store/models';
import { Box, PageLoader } from '../../ui';
import { PageHeader, ToggleView, NotFoundPage } from '../../common';
import styled, { withProps, css } from '../../../styled/styled-components';
import { UserRole } from '../../users/store/models';
import { paddEmptyDates } from '../../../utils/calendar';
import { UPDATE_TIMESHEET } from '../store/mutations';
import { CREATE_NOTIFICATION } from '../../auth/store/mutations';
import { CREATE_LOG } from '../../common/store/mutations';
import { NotificationType } from '../../auth/store/models';

type Props = {
  match: any;
};

type DataProps = {
  timesheet: any;
  loading: boolean;
  loggedInUser: any;
  updateTimesheet(options: any): any;
  createNotification(options: any): any;
  createLog(options: any): any;
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
    return <NotFoundPage />;
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
              onClick={() => setLogView(!logView)}
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
                  status={timesheet.status}
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
      firstName
      lastName
    }
  }
`;

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_TIMESHEET, {
    options: (props: any) => ({
      variables: { id: props.match.params.id },
    }),
    props: ({ data }: any) => ({
      loading: data.loading,
      timesheet: data.Timesheet,
      loggedInUser: data.user,
    }),
  }),
  graphql(CREATE_NOTIFICATION, { name: 'createNotification' }),
  graphql(CREATE_LOG, {
    name: 'createLog',
    options: (props: any) => ({
      update: (proxy, { data }: any) => {
        const { Timesheet, user }: any = proxy.readQuery({
          query: GET_TIMESHEET,
          variables: { id: props.timesheet.id },
        });

        proxy.writeQuery({
          query: GET_TIMESHEET,
          data: {
            user,
            Timesheet: {
              ...Timesheet,
              logs: Timesheet.logs.concat(data.createLog),
            },
          },
          variables: {
            id: props.timesheet.IDBCursor,
          },
        });
      },
    }),
  }),
  graphql(UPDATE_TIMESHEET, { name: 'updateTimesheet' }),
  withState('logView', 'setLogView', false),
  withHandlers<EnhancedProps, HandlerProps>({
    onSaveDraft: ({ timesheet, loggedInUser, updateTimesheet, createLog }) => (
      dates: any[]
    ) => {
      updateTimesheet({
        variables: {
          id: timesheet.id,
          status: TimesheetStatus.InProgressSaved,
        },
      });

      createLog({
        variables: {
          message: `Timesheet was saved as draft by ${loggedInUser.firstName} ${
            loggedInUser.lastName
          }`,
          userId: loggedInUser.id,
          timesheetId: timesheet.id,
        },
      });
    },
    onSubmit: ({ timesheet, loggedInUser, createLog, updateTimesheet }) => (
      dates: any[]
    ) => {
      updateTimesheet({
        variables: {
          id: timesheet.id,
          status: TimesheetStatus.WaitingForApproval,
        },
      });

      createLog({
        variables: {
          message: `Timesheet was submitted by ${loggedInUser.firstName} ${
            loggedInUser.lastName
          }`,
          userId: loggedInUser.id,
          timesheetId: timesheet.id,
        },
      });
    },
    onApprove: props => () => {
      const { timesheet, loggedInUser } = props;

      if (timesheet.status === TimesheetStatus.Approved) {
        return;
      }

      props.updateTimesheet({
        variables: {
          id: timesheet.id,
          status: TimesheetStatus.Approved,
        },
      });

      props.createNotification({
        variables: {
          message: 'Your timesheet was approved.',
          icon: 'fas fa-check',
          notificationType: NotificationType.TIMESHEET_APPROVED,
          userId: timesheet.owner.id,
        },
      });

      props.createLog({
        variables: {
          message: `Timesheet was approved by ${loggedInUser.firstName} ${
            loggedInUser.lastName
          }`,
          userId: loggedInUser.id,
          timesheetId: timesheet.id,
        },
      });
    },
    onDecline: ({
      timesheet,
      loggedInUser,
      updateTimesheet,
      createLog,
      createNotification,
    }) => () => {
      updateTimesheet({
        variables: {
          id: timesheet.id,
          status: TimesheetStatus.NeedsRevisement,
        },
      });

      createNotification({
        variables: {
          message: 'Your timesheet needs to be revised and submitted again.',
          icon: 'fas fa-exclamation-triangle',
          notificationType: NotificationType.TIMESHEET_NEEDS_REVISEMENT,
          userId: timesheet.owner.id,
        },
      });

      createLog({
        variables: {
          message: `Timesheet was declined by ${loggedInUser.firstName} ${
            loggedInUser.lastName
          }`,
          userId: loggedInUser.id,
          timesheetId: timesheet.id,
        },
      });
    },
  }),
  branch(({ loading }) => loading, renderComponent(PageLoader))
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
