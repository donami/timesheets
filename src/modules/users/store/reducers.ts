import mergeWith from 'lodash/mergeWith';

import types from './types';

interface UserReducer {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
  selected: number | null;
}

const initialState: UserReducer = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  selected: null,
};

const userReducer = (state = initialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.users
  ) {
    const ids = Object.keys(action.payload.entities.users).map(id => +id);
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(ids))],
      byId: mergeWith(
        state.byId,
        action.payload.entities.users,
        (objValue, srcValue) => {
          if (!objValue) {
            return srcValue;
          }

          if (srcValue.timesheets === null && objValue.timesheets !== null) {
            return objValue;
          }
          return srcValue;
        }
      ),
    };
  }

  switch (action.type) {
    case types.FETCH_USER_BY_ID_REQUEST:
    case types.FETCH_USERS.REQUEST:
      return {
        ...newState,
        loading: true,
        loaded: false,
      };

    case types.FETCH_USER_BY_ID_SUCCESS:
    case types.FETCH_USERS.SUCCESS:
      return {
        ...newState,
        loading: false,
        loaded: true,
      };

    case types.FETCH_USER_BY_ID_FAILURE:
    case types.FETCH_USERS.FAILURE:
      return {
        ...newState,
        loading: false,
        loaded: false,
      };

    case types.SELECT_USER_SUCCESS:
      return {
        ...newState,
        selected: action.payload.userId,
      };

    default:
      return newState;
  }
};

export default userReducer;
