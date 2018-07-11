import { createSelector } from 'reselect';

export const getGroupEntities = (state: any) => state.groups.byId;
const getGroupIds = (state: any) => state.groups.ids;
const getSelectedId = (state: any) => state.groups.selected;

export const getGroups = createSelector(
  getGroupEntities,
  getGroupIds,
  (entities, ids) => ids.map((id: number | string) => entities[id])
);

export const getSelectedGroup = createSelector(
  getGroupEntities,
  getSelectedId,
  (entities, id) => {
    return entities[id];
  }
);

// export const getSelectedGroupMembers = createSelector(
//   getSelectedGroup,
//   getUserEntities,
//   (group, users) => {
//     if (!group || !users) {
//       return [];
//     }

//     return group.members.map((userId: number) => {
//       return users[userId as number];
//     });
//   }
// );
