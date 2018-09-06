import { call, put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Api from '../../../services/api';
import types from './types';
import * as toastr from '../../../services/toastr';

function* createLineItem(action: any) {
  const response = yield call(Api.createExpenseLineItem, action.payload);

  return response;
}

function* createExpense(action: any) {
  try {
    const items = yield all(
      action.payload.expense.items.map((item: any) =>
        call(createLineItem, { payload: item })
      )
    );

    const expense = {
      ...action.payload.expense,
      items,
    };

    const response = yield call(Api.createExpense, expense);

    yield all([
      put({
        payload: { ...response },
        type: types.EXPENSE_CREATE.SUCCESS,
      }),
      put(
        toastr.success({
          title: 'Expense report was submitted!',
          message: 'Expense report was successfully created.',
        })
      ),
      put(push('/expense-reports')),
    ]);
  } catch (e) {
    yield put({
      type: types.EXPENSE_CREATE.FAILURE,
      message: e.message,
    });
  }
}

function* updateExpense(action: any) {
  try {
    const items = yield all(
      action.payload.expense.items.map((item: any) =>
        call(createLineItem, { payload: item })
      )
    );

    const expense = {
      ...action.payload.expense,
      items,
    };

    const response = yield call(
      Api.updateExpense,
      action.payload.expenseReportId,
      expense
    );

    yield all([
      put(
        toastr.success({
          title: 'Expense report was updated!',
          message: 'Expense report was successfully updated.',
        })
      ),
      put({
        payload: { ...response },
        type: types.EXPENSE_UPDATE.SUCCESS,
      }),
      put(push('/expense-reports')),
    ]);
  } catch (e) {
    yield put({
      type: types.EXPENSE_UPDATE.FAILURE,
      message: e.message,
    });
  }
}

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
  takeEvery(types.EXPENSE_CREATE.REQUEST, createExpense),
  takeEvery(types.EXPENSE_UPDATE.REQUEST, updateExpense),
]);
