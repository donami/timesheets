import { normalize } from 'normalizr';

import {
  TimesheetItem,
  TimesheetTemplateItem,
} from '../modules/timesheets/store/models';
import { Project } from '../modules/projects/store/models';
import { User } from '../modules/users/store/models';
import { API_URL } from '../config/constants';
import {
  projectSchema,
  expenseSchema,
  timesheetSchema,
  timesheetTemplateSchema,
  userSchema,
} from '../utils/schemas';

const handleError = (error: any) => {
  console.log(error);
  return error.json().then((err: any) => Promise.reject(err));
};

export interface NormalizedResponse {
  entities: {
    [key: number]: any;
  };
  result: any[];
}

export const fetchApi = (
  endpoint: string,
  method: string,
  schema: any = null,
  body: any = null
): Promise<NormalizedResponse> =>
  fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || '',
    },
    body: body ? JSON.stringify(body) : null,
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response.json();
    })
    .then(responseJson => {
      if (!schema) {
        return responseJson;
      }

      if (responseJson.data) {
        const result: any = {
          ...normalize(responseJson.data, schema),
          count: responseJson.count,
          totalCount: responseJson.totalCount,
        };

        if (responseJson.token) {
          result.token = responseJson.token;
        }

        return result;
      }

      return normalize(responseJson, schema);
    })
    .catch(handleError);

const fetchTimesheets = (): Promise<NormalizedResponse> =>
  fetchApi('timesheets', 'GET', [timesheetSchema]);

const fetchTimesheetTemplates = (): Promise<NormalizedResponse> =>
  fetchApi('timesheet-templates', 'GET', [timesheetTemplateSchema]);

const fetchProjects = (): Promise<NormalizedResponse> =>
  fetchApi('projects', 'GET', [projectSchema]);

const fetchExpenses = (): Promise<NormalizedResponse> =>
  fetchApi('expense-reports', 'GET', [expenseSchema]);

const fetchTimesheetById = (timesheetId: number): Promise<NormalizedResponse> =>
  fetchApi(`timesheets/${timesheetId}`, 'GET', timesheetSchema);

const fetchTemplateById = (templateId: number): Promise<NormalizedResponse> =>
  fetchApi(`timesheet-templates/${templateId}`, 'GET', timesheetTemplateSchema);

const fetchProjectById = (projectId: number): Promise<NormalizedResponse> =>
  fetchApi(`projects/${projectId}`, 'GET', projectSchema);

const createTimesheetTemplate = (
  template: Partial<TimesheetTemplateItem>
): Promise<NormalizedResponse> =>
  fetchApi(`timesheet-templates`, 'POST', timesheetTemplateSchema, {
    ...template,
  });

const updateTimesheet = (
  timesheetId: number,
  timesheet: TimesheetItem
): Promise<NormalizedResponse> =>
  fetchApi(`timesheets/${timesheetId}`, 'PUT', timesheetSchema, {
    ...timesheet,
  });

const updateProject = (
  projectId: number,
  project: Project
): Promise<NormalizedResponse> =>
  fetchApi(`projects/${projectId}`, 'PUT', projectSchema, { ...project });

const createProject = (
  project: Partial<Project>,
  userId: number
): Promise<NormalizedResponse> =>
  fetchApi(`projects`, 'POST', projectSchema, { ...project, userId });

const updateUser = (userId: number, user: User): Promise<NormalizedResponse> =>
  fetchApi(`users/${userId}`, 'PUT', userSchema, { ...user });

const createUser = (user: Partial<User>): Promise<NormalizedResponse> =>
  fetchApi(`users`, 'POST', userSchema, { ...user });

const fetchExpenseReportById = (
  expenseReportId: number
): Promise<NormalizedResponse> =>
  fetchApi(`expense-reports/${expenseReportId}`, 'GET', expenseSchema);

const fetchUserById = (userId: number): Promise<NormalizedResponse> =>
  fetchApi(`users/${userId}`, 'GET', userSchema);

const fetchUsers = (): Promise<NormalizedResponse> =>
  fetchApi(`users`, 'GET', [userSchema]);

const auth = (email: string, password: string): Promise<NormalizedResponse> =>
  fetchApi(`auth`, 'POST', userSchema, { email, password });

const verifyToken = (): Promise<NormalizedResponse> =>
  fetchApi(`verify-token`, 'GET', userSchema);

const createTimesheets = (data: any): Promise<NormalizedResponse> =>
  fetchApi('timesheets/create-timesheets', 'POST', [timesheetSchema], {
    data,
  });

const clearNotifications = (): Promise<NormalizedResponse> =>
  fetchApi('auth/clear-notifications', 'GET', userSchema);

export default {
  fetchTimesheets,
  fetchTimesheetById,
  updateTimesheet,
  fetchUsers,
  fetchUserById,
  fetchExpenses,
  fetchExpenseReportById,
  auth,
  verifyToken,
  updateUser,
  createUser,
  fetchProjects,
  fetchProjectById,
  updateProject,
  createProject,
  fetchTimesheetTemplates,
  fetchTemplateById,
  createTimesheets,
  createTimesheetTemplate,
  clearNotifications,
};
