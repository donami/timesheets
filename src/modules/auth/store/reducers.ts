import types from './types';

const initialState = {
  loaded: false,
  loading: false,
  isAuthed: false,
  userId: null,
};

const authReducer = (state = initialState, action: any) => {
  const newState = state;

  switch (action.type) {
    case types.AUTH.SUCCESS: {
      return {
        ...newState,
        isAuthed: true,
        userId: action.payload.result,
      };
    }

    case types.AUTH.FAILURE: {
      localStorage.removeItem('token');

      return {
        ...newState,
        isAuthed: false,
        userId: null,
        loaded: false,
      };
    }

    case types.LOGOUT.SUCCESS: {
      return {
        ...initialState,
      };
    }

    default:
      return newState;
  }
};

export default authReducer;
