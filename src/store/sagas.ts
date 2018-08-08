import { all } from 'redux-saga/effects';

import { timesheetSagas } from '../modules/timesheets/store';
import { expenseSagas } from '../modules/expenses/store';
import { authSagas } from '../modules/auth/store';
import { userSagas } from '../modules/users/store';
import { projectSagas } from '../modules/projects/store';
import { groupSagas } from '../modules/groups/store';
import { commonSagas } from '../modules/common/store';
import { helpSagas } from '../modules/help/store';
import { logSagas } from '../modules/logs/store';

export default function* rootSaga() {
  yield all([
    timesheetSagas,
    expenseSagas,
    authSagas,
    userSagas,
    projectSagas,
    groupSagas,
    helpSagas,
    logSagas,
    commonSagas,
  ]);
}
