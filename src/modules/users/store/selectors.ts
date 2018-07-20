import { createSelector } from 'reselect';

import { getGroups } from '../../groups/store/selectors';
import { getTemplateEntities } from '../../timesheets/store/selectors';

export const getUserEntities = (state: any) => state.users.byId;
const getUserIds = (state: any) => state.users.ids;
export const getSelectedUserId = (state: any) => state.users.selected;

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

export const getSelectedUserGroups = createSelector(
  getSelectedUserId,
  getGroups,
  (userId, groups) =>
    groups.filter((group: any) => group.members.indexOf(userId) > -1)
);

export const getSelectedUserGroup = createSelector(
  getSelectedUserGroups,
  groups => {
    if (groups && groups.length > 0) {
      return groups[0];
    }
    return null;
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
