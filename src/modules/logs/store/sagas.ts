import { call, put, takeEvery, all } from 'redux-saga/effects';

import * as Api from '../api';
import types from './types';

function* fetchLogs(action: any) {
  try {
    const response = yield call(Api.fetchLogs);
    yield put({
      payload: { ...response },
      type: types.FETCH_LOGS.SUCCESS,
    });
  } catch (e) {
    yield put({ type: types.FETCH_LOGS.FAILURE, message: e.message });
  }
}

export default all([takeEvery(types.FETCH_LOGS.REQUEST, fetchLogs)]);
