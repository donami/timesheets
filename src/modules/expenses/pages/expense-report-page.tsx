import * as React from 'react';
import { Button } from 'genui';
import { Switch, Route } from 'react-router';
import { graphql } from 'react-apollo';
import { compose, withHandlers, branch, renderNothing } from 'recompose';

import { ExpenseReportInfo, ExpenseForm } from '../components';
import { PageHeader } from '../../common';
import { GET_EXPENSE } from '../store/queries';
import {
  UPDATE_EXPENSE_ITEM,
  CREATE_EXPENSE_ITEM,
  UPDATE_EXPENSE,
} from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';

type Props = {
  match: any;
  history: any;
};
type DataProps = {
  loading: boolean;
  expense: any;
  createExpenseItem(options: any): any;
  updateExpenseItem(options: any): any;
  updateExpense(options: any): any;
};
type HandlersProps = { onSave(model: any): void };
type EnhancedProps = Props & HandlersProps & DataProps & WithToastrProps;

const ExpenseReportPage: React.SFC<EnhancedProps> = ({ expense, onSave }) => (
  <Switch>
    <Route
      path="/expense-report/:id/edit"
      render={props => (
        <div>
          <PageHeader
            options={() => (
              <Button to={`/expense-report/${expense.id}`}>Cancel</Button>
            )}
          >
            Edit Expense Report
          </PageHeader>
          <ExpenseForm initialValues={expense} onSubmit={onSave} />
        </div>
      )}
    />
    <Route
      path="/expense-report/:id"
      render={props => (
        <div>
          <PageHeader
            options={() => (
              <Button to={`/expense-report/${expense.id}/edit`} color="purple">
                Edit Report
              </Button>
            )}
          >
            Expense Report
          </PageHeader>
          <ExpenseReportInfo expenseReport={expense} />
        </div>
      )}
    />
  </Switch>
);

const enhance = compose<EnhancedProps, Props>(
  withToastr,
  graphql(GET_EXPENSE, {
    options: ({ match }: any) => ({
      variables: { id: match.params.id },
    }),
    props: ({ data }: any) => ({
      loading: data.loading,
      expense: data.Expense,
    }),
  }),
  graphql(UPDATE_EXPENSE, { name: 'updateExpense' }),
  graphql(UPDATE_EXPENSE_ITEM, { name: 'updateExpenseItem' }),
  graphql(CREATE_EXPENSE_ITEM, { name: 'createExpenseItem' }),
  withHandlers<EnhancedProps, HandlersProps>({
    onSave: ({
      expense,
      updateExpense,
      updateExpenseItem,
      createExpenseItem,
      addToast,
      history,
    }) => async (model: any) => {
      const data = {
        ...model,
        id: expense.id,
      };

      const itemUpdates = data.items.map((item: any) => {
        if (item.id) {
          return updateExpenseItem({
            variables: {
              id: item.id,
              amount: +item.amount,
              currency: item.currency,
              expenseDate: item.expenseDate,
              expenseType: item.expenseType,
              files: item.files,
            },
          });
        }
        return createExpenseItem({
          variables: {
            expenseId: expense.id,
            amount: +item.amount,
            currency: item.currency,
            expenseDate: item.expenseDate,
            expenseType: item.expenseType,
            files: item.files,
          },
        });
      });

      await Promise.all(itemUpdates);
      await updateExpense({
        variables: {
          id: expense.id,
          description: data.description,
        },
      });
      addToast(
        'Expense updated!',
        'Expense report was updated successfully',
        'positive'
      );
      history.goBack();
    },
  }),
  branch<EnhancedProps>(({ loading }) => loading, renderNothing)
);

export default enhance(ExpenseReportPage);
