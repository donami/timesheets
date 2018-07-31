import { call, put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Api from '../../../services/api';
import types from './types';

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
    yield put({ type: types.AUTH.FAILURE, message: e.message });
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

export default all([
  takeEvery(types.AUTH.REQUEST, auth),
  takeEvery(types.LOGOUT.REQUEST, logout),
  takeEvery(types.LOGOUT.SUCCESS, redirectToAuthPage),
]);
