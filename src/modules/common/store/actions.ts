import types from './types';

export const selectLanguage = (language: string) => ({
  type: types.SELECT_LANGUAGE,
  payload: {
    language,
  },
});

export const setup = (data: any) => ({
  type: types.SETUP.REQUEST,
  payload: data,
});

export const checkConfiguration = () => ({
  type: types.CHECK_CONFIGURATION.REQUEST,
});

export const search = (query: string) => ({
  type: types.SEARCH.REQUEST,
  payload: {
    query,
  },
});
