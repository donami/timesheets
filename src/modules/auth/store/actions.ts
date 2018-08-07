import types from './types';

export const auth = (email: string, password: string) => ({
  type: types.AUTH.REQUEST,
  payload: {
    email,
    password,
  },
});

export const logout = () => ({
  type: types.LOGOUT.REQUEST,
});

export const clearNotifications = () => ({
  type: types.CLEAR_NOTIFICATIONS.REQUEST,
});
