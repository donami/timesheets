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

export const updateGroupMember = (groupId: number, userId: number) => ({
  type: types.UPDATE_GROUP_MEMBER.REQUEST,
  payload: {
    groupId,
    userId,
  },
});

export const removeGroup = (groupId: number) => ({
  type: types.REMOVE_GROUP.REQUEST,
  payload: {
    groupId,
  },
});

export const createGroup = (
  group: Partial<Group>,
  userId: number,
  projectId: number
) => ({
  type: types.CREATE_GROUP.REQUEST,
  payload: {
    group,
    userId,
    projectId,
  },
});

export const loadGroupListPage = (options: any = {}) => ({
  type: types.LOAD_GROUP_LIST_PAGE.REQUEST,
  payload: options,
});

export const loadGroupAddPage = () => ({
  type: types.LOAD_GROUP_ADD_PAGE.REQUEST,
});
