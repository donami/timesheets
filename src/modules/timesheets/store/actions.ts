import types from './types';
import {
  TimesheetItem,
  TimesheetTemplateItem,
  ConflictResolve,
} from './models';

export const fetchTimesheets = () => ({
  type: types.FETCH_TIMESHEETS,
});

export const fetchTimesheetTemplates = () => ({
  type: types.FETCH_TIMESHEET_TEMPLATES.REQUEST,
});

export const fetchTimesheetTemplatesIfNeeded = () => ({
  type: types.FETCH_TIMESHEET_TEMPLATES_IF_NEEDED,
});

export const selectTimesheet = (timesheetId: number) => ({
  type: types.SELECT_TIMESHEET,
  payload: {
    timesheetId,
  },
});

export const selectTemplate = (templateId: number) => ({
  type: types.SELECT_TEMPLATE.REQUEST,
  payload: {
    templateId,
  },
});

export const fetchTimesheetById = (timesheetId: number) => ({
  type: types.FETCH_TIMESHEET_BY_ID,
  payload: {
    timesheetId,
  },
});

export const fetchTemplateById = (templateId: number) => ({
  type: types.FETCH_TEMPLATE_BY_ID.REQUEST,
  payload: {
    templateId,
  },
});

export const updateTimesheet = (
  timesheetId: number,
  timesheet: TimesheetItem
) => ({
  type: types.UPDATE_TIMESHEET.REQUEST,
  payload: {
    timesheetId,
    timesheet,
  },
});

export const generateTimesheets = (
  from: string,
  to: string,
  projectId: number,
  userId: number,
  template: TimesheetTemplateItem
) => ({
  type: types.TIMESHEETS_GENERATE.REQUEST,
  payload: {
    from,
    to,
    projectId,
    userId,
    template,
  },
});

export const confirmTemplates = (templates: any) => ({
  type: types.TIMESHEETS_CONFIRM.REQUEST,
  payload: {
    ...templates,
  },
});

export const removeTimesheet = (timesheetId: number) => ({
  type: types.REMOVE_TIMESHEET.REQUEST,
  payload: {
    timesheetId,
  },
});

export const cancelTemplates = () => ({
  type: types.TIMESHEETS_CANCEL_TEMPLATES,
});

export const resolveTimesheetConflict = (
  timesheetId: number,
  periodStart: string,
  resolve: ConflictResolve
) => ({
  type: types.RESOLVE_TIMESHEET_CONFLICT.REQUEST,
  payload: {
    timesheetId,
    periodStart,
    resolve,
  },
});

export const createTimesheetTemplate = (
  template: Partial<TimesheetTemplateItem>
) => ({
  type: types.CREATE_TIMESHEET_TEMPLATE.REQUEST,
  payload: {
    template,
  },
});

export const updateTimesheetTemplate = (templateId: number, template: any) => ({
  type: types.UPDATE_TIMESHEET_TEMPLATE.REQUEST,
  payload: {
    templateId,
    template,
  },
});
