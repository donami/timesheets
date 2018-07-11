import { createRequestTypes } from '../../../store/utils';

const AUTH = createRequestTypes('AUTH');
const LOGOUT = createRequestTypes('LOGOUT');
const CHECK_STORAGE = createRequestTypes('CHECK_STORAGE');

export default {
  AUTH,
  LOGOUT,
  CHECK_STORAGE,
};
