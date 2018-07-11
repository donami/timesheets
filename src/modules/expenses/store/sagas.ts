import { call, put, takeEvery, all } from 'redux-saga/effects';

import Api from '../../../services/api';
import types from './types';

function* fetchExpenses(action: any) {
  yield put({ type: types.FETCH_EXPENSES_REQUEST });

  try {
    const response = yield call(Api.fetchExpenses);
    yield put({
      payload: { ...response },
      type: types.FETCH_EXPENSES_SUCCESS,
    });
  } catch (e) {
    yield put({ type: types.FETCH_EXPENSES_FAILURE, message: e.message });
  }
}

function* fetchExpenseReportById(action: any) {
  yield put({
    type: types.FETCH_EXPENSE_BY_ID_REQUEST,
    payload: {
      expenseReportId: action.payload.expenseReportId,
    },
  });

  try {
    const response = yield call(
      Api.fetchExpenseReportById,
      action.payload.expenseReportId
    );

    yield put({
      payload: { ...response },
      type: types.FETCH_EXPENSE_BY_ID_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: types.FETCH_EXPENSE_BY_ID_FAILURE,
      message: e.message,
    });
  }
}

function* selectExpenseReportFunction(action: any) {
  yield put({
    type: types.FETCH_EXPENSE_BY_ID,
    payload: {
      expenseReportId: action.payload.expenseReportId,
    },
  });

  try {
    yield put({
      type: types.SELECT_EXPENSE_SUCCESS,
      payload: {
        expenseReportId: action.payload.expenseReportId,
      },
    });
  } catch (e) {
    yield put({
      type: types.SELECT_EXPENSE_FAILURE,
      message: e.message,
    });
  }
}

export default all([
  takeEvery(types.SELECT_EXPENSE, selectExpenseReportFunction),
  takeEvery(types.FETCH_EXPENSES, fetchExpenses),
  takeEvery(types.FETCH_EXPENSE_BY_ID, fetchExpenseReportById),
]);
