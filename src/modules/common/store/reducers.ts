import types from './types';

const initialState = {
  language: 'en',
  initialized: false,
  checkedConfiguration: false,
  isConfigured: undefined,
  search: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.SELECT_LANGUAGE: {
      return {
        ...state,
        language: action.payload.language,
      };
    }

    case types.CHECK_CONFIGURATION.SUCCESS: {
      return {
        ...state,
        checkedConfiguration: true,
        isConfigured: action.payload.configured,
      };
    }

    case types.CHECK_CONFIGURATION.FAILURE: {
      return {
        ...state,
        checkedConfiguration: false,
        isConfigured: undefined,
      };
    }

    case types.SEARCH.SUCCESS: {
      return {
        ...state,
        search: action.payload.query,
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
