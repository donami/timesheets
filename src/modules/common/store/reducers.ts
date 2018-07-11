import types from './types';

const initialState = {
  language: 'en',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.SELECT_LANGUAGE: {
      return {
        ...initialState,
        language: action.payload.language,
      };
    }

    default:
      return state;
  }
};
