import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import common from '../modules/common/store';
import timesheets from '../modules/timesheets/store';
import expenses from '../modules/expenses/store';
import auth from '../modules/auth/store';
import users from '../modules/users/store';
import projects from '../modules/projects/store';
import groups from '../modules/groups/store';

export default combineReducers({
  common,
  timesheets,
  expenses,
  auth,
  users,
  projects,
  groups,
  toastr: toastrReducer,
});
