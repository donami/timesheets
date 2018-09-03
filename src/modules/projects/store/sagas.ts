import { call, put, takeEvery, all, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Api from '../../../services/api';
import types from './types';
import * as toastr from '../../../services/toastr';
import { getProjectsLoaded, getProjectsLoading } from './selectors';

export function* fetchProjects(action: any) {
  const loaded = yield select(getProjectsLoaded);
  const loading = yield select(getProjectsLoading);

  if (loaded || loading) {
    return;
  }

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
  // yield put({
  //   type: types.FETCH_PROJECT_BY_ID,
  //   payload: {
  //     projectId: action.payload.projectId,
  //   },
  // });

  yield call(fetchProjectById, action);

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

    yield all([
      put(
        toastr.success({
          title: 'Project was updated!',
          message: 'Project was successfully updated.',
        })
      ),
      put({
        payload: { ...response },
        type: types.UPDATE_PROJECT.SUCCESS,
      }),
      put(push('/projects')),
    ]);
  } catch (e) {
    yield put({
      type: types.UPDATE_PROJECT.FAILURE,
      message: e.message,
    });
  }
}

function* createProject(action: any) {
  try {
    const response = yield call(
      Api.createProject,
      action.payload.project,
      action.payload.userId
    );

    yield all([
      put({
        payload: { ...response },
        type: types.CREATE_PROJECT.SUCCESS,
      }),
      put(
        toastr.success({
          title: 'Project was created!',
          message: 'Project was successfully created.',
        })
      ),
      put(push('/projects')),
    ]);
  } catch (e) {
    yield put({
      type: types.CREATE_PROJECT.FAILURE,
      message: e.message,
    });
  }
}

function* removeProject(action: any) {
  try {
    const response = yield call(Api.removeProject, action.payload.projectId);

    yield all([
      put(
        toastr.success({
          title: 'Project was removed!',
          message: 'Project was successfully removed.',
        })
      ),
      put({
        payload: { ...response },
        type: types.REMOVE_PROJECT.SUCCESS,
      }),
    ]);
  } catch (e) {
    yield put({
      type: types.REMOVE_PROJECT.FAILURE,
      message: e.message,
    });
  }
}

export default all([
  takeEvery(types.SELECT_PROJECT, selectProjectFunction),
  takeEvery(types.FETCH_PROJECTS, fetchProjects),
  takeEvery(types.FETCH_PROJECT_BY_ID, fetchProjectById),
  takeEvery(types.UPDATE_PROJECT.REQUEST, updateProject),
  takeEvery(types.CREATE_PROJECT.REQUEST, createProject),
  takeEvery(types.REMOVE_PROJECT.REQUEST, removeProject),
]);
