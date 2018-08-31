const production = process.env.NODE_ENV === 'production';

// TODO: remove
console.log(process.env.NODE_ENV);

const API_URL_PRODUCTION = 'http://46.101.211.180:9001/api';
const API_URL_DEVELOPMENT = 'http://localhost:9001/api';

export const API_URL = production ? API_URL_PRODUCTION : API_URL_DEVELOPMENT;
export const STATICS_URL = 'http://localhost:9001';

export const DEFAULT_USER_IMAGE = 'user_default.png';
export const DEFAULT_USER_IMAGE_FEMALE = 'user_female.png';

export const DISPLAY_ONLY_PAST_AND_CURRENT_TIMESHEET = true;
