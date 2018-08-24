import { createRequestTypes } from '../../../store/utils';

const AUTH = createRequestTypes('AUTH');
const LOGOUT = createRequestTypes('LOGOUT');
const CLEAR_NOTIFICATIONS = createRequestTypes('CLEAR_NOTIFICATIONS');
const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE');
const RECOVER_PASSWORD = createRequestTypes('RECOVER_PASSWORD');

export default {
  AUTH,
  LOGOUT,
  CLEAR_NOTIFICATIONS,
  UPDATE_PROFILE,
  RECOVER_PASSWORD,
};
