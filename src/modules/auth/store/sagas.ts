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

function* recoverPassword(action: any) {
  try {
    const response = yield call(Api.recoverPassword, action.payload.email);

    yield put({
      payload: { ...response },
      type: types.RECOVER_PASSWORD.SUCCESS,
    });
  } catch (e) {
    yield all([
      put(
        toastr.error({
          title: 'Oops!',
          message: e.message,
        })
      ),
      put({ type: types.RECOVER_PASSWORD.FAILURE, message: e.message }),
    ]);
  }
}

function* recoverPasswordChange(action: any) {
  try {
    const response = yield call(
      Api.recoverPasswordChange,
      action.payload.data,
      action.payload.code
    );

    yield all([
      put(
        toastr.success({
          title: 'Password changed!',
          message: 'You should now be able to login with the new password.',
        })
      ),
      put({
        payload: { ...response },
        type: types.RECOVER_PASSWORD_CHANGE.SUCCESS,
      }),
      put(push('/auth')),
    ]);
  } catch (e) {
    yield put({
      type: types.RECOVER_PASSWORD_CHANGE.FAILURE,
      message: e.message,
    });
  }
}

function* verifyRecoverCode(action: any) {
  try {
    yield call(
      Api.verifyRecoverCode,
      action.payload.userId,
      action.payload.code
    );

    yield put({
      payload: {
        code: action.payload.code,
        userId: action.payload.userId,
      },
      type: types.VERIFY_RECOVER_CODE.SUCCESS,
    });
  } catch (e) {
    yield put({ type: types.VERIFY_RECOVER_CODE.FAILURE, message: e.message });
  }
}

function* updateProfile(action: any) {
  try {
    const response = yield call(
      Api.updateUser,
      action.payload.data.id,
      action.payload.data
    );

    yield all([
      put({
        payload: { ...response },
        type: types.UPDATE_PROFILE.SUCCESS,
      }),
      put(
        toastr.success({
          title: 'Updated!',
          message: 'Your profile was updated.',
        })
      ),
    ]);
  } catch (e) {
    yield all([
      put({ type: types.UPDATE_PROFILE.FAILURE, message: e.message }),
      put(
        toastr.error({
          title: 'Oops!',
          message: e.message,
        })
      ),
    ]);
  }
}

function* uploadProfileImage(action: any) {
  try {
    const response = yield call(Api.uploadProfileImage, action.payload.file);

    yield all([
      put({
        payload: { ...response },
        type: types.UPLOAD_PROFILE_IMAGE.SUCCESS,
      }),
      put(
        toastr.success({
          title: 'Updated!',
          message: 'Your profile was updated.',
        })
      ),
    ]);
  } catch (e) {
    yield all([
      put({ type: types.UPLOAD_PROFILE_IMAGE.FAILURE, message: e.message }),
      put(
        toastr.error({
          title: 'Oops!',
          message: e.message,
        })
      ),
    ]);
  }
}

function* fetchAll(action: any) {
  yield put({ type: 'FETCH_ALL' });
}

export default all([
  takeEvery(types.AUTH.REQUEST, auth),
  takeEvery(types.LOGOUT.REQUEST, logout),
  takeEvery(types.RECOVER_PASSWORD.REQUEST, recoverPassword),
  takeEvery(types.RECOVER_PASSWORD_CHANGE.REQUEST, recoverPasswordChange),
  takeEvery(types.CLEAR_NOTIFICATIONS.REQUEST, clearNotifications),
  takeEvery(types.LOGOUT.SUCCESS, redirectToAuthPage),
  takeEvery(types.AUTH.SUCCESS, fetchAll),
  takeEvery(types.UPDATE_PROFILE.REQUEST, updateProfile),
  takeEvery(types.UPLOAD_PROFILE_IMAGE.REQUEST, uploadProfileImage),
  takeEvery(types.VERIFY_RECOVER_CODE.REQUEST, verifyRecoverCode),
]);
