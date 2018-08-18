import types from './types';
import { User } from './models';

export const fetchUsers = () => ({
  type: types.FETCH_USERS.REQUEST,
});

export const fetchUsersIfNeeded = () => ({
  type: types.FETCH_USERS_IF_NEEDED,
});

export const selectUser = (userId: number) => ({
  type: types.SELECT_USER,
  payload: {
    userId,
  },
});

export const disableUser = (userId: number) => ({
  type: types.DISABLE_USER.REQUEST,
  payload: {
    userId,
  },
});

export const enableUser = (userId: number) => ({
  type: types.ENABLE_USER.REQUEST,
  payload: {
    userId,
  },
});

export const fetchUserById = (userId: number) => ({
  type: types.FETCH_USER_BY_ID,
  payload: {
    userId,
  },
});

export const updateUser = (userId: number, user: User) => ({
  type: types.UPDATE_USER.REQUEST,
  payload: {
    userId,
    user,
  },
});

export const createUser = (user: Partial<User> & { projects: number[] }) => ({
  type: types.CREATE_USER.REQUEST,
  payload: {
    user,
  },
});

export const loadUserPage = () => ({ type: types.LOAD_USER_PAGE });
