import types from './types';
import { combineReducers } from 'redux';

interface GroupReducer {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
  selected: number | null;
  totalCount: number;
}

const initialState: GroupReducer = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  selected: null,
  totalCount: 0,
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
        totalCount: action.payload.totalCount || newState.totalCount,
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

    case types.REMOVE_GROUP.SUCCESS:
      const index = state.ids.indexOf(action.payload.id);

      return {
        ...newState,
        ids: [...state.ids.slice(0, index), ...state.ids.slice(index + 1)],
      };

    case types.CREATE_GROUP.SUCCESS:
      return {
        ...newState,
        totalCount: newState.totalCount + 1,
      };

    default:
      return newState;
  }
};

const groupPageAddInitialState = {
  fetched: false,
};

const groupAddPageReducer = (state = groupPageAddInitialState, action: any) => {
  switch (action.type) {
    case types.LOAD_GROUP_ADD_PAGE.SUCCESS:
      return {
        ...state,
        fetched: true,
      };

    default:
      return state;
  }
};

const groupListPageInitialState = {
  fetched: false,
  skip: 0,
  take: 1,
};

const groupListPageReducer = (
  state = groupListPageInitialState,
  action: any
) => {
  switch (action.type) {
    case types.LOAD_GROUP_LIST_PAGE.SUCCESS:
      return {
        ...state,
        fetched: true,
        skip: action.payload.skip || state.skip,
      };

    default:
      return state;
  }
};

const groupViewPageInitialState = {};

const groupViewPageReducer = (
  state = groupViewPageInitialState,
  action: any
) => {
  return state;
};

export default combineReducers({
  data: groupReducer,
  pages: combineReducers({
    groupListPage: groupListPageReducer,
    groupAddPage: groupAddPageReducer,
    groupViewPage: groupViewPageReducer,
  }),
});
