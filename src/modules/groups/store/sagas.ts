import { call, put, takeEvery, all, select } from 'redux-saga/effects';

import * as Api from '../api';
import types from './types';
import * as toastr from '../../../services/toastr';
import { push } from 'connected-react-router';
import {
  getGroupAddPageStateFetched,
  getGroupListPageState,
  getGroupIds,
  getTotalCount,
} from './selectors';
import { fetchProjects } from '../../projects/store/sagas';

function* fetchGroups(action: any) {
  const { payload } = action;

  yield put({ payload, type: types.FETCH_GROUPS_REQUEST });

  try {
    const options = (payload && payload.options) || {};

    const response = yield call(Api.fetchGroups, options);

    yield put({
      payload: { ...response },
      type: types.FETCH_GROUPS_SUCCESS,
    });
  } catch (e) {
    yield put({ type: types.FETCH_GROUPS_FAILURE, message: e.message });
  }
}

function* fetchGroupById(action: any) {
  yield put({
    type: types.FETCH_GROUP_BY_ID_REQUEST,
    payload: {
      groupId: action.payload.groupId,
    },
  });

  try {
    const response = yield call(Api.fetchGroupById, action.payload.groupId);

    yield put({
      payload: { ...response },
      type: types.FETCH_GROUP_BY_ID_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_GROUP_BY_ID_FAILURE,
      message: e.message,
    });
  }
}

function* selectGroupFunction(action: any) {
  yield put({
    type: types.FETCH_GROUP_BY_ID,
    payload: {
      groupId: action.payload.groupId,
    },
  });

  try {
    yield put({
      type: types.SELECT_GROUP_SUCCESS,
      payload: {
        groupId: action.payload.groupId,
      },
    });
  } catch (e) {
    yield put({
      type: types.SELECT_GROUP_FAILURE,
      message: e.message,
    });
  }
}

function* updateGroup(action: any) {
  try {
    const response = yield call(
      Api.updateGroup,
      action.payload.groupId,
      action.payload.group
    );

    yield put({
      payload: { ...response },
      type: types.UPDATE_GROUP.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.UPDATE_GROUP.FAILURE,
      message: e.message,
    });
  }
}

function* updateGroupMember(action: any) {
  try {
    const response = yield call(
      Api.updateGroupMember,
      action.payload.groupId,
      action.payload.userId
    );

    yield put(
      toastr.success({
        title: 'User updated!',
        message: 'User was successfully updated!',
      })
    );

    yield put({
      payload: { ...response },
      type: types.UPDATE_GROUP_MEMBER.SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.UPDATE_GROUP_MEMBER.FAILURE,
      error: true,
      message: e.message,
    });
  }
}

function* createGroup(action: any) {
  try {
    const response = yield call(
      Api.createGroup,
      action.payload.group,
      action.payload.userId
    );

    yield put({
      payload: { ...response },
      type: types.CREATE_GROUP.SUCCESS,
    });

    yield put(
      toastr.success({
        title: 'Group was created!',
        message: 'Group was successfully created!',
      })
    );

    yield put(push('/groups'));
  } catch (e) {
    yield put({
      type: types.CREATE_GROUP.FAILURE,
      message: e.message,
    });
  }
}

function* removeGroup(action: any) {
  try {
    const response = yield call(Api.removeGroup, action.payload.groupId);

    yield put({
      payload: { ...response },
      type: types.REMOVE_GROUP.SUCCESS,
    });

    yield put(
      toastr.success({
        title: 'Group was removed!',
        message: 'Group was successfully removed!',
      })
    );

    yield put(push('/groups'));
  } catch (e) {
    yield put({
      type: types.REMOVE_GROUP.FAILURE,
      message: e.message,
    });
  }
}

function* loadGroupListPage(action: any) {
  const groupListPageState = yield select(getGroupListPageState);
  const loadedIds = yield select(getGroupIds);
  const totalCount = yield select(getTotalCount);

  const payload = {
    ...action.payload,
    options: {
      skip: action.payload.skip,
      take: action.payload.take,
      except: action.payload.except || loadedIds,
    },
  };

  if (totalCount > loadedIds.length || !groupListPageState.fetched) {
    yield call(fetchGroups, {
      ...action,
      payload,
    });
  }

  yield put({
    payload,
    type: types.LOAD_GROUP_LIST_PAGE.SUCCESS,
  });
}

function* loadGroupAddPage(action: any) {
  const alreadyFetched = yield select(getGroupAddPageStateFetched);

  if (!alreadyFetched) {
    yield call(fetchProjects, action);
  }
  yield put({
    type: types.LOAD_GROUP_ADD_PAGE.SUCCESS,
  });
}

export default all([
  takeEvery(types.SELECT_GROUP, selectGroupFunction),
  takeEvery(types.FETCH_GROUPS, fetchGroups),
  takeEvery(types.FETCH_GROUP_BY_ID, fetchGroupById),
  takeEvery(types.UPDATE_GROUP.REQUEST, updateGroup),
  takeEvery(types.UPDATE_GROUP_MEMBER.REQUEST, updateGroupMember),
  takeEvery(types.CREATE_GROUP.REQUEST, createGroup),
  takeEvery(types.REMOVE_GROUP.REQUEST, removeGroup),
  takeEvery(types.LOAD_GROUP_LIST_PAGE.REQUEST, loadGroupListPage),
  takeEvery(types.LOAD_GROUP_ADD_PAGE.REQUEST, loadGroupAddPage),
]);
