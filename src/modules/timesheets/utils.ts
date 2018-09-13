import { TimesheetItem, TimesheetStatus } from './store/models';
import { DISPLAY_ONLY_PAST_AND_CURRENT_TIMESHEET } from '../../config/constants';
import { isSameOrBeforeMonth } from '../../utils/calendar';

/**
 * Sort by date
 * Returns newest first
 */
export const sortByDate = (timesheet: TimesheetItem, other: TimesheetItem) => {
  return (
    new Date(other.periodStart).getTime() -
    new Date(timesheet.periodStart).getTime()
  );
};

/**
 * Depending on config value, return only past and current
 * timesheets, filtering out future timesheets
 * @param timesheet Timesheet item
 */
export const filterOutFutureTimesheets = (timesheet: TimesheetItem) => {
  if (!DISPLAY_ONLY_PAST_AND_CURRENT_TIMESHEET) {
    return true;
  }
  return isSameOrBeforeMonth(timesheet.periodStart);
};

/**
 * Get status color of timesheets used for StatusColor component
 * @param status Props with status attributes
 */
export const getStatusColor = (status: TimesheetStatus) => {
  const statusColor: any = {};

  switch (status) {
    case TimesheetStatus.Approved:
      statusColor.positive = true;
      break;

    case TimesheetStatus.NeedsRevisement:
      statusColor.negative = true;
      break;

    case TimesheetStatus.WaitingForApproval:
      statusColor.info = true;
      break;

    case TimesheetStatus.InProgress:
    case TimesheetStatus.InProgressSaved:
    default:
      break;
  }

  return statusColor;
};

export const displayTimesheetStatus = (status: TimesheetStatus) => {
  const map = {
    [TimesheetStatus.Approved]: 'Approved',
    [TimesheetStatus.InProgress]: 'In Progress',
    [TimesheetStatus.InProgressSaved]: 'In Progress (Saved)',
    [TimesheetStatus.WaitingForApproval]: 'Waiting for Approval',
    [TimesheetStatus.NeedsRevisement]: 'Needs Revisement',
  };

  return map[status] || '';
};
