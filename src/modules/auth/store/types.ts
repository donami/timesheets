import { createRequestTypes } from '../../../store/utils';

const AUTH = createRequestTypes('AUTH');
const LOGOUT = createRequestTypes('LOGOUT');
const CLEAR_NOTIFICATIONS = createRequestTypes('CLEAR_NOTIFICATIONS');

export default {
  AUTH,
  LOGOUT,
  CLEAR_NOTIFICATIONS,
};
