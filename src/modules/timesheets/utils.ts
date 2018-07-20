import { TimesheetItem } from './store/models';
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
