import { put, takeEvery, all, select } from 'redux-saga/effects';

import * as toastr from '../../../services/toastr';
import groupTypes from '../../groups/store/types';
import { fetchLogs } from '../../logs/store/actions';
import { getIsAuthed } from '../../auth/store/selectors';
import { fetchUsers } from '../../users/store/actions';

function* fetchAll(action: any) {
  const isAuthed = yield select(getIsAuthed);

  if (isAuthed) {
    yield all([put(fetchLogs()), put(fetchUsers())]);
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

export default all([
  takeEvery('FETCH_ALL', fetchAll),
  takeEvery(groupTypes.UPDATE_GROUP_MEMBER.FAILURE, handleError),
]);
