import { put, takeEvery, all, select, call } from 'redux-saga/effects';

import * as toastr from '../../../services/toastr';
import groupTypes from '../../groups/store/types';
import Api from '../../../services/api';
import { fetchLogs } from '../../logs/store/actions';
import { getIsAuthed } from '../../auth/store/selectors';
import { fetchUsers } from '../../users/store/actions';
import types from './types';
import { push } from 'connected-react-router';
import { fetchProjects } from '../../projects/store/actions';

function* fetchAll(action: any) {
  const isAuthed = yield select(getIsAuthed);

  if (isAuthed) {
    yield all([put(fetchLogs()), put(fetchUsers()), put(fetchProjects())]);
  }
}

function* handleError(action: any) {
  yield put(
    toastr.error({
      title: 'Something went wrong!',
      message: action.message,
    })
  );
}

function* setup(action: any) {
  try {
    const response = yield call(Api.setup, action.payload);

    yield all([
      put({
        payload: { ...response },
        type: types.SETUP.SUCCESS,
      }),
      put(push('/setup-wizard/step/complete')),
    ]);
  } catch (e) {
    yield put({
      type: types.SETUP.FAILURE,
      message: e.message,
    });
  }
}

function* isConfigured(action: any) {
  try {
    const response = yield call(Api.isConfigured, action.payload);

    yield put({
      payload: { ...response },
      type: types.CHECK_CONFIGURATION.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.CHECK_CONFIGURATION.FAILURE,
      message: e.message,
    });
  }
}

function* search(action: any) {
  try {
    yield all([
      yield put({
        payload: action.payload,
        type: types.SEARCH.SUCCESS,
      }),
      put(push('/search')),
    ]);
  } catch (e) {
    yield put({
      type: types.SEARCH.FAILURE,
      message: e.message,
    });
  }
}

export default all([
  takeEvery('FETCH_ALL', fetchAll),
  takeEvery(groupTypes.UPDATE_GROUP_MEMBER.FAILURE, handleError),
  takeEvery(types.SETUP.REQUEST, setup),
  takeEvery(types.SEARCH.REQUEST, search),
  takeEvery(types.CHECK_CONFIGURATION.REQUEST, isConfigured),
]);
