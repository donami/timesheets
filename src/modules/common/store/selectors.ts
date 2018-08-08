import { createSelector } from 'reselect';
import { getSelectedGroup } from '../../groups/store/selectors';
import {
  getUserEntities,
  getSelectedUserId,
  getUsers,
} from '../../users/store/selectors';
import { getProjects } from '../../projects/store/selectors';
import { Project } from '../../projects/store/models';
import {
  getTimesheetsWaitingForApproval,
  getTimesheets,
  getSelectedTimesheet,
  getSelectedTimesheetId,
} from '../../timesheets/store/selectors';
import {
  getAuthedUserProjectsWhereAdmin,
  getAuthedUser,
} from '../../auth/store/selectors';
import { TimesheetItem } from '../../timesheets/store/models';
import { User } from '../../users/store/models';
import { getLogs } from '../../logs/store/selectors';
import { Log } from '../../logs/store/models';

// Get timesheets assigned to the authed user
export const getTimesheetsForAuthedUser = createSelector(
  getAuthedUser,
  getTimesheets,
  (user: User, timesheets: TimesheetItem[]) =>
    timesheets.filter((timesheet: any) => timesheet.owner === user.id)
);

// Get the members of the selected group
export const getSelectedGroupMembers = createSelector(
  getSelectedGroup,
  getUsers,
  (group, users: User[]) => {
    if (!group || !users) {
      return [];
    }

    return users.filter(user => {
      return user.group === group.id;
    });
  }
);

// Get selected language
export const getSelectedLanguage = (state: any) => {
  return state.common.language;
};

export const getIsInitialized = (state: any) => {
  return state.common.initialized;
};

// Get projects of the selected user
export const getSelectedUserProjects = createSelector(
  getSelectedUserId,
  getProjects,
  (userId, projects) => {
    return projects.filter((project: Project) => {
      if (project.members.find(member => member.user === userId)) {
        return true;
      }
      return false;
    });
  }
);

export const getSelectedUserTimesheets = createSelector(
  getSelectedUserId,
  getTimesheets,
  (userId, timesheets: TimesheetItem[]) => {
    if (!userId || !timesheets) {
      return [];
    }
    return timesheets.filter(timesheet => timesheet.owner === userId);
  }
);

// Get timesheets in projects where authed user has admin rights
export const getTimesheetsInProjectsWhereAdmin = createSelector(
  getTimesheets,
  getAuthedUserProjectsWhereAdmin,
  (timesheets: TimesheetItem[], projects: Project[]) => {
    return timesheets.filter(timesheet => {
      if (
        projects.find(
          (project: any) => project.timesheets.indexOf(timesheet.id) > -1
        )
      ) {
        return true;
      }
      return false;
    });
  }
);

// Get timesheets in projects where authed user has admin rights,
// and status of timesheets is waiting for approval
export const getTimesheetsWaitingForApprovalWhereAdmin = createSelector(
  getTimesheetsWaitingForApproval,
  getAuthedUserProjectsWhereAdmin,
  (timesheets: TimesheetItem[], projects: Project[]) => {
    return timesheets.filter(timesheet => {
      if (
        projects.find(
          (project: any) => project.timesheets.indexOf(timesheet.id) > -1
        )
      ) {
        return true;
      }
      return false;
    });
  }
);

// Get the project of the currently selected timesheet
export const getProjectOfSelectedTimesheet = createSelector(
  getSelectedTimesheet,
  getProjects,
  (timesheet: TimesheetItem, projects: Project[]) => {
    if (!timesheet) {
      return null;
    }

    return projects.find((project: any) => {
      if (project.timesheets.indexOf(timesheet.id) > -1) {
        return true;
      }
      return false;
    });
  }
);

export const getLogsOfSelectedTimesheet = createSelector(
  getSelectedTimesheetId,
  getLogs,
  (timesheetId, logs: Log[]) => {
    if (!timesheetId || !logs) {
      return [];
    }
    return logs.filter(
      log =>
        log.reference.kind === 'Timesheet' &&
        log.reference.item.id === timesheetId
    );
  }
);

export const getCurrentLocation = (state: any) => state.router.location;
