import types from './types';
import { combineReducers } from 'redux';

interface TimesheetReducer {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
  selected: number | null;
}

const initialState: TimesheetReducer = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  selected: null,
};

const timesheetsReducer = (state = initialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.timesheets
  ) {
    const ids = Object.keys(action.payload.entities.timesheets).map(id => +id);
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(ids))],
      byId: {
        ...state.byId,
        ...action.payload.entities.timesheets,
      },
    };
  }

  switch (action.type) {
    case types.FETCH_TIMESHEET_BY_ID_REQUEST:
    case types.FETCH_TIMESHEETS_REQUEST:
      return {
        ...newState,
        loading: true,
        loaded: false,
      };

    case types.FETCH_TIMESHEET_BY_ID_SUCCESS:
    case types.FETCH_TIMESHEETS_SUCCESS:
      return {
        ...newState,
        loading: false,
        loaded: true,
      };

    case types.FETCH_TIMESHEET_BY_ID_FAILURE:
    case types.FETCH_TIMESHEETS_FAILURE:
      return {
        ...newState,
        loading: false,
        loaded: false,
      };

    case types.SELECT_TIMESHEET_SUCCESS:
      return {
        ...newState,
        selected: action.payload.timesheetId,
      };

    default:
      return newState;
  }
};

interface TemplateState {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
  selected: number | null;
}

const templateInitialState: TemplateState = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  selected: null,
};

const timesheetTemplatesReducer = (
  state = templateInitialState,
  action: any
) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.timesheetTemplates
  ) {
    const ids = Object.keys(action.payload.entities.timesheetTemplates).map(
      id => +id
    );
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(ids))],
      byId: {
        ...state.byId,
        ...action.payload.entities.timesheetTemplates,
      },
    };
  }

  switch (action.type) {
    case types.FETCH_TIMESHEETS_REQUEST:
      return {
        ...newState,
        loading: true,
        loaded: false,
      };

    case types.FETCH_TIMESHEETS_SUCCESS:
      return {
        ...newState,
        loading: false,
        loaded: true,
      };

    case types.FETCH_TIMESHEETS_FAILURE:
      return {
        ...newState,
        loading: false,
        loaded: false,
      };

    case types.SELECT_TEMPLATE.SUCCESS:
      return {
        ...newState,
        selected: action.payload.templateId,
      };

    default:
      return newState;
  }
};

export interface GeneratorState {
  generated: {
    projectId: number;
    userId: number;
    timesheets: any[];
  } | null;
}

const generatorInitialState: GeneratorState = {
  generated: null,
};

const generatorReducer = (state = generatorInitialState, action: any) => {
  switch (action.type) {
    case types.TIMESHEETS_GENERATE.REQUEST:
      return {
        ...state,
      };

    case types.TIMESHEETS_GENERATE.SUCCESS:
      return {
        ...state,
        generated: {
          timesheets: action.payload.timesheets,
          projectId: action.payload.projectId,
          userId: action.payload.userId,
        },
      };

    default:
      return state;
  }
};

export default combineReducers({
  templates: timesheetTemplatesReducer,
  timesheets: timesheetsReducer,
  generator: generatorReducer,
});
