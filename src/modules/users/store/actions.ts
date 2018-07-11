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
