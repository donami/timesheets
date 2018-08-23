import { createRequestTypes } from '../../../store/utils';

const SELECT_LANGUAGE = 'SELECT_LANGUAGE';
const SETUP = createRequestTypes('SETUP');
const CHECK_CONFIGURATION = createRequestTypes('CHECK_CONFIGURATION');
const SEARCH = createRequestTypes('SEARCH');

export default {
  SELECT_LANGUAGE,
  SETUP,
  CHECK_CONFIGURATION,
  SEARCH,
};
