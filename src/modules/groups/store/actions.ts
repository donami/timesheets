import types from './types';
import { Group } from './models';

export const fetchGroups = (options: any = {}) => ({
  type: types.FETCH_GROUPS,
  payload: {
    options,
  },
});

export const selectGroup = (groupId: number) => ({
  type: types.SELECT_GROUP,
  payload: {
    groupId,
  },
});

export const fetchGroupById = (groupId: number) => ({
  type: types.FETCH_GROUP_BY_ID,
  payload: {
    groupId,
  },
});

export const updateGroup = (groupId: number, group: Group) => ({
  type: types.UPDATE_GROUP.REQUEST,
  payload: {
    groupId,
    group,
  },
});

export const updateGroupMember = (groupIds: number[], userId: number) => ({
  type: types.UPDATE_GROUP_MEMBER.REQUEST,
  payload: {
    groupIds,
    userId,
  },
});
