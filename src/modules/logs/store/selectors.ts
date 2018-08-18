import { createSelector } from 'reselect';

export const getLogEntities = (state: any) => state.logs.byId;
const getLogIds = (state: any) => state.logs.ids;

export const getLogsLoading = (state: any) => state.logs.loading;

export const getLogs = createSelector(
  getLogEntities,
  getLogIds,
  (entities, ids) => ids.map((id: number | string) => entities[id])
);
