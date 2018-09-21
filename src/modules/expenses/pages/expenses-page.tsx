import * as React from 'react';
import { Button } from 'genui';

import { ExpenseReportList } from '../components';
import { Box } from '../../ui';
import { PageHeader } from '../../common';
import { Switch, Route } from 'react-router';
import ExpenseAddPage from './expense-add-page';
import { compose, withHandlers, renderNothing, branch } from 'recompose';
import { graphql } from 'react-apollo';
import { LOGGED_IN_USER } from '../../auth/pages/auth-page';
import { CREATE_EXPENSE } from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { GET_EXPENSES } from '../store/queries';

type Props = {
  history: any;
};
type DataProps = {
  user: any;
  userLoading: boolean;
  loading: boolean;
  expenses: any;
  createExpense(options: any): any;
};
type HandlerProps = { onAddExpense(data: any): void };
type EnhancedProps = Props & HandlerProps & DataProps & WithToastrProps;

const ExpensesPage: React.SFC<EnhancedProps> = ({ expenses, onAddExpense }) => (
  <Switch>
    <Route
      path="/expense-reports/add"
      render={props => (
        <ExpenseAddPage onAddExpense={onAddExpense} {...props} />
      )}
    />
    <Route
      path="/expense-reports"
      render={props => (
        <div>
          <PageHeader
            options={() => (
              <Button to="/expense-reports/add" color="purple">
                Create Expense Report
              </Button>
            )}
          >
            Expense Reports
          </PageHeader>
          <Box title="Expenses">
            <ExpenseReportList items={expenses} paginated />
          </Box>
        </div>
      )}
    />
  </Switch>
);

const enhance = compose<EnhancedProps, Props>(
  withToastr,
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      user: data.user,
      userLoading: data.loading,
    }),
  }),
  graphql(GET_EXPENSES, {
    props: ({ data }: any) => ({
      expenses: data.allExpenses,
      loading: data.loading,
    }),
  }),
  graphql(CREATE_EXPENSE, {
    name: 'createExpense',
    options: {
      update: (proxy, { data: { createExpense } }: { data: any }) => {
        const { allExpenses }: any = proxy.readQuery({
          query: GET_EXPENSES,
        });

        proxy.writeQuery({
          query: GET_EXPENSES,
          data: {
            allExpenses: allExpenses.concat(createExpense),
          },
        });
      },
    },
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onAddExpense: ({ createExpense, user, history, addToast }) => async (
      data: any
    ) => {
      await createExpense({
        variables: {
          description: data.description,
          ownerId: user.id,
          items: data.items.map((item: any) => ({
            amount: +item.amount,
            currency: item.currency,
            expenseDate: item.expenseDate,
            expenseType: item.expenseType,
            files: item.files,
          })),
        },
      });
      await addToast(
        'Expense submitted!',
        'Expense report was submitted.',
        'positive'
      );
      history.goBack();
    },
  }),
  branch(({ userLoading, loading }) => userLoading || loading, renderNothing)
);

export default enhance(ExpensesPage);
