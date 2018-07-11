import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Api from '../../../services/api';
import types from './types';
import * as actions from './actions';

const getAuthState = (state: any) => state.auth;

function* auth(action: any) {
  try {
    const { email, password } = action.payload;
    const response = yield call(Api.auth, email, password);

    localStorage.setItem('auth', JSON.stringify({ email, password }));

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
    localStorage.removeItem('auth');
    localStorage.removeItem('serializedUser');

    yield put({
      type: types.LOGOUT.SUCCESS,
    });
  } catch (error) {
    yield put({ type: types.LOGOUT.FAILURE, message: error.message });
  }
}

function* checkStorage(action: any) {
  const state = yield select(getAuthState);

  if (state && state.checkedStorage) {
    return null;
  }

  try {
    const stored = localStorage.getItem('auth');

    if (stored) {
      const { email, password } = JSON.parse(stored);

      yield put(actions.auth(email, password));
      yield put({ type: types.CHECK_STORAGE.SUCCESS });
      // dispatch(auth(email, password));

      // return dispatch(actions.checkStorage());
    }
    yield put({ type: types.CHECK_STORAGE.SUCCESS });

    // return dispatch(actions.checkStorage());

    // yield put({
    //   payload: { ...response },
    //   type: types.CHECK_STORAGE.SUCCESS,
    // });
  } catch (e) {
    yield put({ type: types.CHECK_STORAGE.FAILURE, message: e.message });
  }
}

function* redirectToAuthPage(action: any) {
  yield put(push('/auth'));
}

export default all([
  takeEvery(types.AUTH.REQUEST, auth),
  takeEvery(types.CHECK_STORAGE.REQUEST, checkStorage),
  takeEvery(types.LOGOUT.REQUEST, logout),
  takeEvery(types.LOGOUT.SUCCESS, redirectToAuthPage),
]);
