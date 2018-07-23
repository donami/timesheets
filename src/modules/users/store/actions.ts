import types from './types';
import { User } from './models';

export const fetchUsers = () => ({
  type: types.FETCH_USERS,
});

export const selectUser = (userId: number) => ({
  type: types.SELECT_USER,
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
