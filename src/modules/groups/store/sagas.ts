import { call, put, takeEvery, all } from 'redux-saga/effects';

import Api from '../../../services/api';
import types from './types';
import * as toastr from '../../../services/toastr';

function* fetchGroups(action: any) {
  const { payload } = action;

  yield put({ type: types.FETCH_GROUPS_REQUEST });

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
      action.payload.groupIds,
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

export default all([
  takeEvery(types.SELECT_GROUP, selectGroupFunction),
  takeEvery(types.FETCH_GROUPS, fetchGroups),
  takeEvery(types.FETCH_GROUP_BY_ID, fetchGroupById),
  takeEvery(types.UPDATE_GROUP.REQUEST, updateGroup),
  takeEvery(types.UPDATE_GROUP_MEMBER.REQUEST, updateGroupMember),
]);
