import types from './types';

interface ExpenseReportReducer {
  ids: number[];
  byId: any;
  loaded: boolean;
  loading: boolean;
  selected: number | null;
}

const initialState: ExpenseReportReducer = {
  ids: [],
  byId: {},
  loaded: false,
  loading: false,
  selected: null,
};

const expenseReducer = (state = initialState, action: any) => {
  let newState = state;

  if (
    action.payload &&
    action.payload.result &&
    action.payload.entities &&
    action.payload.entities.expenses
  ) {
    const ids = Object.keys(action.payload.entities.expenses).map(id => +id);
    newState = {
      ...state,
      ids: [...new Set([...state.ids].concat(ids))],
      byId: {
        ...state.byId,
        ...action.payload.entities.expenses,
      },
    };
  }

  switch (action.type) {
    case types.FETCH_EXPENSE_BY_ID_REQUEST:
    case types.FETCH_EXPENSES_REQUEST:
      return {
        ...newState,
        loading: true,
        loaded: false,
      };

    case types.FETCH_EXPENSE_BY_ID_SUCCESS:
    case types.FETCH_EXPENSES_SUCCESS:
      return {
        ...newState,
        loading: false,
        loaded: true,
      };

    case types.FETCH_EXPENSE_BY_ID_FAILURE:
    case types.FETCH_EXPENSES_FAILURE:
      return {
        ...newState,
        loading: false,
        loaded: false,
      };

    case types.SELECT_EXPENSE_SUCCESS:
      return {
        ...newState,
        selected: action.payload.expenseReportId,
      };

    default:
      return newState;
  }
};

export default expenseReducer;
