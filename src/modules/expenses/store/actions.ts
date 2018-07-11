import types from './types';

export const fetchExpenses = () => ({
  type: types.FETCH_EXPENSES,
});

export const selectExpenseReport = (expenseReportId: number) => ({
  type: types.SELECT_EXPENSE,
  payload: {
    expenseReportId,
  },
});

export const fetchExpenseReportById = (expenseReportId: number) => ({
  type: types.FETCH_EXPENSE_BY_ID,
  payload: {
    expenseReportId,
  },
});
