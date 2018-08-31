import { createRequestTypes } from '../../../store/utils';

const AUTH = createRequestTypes('AUTH');
const LOGOUT = createRequestTypes('LOGOUT');
const CLEAR_NOTIFICATIONS = createRequestTypes('CLEAR_NOTIFICATIONS');
const UPDATE_PROFILE = createRequestTypes('UPDATE_PROFILE');
const RECOVER_PASSWORD = createRequestTypes('RECOVER_PASSWORD');
const RECOVER_PASSWORD_CHANGE = createRequestTypes('RECOVER_PASSWORD_CHANGE');
const UPLOAD_PROFILE_IMAGE = createRequestTypes('UPLOAD_PROFILE_IMAGE');
const VERIFY_RECOVER_CODE = createRequestTypes('VERIFY_RECOVER_CODE');

export default {
  AUTH,
  LOGOUT,
  CLEAR_NOTIFICATIONS,
  UPDATE_PROFILE,
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_CHANGE,
  UPLOAD_PROFILE_IMAGE,
  VERIFY_RECOVER_CODE,
};
