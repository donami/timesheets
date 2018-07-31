import types from './types';

const initialState = {
  language: 'en',
  initialized: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.SELECT_LANGUAGE: {
      return {
        ...state,
        language: action.payload.language,
      };
    }

    case 'ON_INIT':
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};
