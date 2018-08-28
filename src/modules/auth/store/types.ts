import { createRequestTypes } from '../../../store/utils';

const AUTH = createRequestTypes('AUTH');
const LOGOUT = createRequestTypes('LOGOUT');
const CLEAR_NOTIFICATIONS = createRequestTypes('CLEAR_NOTIFICATIONS');
const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE');
const RECOVER_PASSWORD = createRequestTypes('RECOVER_PASSWORD');
const UPLOAD_PROFILE_IMAGE = createRequestTypes('UPLOAD_PROFILE_IMAGE');

export default {
  AUTH,
  LOGOUT,
  CLEAR_NOTIFICATIONS,
  UPDATE_PROFILE,
  RECOVER_PASSWORD,
  UPLOAD_PROFILE_IMAGE,
};
