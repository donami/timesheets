import types from './types';

export const auth = (email: string, password: string) => ({
  type: types.AUTH.REQUEST,
  payload: {
    email,
    password,
  },
});

export const checkStorage = () => ({
  type: types.CHECK_STORAGE.REQUEST,
});

export const logout = () => ({
  type: types.LOGOUT.REQUEST,
});
