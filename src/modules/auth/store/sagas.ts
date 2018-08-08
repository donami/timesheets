import { call, put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Api from '../../../services/api';
import types from './types';
import * as toastr from '../../../services/toastr';

function* auth(action: any) {
  try {
    const { email, password } = action.payload;
    const response = yield call(Api.auth, email, password);

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    yield put({
      payload: { ...response },
      type: types.AUTH.SUCCESS,
    });
  } catch (e) {
    yield all([
      put(
        toastr.error({
          title: 'Unable to login!',
          message: e.message,
        })
      ),
      put({ type: types.AUTH.FAILURE, message: e.message }),
    ]);
  }
}

function* logout(action: any) {
  try {
    localStorage.removeItem('token');

    yield put({
      type: types.LOGOUT.SUCCESS,
    });
  } catch (error) {
    yield put({ type: types.LOGOUT.FAILURE, message: error.message });
  }
}

function* redirectToAuthPage(action: any) {
  yield put(push('/auth'));
}

function* clearNotifications(action: any) {
  try {
    const response = yield call(Api.clearNotifications);

    yield put({
      payload: { ...response },
      type: types.CLEAR_NOTIFICATIONS.SUCCESS,
    });
  } catch (e) {
    yield put({ type: types.CLEAR_NOTIFICATIONS.FAILURE, message: e.message });
  }
}

function* fetchAll(action: any) {
  yield put({ type: 'FETCH_ALL' });
}

export default all([
  takeEvery(types.AUTH.REQUEST, auth),
  takeEvery(types.LOGOUT.REQUEST, logout),
  takeEvery(types.CLEAR_NOTIFICATIONS.REQUEST, clearNotifications),
  takeEvery(types.LOGOUT.SUCCESS, redirectToAuthPage),
  takeEvery(types.AUTH.SUCCESS, fetchAll),
]);
