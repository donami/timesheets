import types from './types';

interface ProjectReducer {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
  selected: number | null;
}

const initialState: ProjectReducer = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  selected: null,
};

const projectReducer = (state = initialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.projects
  ) {
    const ids = Object.keys(action.payload.entities.projects).map(id => +id);
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(ids))],
      byId: {
        ...state.byId,
        ...action.payload.entities.projects,
      },
    };
  }

  switch (action.type) {
    case types.FETCH_PROJECT_BY_ID_REQUEST:
    case types.FETCH_PROJECTS_REQUEST:
      return {
        ...newState,
        loading: true,
        loaded: false,
      };

    case types.FETCH_PROJECT_BY_ID_SUCCESS:
    case types.FETCH_PROJECTS_SUCCESS:
      return {
        ...newState,
        loading: false,
        loaded: true,
      };

    case types.FETCH_PROJECT_BY_ID_FAILURE:
    case types.FETCH_PROJECTS_FAILURE:
      return {
        ...newState,
        loading: false,
        loaded: false,
      };

    case types.SELECT_PROJECT_SUCCESS:
      return {
        ...newState,
        selected: action.payload.projectId,
      };

    default:
      return newState;
  }
};

export default projectReducer;
