import * as React from 'react';
import { Button } from 'genui';
import { Switch, Route } from 'react-router';
import { graphql, Mutation } from 'react-apollo';
import { compose, withHandlers, branch, renderNothing } from 'recompose';

import { ExpenseReportInfo, ExpenseForm } from '../components';
import { PageHeader } from '../../common';
import { GET_EXPENSE } from '../store/queries';
import { UPDATE_EXPENSE_ITEM, UPDATE_EXPENSE } from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { API_ENDPOINT_FILE } from '../../../config/constants';
import { adopt } from 'react-adopt';
import { PageLoader } from '../../ui';

type Props = {
  match: any;
  history: any;
};
type DataProps = {
  loading: boolean;
  expense: any;
};
type HandlersProps = {
  onSave(model: any, updateExpense: any, updateExpenseItem: any): void;
};
type EnhancedProps = Props & HandlersProps & DataProps & WithToastrProps;

const Mutations = adopt({
  updateExpenseItem: ({ render }) => (
    <Mutation mutation={UPDATE_EXPENSE_ITEM}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  updateExpense: ({ render }) => (
    <Mutation mutation={UPDATE_EXPENSE}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
});

const ExpenseReportPage: React.SFC<EnhancedProps> = ({
  expense,
  onSave,
  loading,
}) =>
  loading ? (
    <PageLoader />
  ) : (
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
            <Mutations>
              {({ updateExpenseItem, updateExpense }: any) => {
                return (
                  <ExpenseForm
                    initialValues={expense}
                    loading={
                      updateExpense.result.loading ||
                      updateExpenseItem.result.loading
                    }
                    onSubmit={(model: any) =>
                      onSave(
                        model,
                        updateExpense.mutation,
                        updateExpenseItem.mutation
                      )
                    }
                  />
                );
              }}
            </Mutations>
          </div>
        )}
      />
      <Route
        path="/expense-report/:id"
        render={props => (
          <div>
            <PageHeader
              options={() => (
                <Button
                  to={`/expense-report/${expense.id}/edit`}
                  color="purple"
                >
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
  withHandlers<EnhancedProps, HandlersProps>({
    onSave: ({ expense, addToast, history }) => async (
      model: any,
      updateExpense: any,
      updateExpenseItem: any
    ) => {
      const data = {
        ...model,
        id: expense.id,
      };

      const itemUpdates = data.items.map(async (item: any) => {
        const previousFileIds = item.files
          .filter((file: any) => file.id)
          .map((file: any) => file.id);

        const pendingFiles = item.files
          .filter((file: any) => !file.id)
          .map(async (file: any) => {
            const data = new FormData();
            data.append('data', file);

            const response = await fetch(API_ENDPOINT_FILE, {
              method: 'POST',
              body: data,
            });

            const image = await response.json();

            return image.id;
          });

        const newFileIds = await Promise.all(pendingFiles);

        return updateExpenseItem({
          variables: {
            id: item.id || '',
            amount: +item.amount,
            currency: item.currency,
            expenseDate: item.expenseDate,
            expenseType: item.expenseType,
            filesIds: previousFileIds.concat(newFileIds),
          },
        });
      });

      const items = await Promise.all(itemUpdates);

      await updateExpense({
        variables: {
          id: expense.id,
          description: data.description,
          itemsIds: items.map(
            (item: any) => item.data.updateOrCreateExpenseItem.id
          ),
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
