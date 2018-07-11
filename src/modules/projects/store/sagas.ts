import { call, put, takeEvery, all } from 'redux-saga/effects';

import Api from '../../../services/api';
import types from './types';

function* fetchProjects(action: any) {
  yield put({ type: types.FETCH_PROJECTS_REQUEST });

  try {
    const response = yield call(Api.fetchProjects);
    yield put({
      payload: { ...response },
      type: types.FETCH_PROJECTS_SUCCESS,
    });
  } catch (e) {
    yield put({ type: types.FETCH_PROJECTS_FAILURE, message: e.message });
  }
}

function* fetchProjectById(action: any) {
  yield put({
    type: types.FETCH_PROJECT_BY_ID_REQUEST,
    payload: {
      projectId: action.payload.projectId,
    },
  });

  try {
    const response = yield call(Api.fetchProjectById, action.payload.projectId);

    yield put({
      payload: { ...response },
      type: types.FETCH_PROJECT_BY_ID_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_PROJECT_BY_ID_FAILURE,
      message: e.message,
    });
  }
}

function* selectProjectFunction(action: any) {
  yield put({
    type: types.FETCH_PROJECT_BY_ID,
    payload: {
      projectId: action.payload.projectId,
    },
  });

  try {
    yield put({
      type: types.SELECT_PROJECT_SUCCESS,
      payload: {
        projectId: action.payload.projectId,
      },
    });
  } catch (e) {
    yield put({
      type: types.SELECT_PROJECT_FAILURE,
      message: e.message,
    });
  }
}

function* updateProject(action: any) {
  try {
    const response = yield call(
      Api.updateProject,
      action.payload.projectId,
      action.payload.project
    );

    yield put({
      payload: { ...response },
      type: types.UPDATE_PROJECT.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.UPDATE_PROJECT.FAILURE,
      message: e.message,
    });
  }
}

export default all([
  takeEvery(types.SELECT_PROJECT, selectProjectFunction),
  takeEvery(types.FETCH_PROJECTS, fetchProjects),
  takeEvery(types.FETCH_PROJECT_BY_ID, fetchProjectById),
  takeEvery(types.UPDATE_PROJECT.REQUEST, updateProject),
]);
