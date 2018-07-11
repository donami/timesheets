import types from './types';

interface GroupReducer {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
  selected: number | null;
}

const initialState: GroupReducer = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  selected: null,
};

const groupReducer = (state = initialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.groups
  ) {
    const ids = Object.keys(action.payload.entities.groups).map(id => +id);
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(ids))],
      byId: {
        ...state.byId,
        ...action.payload.entities.groups,
      },
    };
  }

  switch (action.type) {
    case types.FETCH_GROUP_BY_ID_REQUEST:
    case types.FETCH_GROUPS_REQUEST:
      return {
        ...newState,
        loading: true,
        loaded: false,
      };

    case types.FETCH_GROUP_BY_ID_SUCCESS:
    case types.FETCH_GROUPS_SUCCESS:
      return {
        ...newState,
        loading: false,
        loaded: true,
      };

    case types.FETCH_GROUP_BY_ID_FAILURE:
    case types.FETCH_GROUPS_FAILURE:
      return {
        ...newState,
        loading: false,
        loaded: false,
      };

    case types.SELECT_GROUP_SUCCESS:
      return {
        ...newState,
        selected: action.payload.groupId,
      };

    default:
      return newState;
  }
};

export default groupReducer;
