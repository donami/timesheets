import { call, put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Api from '../../../services/api';
import types from './types';
import * as toastr from '../../../services/toastr';

function* fetchUsers(action: any) {
  yield put({ type: types.FETCH_USERS_REQUEST });

  try {
    const response = yield call(Api.fetchUsers);
    yield put({
      payload: { ...response },
      type: types.FETCH_USERS_SUCCESS,
    });
  } catch (e) {
    yield put({ type: types.FETCH_USERS_FAILURE, message: e.message });
  }
}

function* fetchUserById(action: any) {
  yield put({
    type: types.FETCH_USER_BY_ID_REQUEST,
    payload: {
      userId: action.payload.userId,
    },
  });

  try {
    const response = yield call(Api.fetchUserById, action.payload.userId);

    yield put({
      payload: { ...response },
      type: types.FETCH_USER_BY_ID_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_USER_BY_ID_FAILURE,
      message: e.message,
    });
  }
}

function* selectUser(action: any) {
  yield put({
    type: types.FETCH_USER_BY_ID,
    payload: {
      userId: action.payload.userId,
    },
  });

  yield put({
    type: 'FETCH_GROUPS',
    payload: {
      options: {
        byUser: action.payload.userId,
      },
    },
  });

  try {
    yield put({
      type: types.SELECT_USER_SUCCESS,
      payload: {
        userId: action.payload.userId,
      },
    });
  } catch (e) {
    yield put({
      type: types.SELECT_USER_FAILURE,
      message: e.message,
    });
  }
}

function* updateUser(action: any) {
  try {
    const response = yield call(
      Api.updateUser,
      action.payload.userId,
      action.payload.user
    );

    yield put({
      payload: { ...response },
      type: types.UPDATE_USER.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.UPDATE_USER.FAILURE,
      message: e.message,
    });
  }
}

function* createUser(action: any) {
  try {
    const response = yield call(Api.createUser, action.payload.user);

    yield put({
      payload: { ...response },
      type: types.CREATE_USER.SUCCESS,
    });

    yield put(
      toastr.success({
        title: 'User was created!',
        message: 'User was successfully created!',
      })
    );

    yield put(push('/users'));
  } catch (e) {
    yield put({
      type: types.CREATE_USER.FAILURE,
      message: e.message,
    });
  }
}

export default all([
  takeEvery(types.SELECT_USER, selectUser),
  takeEvery(types.FETCH_USERS, fetchUsers),
  takeEvery(types.FETCH_USER_BY_ID, fetchUserById),
  takeEvery(types.UPDATE_USER.REQUEST, updateUser),
  takeEvery(types.CREATE_USER.REQUEST, createUser),
]);
