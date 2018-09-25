const production = process.env.NODE_ENV === 'production';

const APP_URL_PRODUCTION = 'http://46.101.211.180:3000';
const APP_URL_DEVELOPMENT = 'http://localhost:3000';

const API_URL_PRODUCTION = 'http://46.101.211.180:9001/api';
const API_URL_DEVELOPMENT = 'http://localhost:9001/api';

const STATICS_URL_PRODUCTION = 'http://46.101.211.180:9001';
const STATICS_URL_DEVELOPMENT = 'http://localhost:9001';

export const APP_URL = production ? APP_URL_PRODUCTION : APP_URL_DEVELOPMENT;
export const API_URL = production ? API_URL_PRODUCTION : API_URL_DEVELOPMENT;
export const STATICS_URL = production
  ? STATICS_URL_PRODUCTION
  : STATICS_URL_DEVELOPMENT;

export const DEFAULT_USER_IMAGE = 'user_default.png';
export const DEFAULT_USER_IMAGE_FEMALE = 'user_female.png';

export const DISPLAY_ONLY_PAST_AND_CURRENT_TIMESHEET = true;

export const API_ENDPOINT_FILE =
  'https://api.graph.cool/file/v1/cjmhdh572edi30115p6cqqfjc';
export const API_ENDPOINT =
  'https://api.graph.cool/simple/v1/cjmhdh572edi30115p6cqqfjc';
