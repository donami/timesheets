import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Api from '../../../services/api';
import types from './types';
import * as toastr from '../../../services/toastr';
import * as projectActions from '../../projects/store/actions';
import { getUsersLoaded, getUsersLoading } from './selectors';

function* fetchUsers(action: any) {
  try {
    const response = yield call(Api.fetchUsers);
    yield put({
      payload: { ...response },
      type: types.FETCH_USERS.SUCCESS,
    });
  } catch (e) {
    yield put({ type: types.FETCH_USERS.FAILURE, message: e.message });
  }
}

function* fetchUsersIfNeeded() {
  const loaded = yield select(getUsersLoaded);
  const loading = yield select(getUsersLoading);

  if (loaded || loading) {
    return;
  }

  yield put({ type: types.FETCH_USERS.REQUEST });
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
  yield [
    call(fetchUserById, action),
    put({
      type: 'FETCH_GROUPS',
      // TODO:
      // payload: {
      //   options: {
      //     byUser: action.payload.userId,
      //   },
      // },
    }),
    put(projectActions.fetchProjects()),
  ];

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

    yield all([
      put({
        payload: { ...response },
        type: types.UPDATE_USER.SUCCESS,
      }),
      put(
        toastr.success({
          title: 'User was updated!',
          message: 'User was successfully updated!',
        })
      ),
    ]);
  } catch (e) {
    yield put({
      type: types.UPDATE_USER.FAILURE,
      message: e.message,
    });
  }
}

function* disableUser(action: any) {
  try {
    const response = yield call(Api.disableUser, action.payload.userId);

    yield put({
      payload: { ...response },
      type: types.DISABLE_USER.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.DISABLE_USER.FAILURE,
      message: e.message,
    });
  }
}

function* enableUser(action: any) {
  try {
    const response = yield call(Api.enableUser, action.payload.userId);

    yield put({
      payload: { ...response },
      type: types.ENABLE_USER.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.ENABLE_USER.FAILURE,
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
  takeEvery(types.FETCH_USERS_IF_NEEDED, fetchUsersIfNeeded),
  takeEvery(types.SELECT_USER, selectUser),
  takeEvery(types.FETCH_USERS.REQUEST, fetchUsers),
  takeEvery(types.FETCH_USER_BY_ID, fetchUserById),
  takeEvery(types.UPDATE_USER.REQUEST, updateUser),
  takeEvery(types.CREATE_USER.REQUEST, createUser),
  takeEvery(types.DISABLE_USER.REQUEST, disableUser),
  takeEvery(types.ENABLE_USER.REQUEST, enableUser),
]);
