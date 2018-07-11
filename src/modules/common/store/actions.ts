import types from './types';

export const selectLanguage = (language: string) => ({
  type: types.SELECT_LANGUAGE,
  payload: {
    language,
  },
});
