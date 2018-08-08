import { fetchApi, NormalizedResponse } from '../../services/api';
import { logSchema } from '../../utils/schemas';

export const fetchLogs = (): Promise<NormalizedResponse> => {
  return fetchApi('logs', 'GET', [logSchema]);
};
