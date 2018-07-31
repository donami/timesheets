import { createSelector } from 'reselect';

const getDataState = (state: any) => state.groups.data;
const getPagesState = (state: any) => state.groups.pages;

export const getGroupEntities = createSelector(
  getDataState,
  state => state.byId
);
export const getGroupIds = createSelector(getDataState, state => state.ids);
export const getSelectedId = createSelector(
  getDataState,
  state => state.selected
);
export const getTotalCount = createSelector(
  getDataState,
  state => state.totalCount
);

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

export const getGroupListPageState = createSelector(
  getPagesState,
  state => state.groupListPage
);

export const getGroupListPageStateFetched = createSelector(
  getGroupListPageState,
  state => state.fetched
);

export const getGroupAddPageState = createSelector(
  getPagesState,
  state => state.groupAddPage
);

export const getGroupAddPageStateFetched = createSelector(
  getGroupAddPageState,
  state => state.fetched
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
