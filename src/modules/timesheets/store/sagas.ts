import { call, put, takeEvery, all } from 'redux-saga/effects';

import Api from '../../../services/api';
import types from './types';
import {
  monthsBetween,
  generateCalendarFromTemplate,
} from '../../../utils/calendar';

function* fetchTimesheets(action: any) {
  yield put({ type: types.FETCH_TIMESHEETS_REQUEST });

  try {
    const response = yield call(Api.fetchTimesheets);
    yield put({
      payload: { ...response },
      type: types.FETCH_TIMESHEETS_SUCCESS,
    });
  } catch (e) {
    yield put({ type: types.FETCH_TIMESHEETS_FAILURE, message: e.message });
  }
}

function* fetchTimesheetById(action: any) {
  yield put({
    type: types.FETCH_TIMESHEET_BY_ID_REQUEST,
    payload: {
      timesheetId: action.payload.timesheetId,
    },
  });

  try {
    const response = yield call(
      Api.fetchTimesheetById,
      action.payload.timesheetId
    );

    yield put({
      payload: { ...response },
      type: types.FETCH_TIMESHEET_BY_ID_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_TIMESHEET_BY_ID_FAILURE,
      message: e.message,
    });
  }
}

function* selectTimesheetFunction(action: any) {
  yield put({
    type: types.FETCH_TIMESHEET_BY_ID,
    payload: {
      timesheetId: action.payload.timesheetId,
    },
  });

  try {
    yield put({
      type: types.SELECT_TIMESHEET_SUCCESS,
      payload: {
        timesheetId: action.payload.timesheetId,
      },
    });
  } catch (e) {
    yield put({
      type: types.SELECT_TIMESHEET_FAILURE,
      message: e.message,
    });
  }
}

function* updateTimesheet(action: any) {
  try {
    const response = yield call(
      Api.updateTimesheet,
      action.payload.timesheetId,
      action.payload.timesheet
    );

    yield put({
      payload: { ...response },
      type: types.UPDATE_TIMESHEET.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.UPDATE_TIMESHEET.FAILURE,
      message: e.message,
    });
  }
}

function* fetchTemplates(action: any) {
  try {
    const response = yield call(Api.fetchTimesheetTemplates);
    yield put({
      payload: { ...response },
      type: types.FETCH_TIMESHEET_TEMPLATES.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_TIMESHEET_TEMPLATES.FAILURE,
      message: e.message,
    });
  }
}

function* fetchTemplateById(action: any) {
  try {
    const response = yield call(
      Api.fetchTemplateById,
      action.payload.templateId
    );

    yield put({
      payload: { ...response },
      type: types.FETCH_TEMPLATE_BY_ID.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_TEMPLATE_BY_ID.FAILURE,
      message: e.message,
    });
  }
}

function* selectTemplate(action: any) {
  try {
    yield put({
      type: types.SELECT_TEMPLATE.SUCCESS,
      payload: {
        templateId: action.payload.templateId,
      },
    });
  } catch (e) {
    yield put({
      type: types.SELECT_TEMPLATE.FAILURE,
      message: e.message,
    });
  }
}

function* generateTimesheets(action: any) {
  try {
    const months = monthsBetween(action.payload.from, action.payload.to);

    const timesheets = months.map((startOfMonth: string) => {
      const dates = generateCalendarFromTemplate(
        startOfMonth,
        action.payload.template.hoursDays
      );

      return {
        dates,
        month: startOfMonth,
      };
    });

    yield put({
      type: types.TIMESHEETS_GENERATE.SUCCESS,
      payload: {
        timesheets,
      },
    });
  } catch (e) {
    yield put({
      type: types.TIMESHEETS_GENERATE.FAILURE,
      message: e.message,
    });
  }
}

function* confirmTemplates(action: any) {
  try {
    const response = yield call(Api.createTimesheets, action.payload.templates);

    yield put({
      type: types.TIMESHEETS_CONFIRM.SUCCESS,
      payload: { ...response },
    });
  } catch (e) {
    yield put({
      type: types.TIMESHEETS_CONFIRM.FAILURE,
      message: e.message,
    });
  }
}

export default all([
  takeEvery(types.SELECT_TIMESHEET, selectTimesheetFunction),
  takeEvery(types.FETCH_TIMESHEETS, fetchTimesheets),
  takeEvery(types.FETCH_TIMESHEET_BY_ID, fetchTimesheetById),
  takeEvery(types.UPDATE_TIMESHEET.REQUEST, updateTimesheet),
  takeEvery(types.FETCH_TIMESHEET_TEMPLATES.REQUEST, fetchTemplates),
  takeEvery(types.SELECT_TEMPLATE.REQUEST, selectTemplate),
  takeEvery(types.SELECT_TEMPLATE.SUCCESS, fetchTemplateById),
  takeEvery(types.TIMESHEETS_GENERATE.REQUEST, generateTimesheets),
  takeEvery(types.TIMESHEETS_CONFIRM.REQUEST, confirmTemplates),
]);
