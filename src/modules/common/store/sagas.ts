import { put, takeEvery, all } from 'redux-saga/effects';

import * as toastr from '../../../services/toastr';
import groupTypes from '../../groups/store/types';

function* handleError(action: any) {
  yield put(
    toastr.error({
      title: 'Something went wrong!',
      message: action.message,
    })
  );
}

export default all([
  takeEvery(groupTypes.UPDATE_GROUP_MEMBER.FAILURE, handleError),
]);
