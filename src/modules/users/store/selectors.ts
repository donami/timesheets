import { createSelector } from 'reselect';

import { getGroupEntities } from '../../groups/store/selectors';
import { getTemplateEntities } from '../../timesheets/store/selectors';

export const getUserEntities = (state: any) => state.users.byId;
const getUserIds = (state: any) => state.users.ids;
export const getSelectedUserId = (state: any) => state.users.selected;

export const getUsersLoaded = (state: any) => state.users.loaded;
export const getUsersLoading = (state: any) => state.users.loading;

export const getUsers = createSelector(
  getUserEntities,
  getUserIds,
  (entities, ids) => ids.map((id: number | string) => entities[id])
);

export const getSelectedUser = createSelector(
  getUserEntities,
  getSelectedUserId,
  (entities, id) => entities[id]
);

export const getSelectedUserGroup = createSelector(
  getSelectedUser,
  getGroupEntities,
  (user, groups) => {
    if (!user || !groups || !user.group) {
      return null;
    }
    return groups[user.group];
  }
);

export const getSelectedUserGroupTemplate = createSelector(
  getSelectedUserGroup,
  getTemplateEntities,
  (group, templates) => {
    if (!group || !templates || !group.timesheetTemplate) {
      return null;
    }

    return templates[group.timesheetTemplate];
  }
);
