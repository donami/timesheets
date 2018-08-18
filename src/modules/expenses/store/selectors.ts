import { createSelector } from 'reselect';

const getExpenseEntities = (state: any) => state.expenses.byId;
const getExpenseIds = (state: any) => state.expenses.ids;
const getSelectedId = (state: any) => state.expenses.selected;

export const getExpensesLoading = (state: any) => state.expenses.loading;

export const getExpenses = createSelector(
  getExpenseEntities,
  getExpenseIds,
  (entities, ids) => ids.map((id: number | string) => entities[id])
);

export const getSelectedExpenseReport = createSelector(
  getExpenseEntities,
  getSelectedId,
  (entities, id) => {
    return entities[id];
  }
);
