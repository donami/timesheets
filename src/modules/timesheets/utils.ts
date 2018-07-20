import { TimesheetItem } from './store/models';

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
