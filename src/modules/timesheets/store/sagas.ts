import {
  call,
  put,
  takeEvery,
  all,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as toastr from '../../../services/toastr';
import Api from '../../../services/api';
import types from './types';
import {
  monthsBetween,
  generateCalendarFromTemplate,
} from '../../../utils/calendar';
import { ConflictResolve } from './models';
import { getTemplatesLoaded, getTemplatesLoading } from './selectors';

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

function* fetchTemplatesIfNeeded(action: any) {
  const loaded = yield select(getTemplatesLoaded);
  const loading = yield select(getTemplatesLoading);

  if (loaded || loading) {
    return;
  }

  yield put({
    type: types.FETCH_TIMESHEET_TEMPLATES.REQUEST,
  });
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

function* removeTimesheet(action: any) {
  try {
    const response = yield call(
      Api.removeTimesheet,
      action.payload.timesheetId
    );

    yield all([
      put({
        type: types.REMOVE_TIMESHEET.SUCCESS,
        payload: {
          ...response,
        },
      }),
      put(
        toastr.success({
          title: 'Timesheet removed!',
          message: 'The timesheet was removed.',
        })
      ),
    ]);
  } catch (e) {
    yield all([
      put({
        type: types.REMOVE_TIMESHEET.FAILURE,
        message: e.message,
      }),
      put(
        toastr.error({
          title: 'Oops!',
          message: 'Unable to remove timesheet.',
        })
      ),
    ]);
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
        projectId: action.payload.projectId,
        userId: action.payload.userId,
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
    const response = yield call(Api.createTimesheets, action.payload);

    yield put(
      toastr.success({
        title: 'Templates was created!',
        message: 'Templates was successfully created!',
      })
    );

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

function* resolveTimesheetConflict(action: any) {
  const { payload } = action;

  if (payload.resolve === ConflictResolve.DISCARD_NEW) {
  }

  if (payload.resolve === ConflictResolve.DISCARD_OLD) {
    // TODO: api call to remove old timesheet
    yield put({
      type: types.REMOVE_TIMESHEET.REQUEST,
      payload: {
        timesheetId: action.payload.timesheetId,
      },
    });
  }

  yield put({
    type: types.RESOLVE_TIMESHEET_CONFLICT.SUCCESS,
    payload: {
      ...payload,
    },
  });
}

function* createTimesheetTemplate(action: any) {
  try {
    const response = yield call(
      Api.createTimesheetTemplate,
      action.payload.template
    );

    yield put({
      payload: { ...response },
      type: types.CREATE_TIMESHEET_TEMPLATE.SUCCESS,
    });

    yield put(
      toastr.success({
        title: 'Template was created!',
        message: 'Template was successfully created!',
      })
    );

    yield put(push('/timesheet-templates'));
  } catch (e) {
    yield put({
      type: types.CREATE_TIMESHEET_TEMPLATE.FAILURE,
      message: e.message,
    });
  }
}

export default all([
  takeEvery(types.SELECT_TIMESHEET, selectTimesheetFunction),
  takeLatest(types.FETCH_TIMESHEETS, fetchTimesheets),
  takeEvery(types.FETCH_TIMESHEET_BY_ID, fetchTimesheetById),
  takeEvery(types.UPDATE_TIMESHEET.REQUEST, updateTimesheet),
  takeEvery(types.REMOVE_TIMESHEET.REQUEST, removeTimesheet),
  takeEvery(types.FETCH_TIMESHEET_TEMPLATES.REQUEST, fetchTemplates),
  takeEvery(types.FETCH_TIMESHEET_TEMPLATES_IF_NEEDED, fetchTemplatesIfNeeded),
  takeEvery(types.SELECT_TEMPLATE.REQUEST, selectTemplate),
  takeEvery(types.SELECT_TEMPLATE.SUCCESS, fetchTemplateById),
  takeEvery(types.TIMESHEETS_GENERATE.REQUEST, generateTimesheets),
  takeEvery(types.TIMESHEETS_CONFIRM.REQUEST, confirmTemplates),
  takeEvery(types.RESOLVE_TIMESHEET_CONFLICT.REQUEST, resolveTimesheetConflict),
  takeEvery(types.CREATE_TIMESHEET_TEMPLATE.REQUEST, createTimesheetTemplate),
]);
