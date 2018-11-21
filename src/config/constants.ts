const production = process.env.NODE_ENV === 'production';

const APP_URL_PRODUCTION = 'http://46.101.211.180:3000';
const APP_URL_DEVELOPMENT = 'http://localhost:3000';

export const APP_URL = production ? APP_URL_PRODUCTION : APP_URL_DEVELOPMENT;

export const DEFAULT_USER_IMAGE = 'user_default.png';
export const DEFAULT_USER_IMAGE_FEMALE = 'user_female.png';

export const DISPLAY_ONLY_PAST_AND_CURRENT_TIMESHEET = true;

const API_URL_DEVELOPMENT =
  'https://api.graph.cool/simple/v1/cjmhdh572edi30115p6cqqfjc';
const API_ENDPOINT_FILE_DEVELOPMENT =
  'https://api.graph.cool/file/v1/cjmhdh572edi30115p6cqqfjc';
const API_URL_PRODUCTION =
  'https://api.graph.cool/simple/v1/cjoraqm298jlo0150g40zq9mo';
const API_ENDPOINT_FILE_PRODUCTION =
  'https://api.graph.cool/file/v1/cjoraqm298jlo0150g40zq9mo';

export const API_ENDPOINT_FILE = production
  ? API_ENDPOINT_FILE_PRODUCTION
  : API_ENDPOINT_FILE_DEVELOPMENT;
export const API_ENDPOINT = production
  ? API_URL_PRODUCTION
  : API_URL_DEVELOPMENT;
