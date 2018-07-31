import types from './types';

const initialState = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  isAuthed: false,
  userId: null,
  checkedStorage: false,
};

const authReducer = (state = initialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.users
  ) {
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(action.payload.result))],
      byId: {
        ...state.byId,
        ...action.payload.entities.users,
      },
    };
  }

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

    case types.CHECK_STORAGE.SUCCESS: {
      return {
        ...newState,
        checkedStorage: true,
      };
    }

    default:
      return newState;
  }
};

export default authReducer;
