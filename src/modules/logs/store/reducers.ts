import types from './types';

interface LogReducer {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
}

const initialState: LogReducer = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
};

const logReducer = (state = initialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.logs
  ) {
    const ids = Object.keys(action.payload.entities.logs).map(id => +id);
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(ids))],
      byId: {
        ...state.byId,
        ...action.payload.entities.logs,
      },
    };
  }

  switch (action.type) {
    case types.FETCH_LOGS.REQUEST:
      return {
        ...newState,
        loading: true,
        loaded: false,
      };

    case types.FETCH_LOGS.SUCCESS:
      return {
        ...newState,
        loading: false,
        loaded: true,
      };

    case types.FETCH_LOGS.FAILURE:
      return {
        ...newState,
        loading: false,
        loaded: false,
      };

    default:
      return newState;
  }
};

export default logReducer;
