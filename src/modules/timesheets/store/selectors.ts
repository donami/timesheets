import { createSelector } from 'reselect';
import { TimesheetItem, TimesheetStatus } from './models';
import { monthIsInPast } from '../../../utils/calendar';

const getTimesheetState = (state: any) => state.timesheets.timesheets;

const getTimesheetIds = createSelector(getTimesheetState, state => state.ids);

export const getSelectedTimesheetId = createSelector(
  getTimesheetState,
  state => state.selected
);

export const getTimesheetEntities = createSelector(
  getTimesheetState,
  state => state.byId
);

export const getTimesheetsLoaded = createSelector(
  getTimesheetState,
  state => state.loaded
);

export const getTimesheetsLoading = createSelector(
  getTimesheetState,
  state => state.loading
);

export const getTimesheets = createSelector(
  getTimesheetEntities,
  getTimesheetIds,
  (entities, ids) => {
    return ids.map((id: number | string) => entities[id]);
  }
);

export const getSelectedTimesheet = createSelector(
  getTimesheetEntities,
  getSelectedTimesheetId,
  (entities, id) => {
    return entities[id];
  }
);

/* Template Selectors */
const getTemplateState = (state: any) => state.timesheets.templates;

export const getTemplateEntities = createSelector(
  getTemplateState,
  state => state.byId
);

const getTemplateIds = createSelector(getTemplateState, state => state.ids);

const getSelectedTemplateId = createSelector(
  getTemplateState,
  state => state.selected
);

export const getTimesheetTemplates = createSelector(
  getTemplateEntities,
  getTemplateIds,
  (entities, ids) => {
    return ids.map((id: number | string) => entities[id]);
  }
);

export const getSelectedTemplate = createSelector(
  getTemplateEntities,
  getSelectedTemplateId,
  (entities, id) => {
    return entities[id];
  }
);

export const getTimesheetsWaitingForApproval = createSelector(
  getTimesheets,
  (timesheets: TimesheetItem[]) => {
    return timesheets.filter(
      timesheet => timesheet.status === TimesheetStatus.WaitingForApproval
    );
  }
);

export const getTimesheetsPastDueDate = createSelector(
  getTimesheets,
  (timesheets: TimesheetItem[]) => {
    return timesheets.filter(
      timesheet =>
        monthIsInPast(timesheet.periodStart) &&
        timesheet.status !== TimesheetStatus.Approved
    );
  }
);

/* Generator Selectors */
const getGeneratorState = (state: any) => state.timesheets.generator;

export const getGeneratedTimesheets = createSelector(
  getGeneratorState,
  state => {
    return state.generated;
  }
);
