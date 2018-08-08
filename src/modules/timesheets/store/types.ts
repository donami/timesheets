import { createRequestTypes } from '../../../store/utils';

const FETCH_TIMESHEETS = 'FETCH_TIMESHEETS';
const FETCH_TIMESHEETS_REQUEST = 'FETCH_TIMESHEETS_REQUEST';
const FETCH_TIMESHEETS_SUCCESS = 'FETCH_TIMESHEETS_SUCCESS';
const FETCH_TIMESHEETS_FAILURE = 'FETCH_TIMESHEETS_FAILURE';
const FETCH_TIMESHEET_BY_ID = 'FETCH_TIMESHEET_BY_ID';
const FETCH_TIMESHEET_BY_ID_REQUEST = 'FETCH_TIMESHEET_BY_ID_REQUEST';
const FETCH_TIMESHEET_BY_ID_SUCCESS = 'FETCH_TIMESHEET_BY_ID_SUCCESS';
const FETCH_TIMESHEET_BY_ID_FAILURE = 'FETCH_TIMESHEET_BY_ID_FAILURE';
const SELECT_TIMESHEET = 'SELECT_TIMESHEET';
const SELECT_TIMESHEET_SUCCESS = 'SELECT_TIMESHEET_SUCCESS';
const SELECT_TIMESHEET_FAILURE = 'SELECT_TIMESHEET_FAILURE';
const UPDATE_TIMESHEET = createRequestTypes('UPDATE_TIMESHEET');
const REMOVE_TIMESHEET = createRequestTypes('REMOVE_TIMESHEET');
const FETCH_TIMESHEET_TEMPLATES = createRequestTypes(
  'FETCH_TIMESHEET_TEMPLATES'
);
const FETCH_TEMPLATE_BY_ID = createRequestTypes('FETCH_TEMPLATE_BY_ID');
const SELECT_TEMPLATE = createRequestTypes('SELECT_TEMPLATE');
const TIMESHEETS_GENERATE = createRequestTypes('TIMESHEETS_GENERATE');
const RESOLVE_TIMESHEET_CONFLICT = createRequestTypes(
  'RESOLVE_TIMESHEET_CONFLICT'
);
const TIMESHEETS_CONFIRM = createRequestTypes('TIMESHEETS_CONFIRM');
const CREATE_TIMESHEET_TEMPLATE = createRequestTypes(
  'CREATE_TIMESHEET_TEMPLATE'
);
const TIMESHEETS_CANCEL_TEMPLATES = 'TIMESHEETS_CANCEL_TEMPLATES';

export default {
  FETCH_TIMESHEETS,
  FETCH_TIMESHEETS_REQUEST,
  FETCH_TIMESHEETS_SUCCESS,
  FETCH_TIMESHEETS_FAILURE,
  FETCH_TIMESHEET_BY_ID,
  FETCH_TIMESHEET_BY_ID_REQUEST,
  FETCH_TIMESHEET_BY_ID_SUCCESS,
  FETCH_TIMESHEET_BY_ID_FAILURE,
  SELECT_TIMESHEET,
  SELECT_TIMESHEET_SUCCESS,
  SELECT_TIMESHEET_FAILURE,
  UPDATE_TIMESHEET,
  REMOVE_TIMESHEET,
  FETCH_TIMESHEET_TEMPLATES,
  FETCH_TEMPLATE_BY_ID,
  SELECT_TEMPLATE,
  TIMESHEETS_GENERATE,
  RESOLVE_TIMESHEET_CONFLICT,
  TIMESHEETS_CONFIRM,
  CREATE_TIMESHEET_TEMPLATE,
  TIMESHEETS_CANCEL_TEMPLATES,
};
