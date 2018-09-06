import types from './types';
import { ExpenseReport } from './models';

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

export const createExpense = (expense: Partial<ExpenseReport>) => ({
  type: types.EXPENSE_CREATE.REQUEST,
  payload: {
    expense,
  },
});

export const updateExpense = (
  expenseReportId: number,
  expense: ExpenseReport
) => ({
  type: types.EXPENSE_UPDATE.REQUEST,
  payload: {
    expenseReportId,
    expense,
  },
});
