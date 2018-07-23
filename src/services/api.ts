import { normalize } from 'normalizr';

import {
  timesheetSchema,
  TimesheetItem,
  timesheetTemplateSchema,
} from '../modules/timesheets/store/models';
import { userSchema } from '../modules/auth/store/models';
import { expenseSchema } from '../modules/expenses/store/models';
import { Project, projectSchema } from '../modules/projects/store/models';
import { User } from '../modules/users/store/models';
import { API_URL } from '../config/constants';
import { groupSchema, Group } from '../modules/groups/store/models';

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

const fetchApi = (
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

const fetchGroups = (options: any = {}): Promise<NormalizedResponse> => {
  let url = 'groups';

  if (options.byUser) {
    url = `groups?byUser=${options.byUser}`;
  }

  return fetchApi(url, 'GET', [groupSchema]);
};

const fetchGroupById = (groupId: number): Promise<NormalizedResponse> =>
  fetchApi(`groups/${groupId}`, 'GET', groupSchema);

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

const updateGroup = (
  groupId: number,
  group: Group
): Promise<NormalizedResponse> =>
  fetchApi(`groups/${groupId}`, 'PUT', groupSchema, { ...group });

const updateGroupMember = (
  groupIds: number[],
  userId: number
): Promise<NormalizedResponse> =>
  fetchApi(`groups/update-group-member`, 'PUT', [groupSchema], {
    groupIds,
    userId,
  });

const updateUser = (userId: number, user: User): Promise<NormalizedResponse> =>
  fetchApi(`users/${userId}`, 'PUT', userSchema, { ...user });

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

const createTimesheets = (data: any): Promise<NormalizedResponse> =>
  fetchApi('timesheets/create-timesheets', 'POST', [timesheetSchema], {
    data,
  });

export default {
  fetchTimesheets,
  fetchTimesheetById,
  updateTimesheet,
  fetchUsers,
  fetchUserById,
  fetchExpenses,
  fetchExpenseReportById,
  auth,
  updateUser,
  fetchProjects,
  fetchProjectById,
  updateProject,
  updateGroup,
  updateGroupMember,
  fetchGroupById,
  fetchGroups,
  fetchTimesheetTemplates,
  fetchTemplateById,
  createTimesheets,
};
