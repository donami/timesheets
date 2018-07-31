import { createRequestTypes } from '../../../store/utils';

const AUTH = createRequestTypes('AUTH');
const LOGOUT = createRequestTypes('LOGOUT');

export default {
  AUTH,
  LOGOUT,
};
