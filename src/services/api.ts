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
import { ExpenseReport } from '../modules/expenses/store/models';

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
        const { data, count, totalCount, ...other } = responseJson;
        const result: any = {
          ...normalize(data, schema),
          count,
          totalCount,
          ...other,
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

const setup = (data: any): Promise<NormalizedResponse> =>
  fetchApi('setup', 'POST', null, data);

const isConfigured = (): Promise<NormalizedResponse> =>
  fetchApi('is-configured', 'GET');

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

const updateTimesheetTemplate = (
  templateId: number,
  template: Partial<TimesheetTemplateItem>
): Promise<NormalizedResponse> =>
  fetchApi(
    `timesheet-templates/${templateId}`,
    'PUT',
    timesheetTemplateSchema,
    {
      ...template,
    }
  );

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

const removeProject = (projectId: number): Promise<NormalizedResponse> =>
  fetchApi(`projects/${projectId}`, 'DELETE', projectSchema);

const createProject = (
  project: Partial<Project>,
  userId: number
): Promise<NormalizedResponse> =>
  fetchApi(`projects`, 'POST', projectSchema, { ...project, userId });

const updateUser = (userId: number, user: User): Promise<NormalizedResponse> =>
  fetchApi(`users/${userId}`, 'PUT', userSchema, { ...user });

const disableUser = (userId: number): Promise<NormalizedResponse> =>
  fetchApi(`users/${userId}/disable`, 'PUT', userSchema);

const enableUser = (userId: number): Promise<NormalizedResponse> =>
  fetchApi(`users/${userId}/enable`, 'PUT', userSchema);

const createUser = (user: Partial<User>): Promise<NormalizedResponse> =>
  fetchApi(`users`, 'POST', userSchema, { ...user });

const fetchExpenseReportById = (
  expenseReportId: number
): Promise<NormalizedResponse> =>
  fetchApi(`expense-reports/${expenseReportId}`, 'GET', expenseSchema);

const createExpense = (
  expense: Partial<ExpenseReport>
): Promise<NormalizedResponse> =>
  fetchApi(`expense-reports`, 'POST', expenseSchema, { ...expense });

const updateExpense = (
  expenseReportId: number,
  expense: ExpenseReport
): Promise<NormalizedResponse> =>
  fetchApi(`expense-reports/${expenseReportId}`, 'PUT', expenseSchema, {
    ...expense,
  });

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

const removeTimesheet = (timesheetId: number): Promise<NormalizedResponse> =>
  fetchApi(`timesheets/${timesheetId}`, 'DELETE', timesheetSchema);

const removeTimesheetTemplate = (
  templateId: number
): Promise<NormalizedResponse> =>
  fetchApi(
    `timesheet-templates/${templateId}`,
    'DELETE',
    timesheetTemplateSchema
  );

const clearNotifications = (): Promise<NormalizedResponse> =>
  fetchApi('auth/clear-notifications', 'GET', userSchema);

const recoverPassword = (email: string): Promise<NormalizedResponse> =>
  fetchApi('auth/recover-password', 'POST', userSchema, { email });

const recoverPasswordChange = (
  data: any,
  code: string
): Promise<NormalizedResponse> =>
  fetchApi('auth/recover-password-change', 'POST', userSchema, {
    ...data,
    code,
  });

const verifyRecoverCode = (userId: number, code: string): Promise<any> =>
  fetchApi(`auth/verify-recover-code?userId=${userId}&code=${code}`, 'GET');

const uploadProfileImage = (file: any): Promise<any> => {
  const formData = new FormData();
  formData.append('avatar', file);

  return fetch(`${API_URL}/auth/upload-profile-image`, {
    method: 'POST',
    headers: {
      'x-access-token': localStorage.getItem('token') || '',
    },
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response.json();
    })
    .then(responseJson => {
      return normalize(responseJson, userSchema);
    })
    .catch(handleError);
};

const createExpenseLineItem = (lineItem: any): Promise<any> => {
  const formData = new FormData();

  lineItem.files
    .filter((file: any) => typeof file === 'string')
    .forEach((file: string) => {
      formData.append('previousFiles', file);
    });

  lineItem.files
    .filter((file: any) => typeof file !== 'string')
    .forEach((file: any) => {
      formData.append('files', file);
    });

  formData.append('amount', lineItem.amount);
  formData.append('currency', lineItem.currency);
  formData.append('expenseDate', lineItem.expenseDate);
  formData.append('expenseType', lineItem.expenseType);

  return fetch(`${API_URL}/expense-reports/line-item-upload`, {
    method: 'POST',
    headers: {
      'x-access-token': localStorage.getItem('token') || '',
    },
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response.json();
    })
    .then(responseJson => {
      return responseJson;
    })
    .catch(handleError);
};

export default {
  fetchTimesheets,
  fetchTimesheetById,
  updateTimesheet,
  fetchUsers,
  fetchUserById,
  createExpense,
  updateExpense,
  fetchExpenses,
  fetchExpenseReportById,
  auth,
  verifyToken,
  updateUser,
  createUser,
  disableUser,
  enableUser,
  removeTimesheet,
  fetchProjects,
  fetchProjectById,
  updateProject,
  createProject,
  removeProject,
  fetchTimesheetTemplates,
  fetchTemplateById,
  createTimesheets,
  createTimesheetTemplate,
  updateTimesheetTemplate,
  removeTimesheetTemplate,
  clearNotifications,
  recoverPassword,
  recoverPasswordChange,
  verifyRecoverCode,
  uploadProfileImage,
  createExpenseLineItem,
  setup,
  isConfigured,
};
