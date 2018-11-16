import * as React from 'react';
import { Button } from 'genui';

import { ExpenseReportList } from '../components';
import { Box, PageLoader } from '../../ui';
import { PageHeader } from '../../common';
import { Switch, Route } from 'react-router';
import ExpenseAddPage from './expense-add-page';
import { compose, withHandlers } from 'recompose';
import { graphql, Query, Mutation } from 'react-apollo';
import { CREATE_EXPENSE, CREATE_EXPENSE_ITEM } from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { GET_EXPENSES } from '../store/queries';
import { API_ENDPOINT_FILE } from '../../../config/constants';
import { CompanyContext } from '../../common/components/routing';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { adopt } from 'react-adopt';

type Props = {
  history: any;
};
type DataProps = {
  user: any;
  userLoading: boolean;
};
type HandlerProps = {
  onAddExpense(data: any, createExpense: any, createExpenseItem: any): void;
};
type EnhancedProps = Props & HandlerProps & DataProps & WithToastrProps;

const Mutations = adopt({
  createExpenseItem: ({ render }) => (
    <Mutation mutation={CREATE_EXPENSE_ITEM}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  createExpense: ({ user, render }) => (
    <Mutation
      mutation={CREATE_EXPENSE}
      update={(proxy, { data: { createExpense } }: { data: any }) => {
        const { allExpenses }: any = proxy.readQuery({
          query: GET_EXPENSES,
          variables: {
            ownerId: user.id,
            companyId: user.company.id,
          },
        });

        proxy.writeQuery({
          query: GET_EXPENSES,
          variables: {
            ownerId: user.id,
            companyId: user.company.id,
          },
          data: {
            allExpenses: allExpenses.concat(createExpense),
          },
        });
      }}
    >
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
});

const ExpensesPage: React.SFC<EnhancedProps> = ({
  user,
  userLoading,
  onAddExpense,
}) =>
  userLoading ? (
    <PageLoader />
  ) : (
    <Switch>
      <Route
        path="/expense-reports/add"
        render={props => (
          <Mutations user={user}>
            {({ createExpenseItem, createExpense }: any) => (
              <ExpenseAddPage
                onAddExpense={model =>
                  onAddExpense(
                    model,
                    createExpense.mutation,
                    createExpenseItem.mutation
                  )
                }
                loading={
                  createExpenseItem.result.loading ||
                  createExpense.result.loading
                }
                {...props}
              />
            )}
          </Mutations>
        )}
      />
      <Route
        path="/expense-reports"
        render={props => (
          <CompanyContext.Consumer>
            {({ company }: any) => (
              <Query
                query={GET_EXPENSES}
                variables={{ ownerId: user.id, companyId: company.id }}
              >
                {({ data, loading }) => {
                  if (loading) {
                    return <PageLoader />;
                  }

                  return (
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
                        <ExpenseReportList items={data.allExpenses} paginated />
                      </Box>
                    </div>
                  );
                }}
              </Query>
            )}
          </CompanyContext.Consumer>
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
  withHandlers<EnhancedProps, HandlerProps>({
    onAddExpense: ({ user, history, addToast }) => async (
      data,
      createExpense,
      createExpenseItem
    ) => {
      const items = data.items.map(async (item: any) => {
        const promises = item.files.map(async (file: any) => {
          if (typeof file === 'object') {
            const data = new FormData();
            data.append('data', file);

            const response = await fetch(API_ENDPOINT_FILE, {
              method: 'POST',
              body: data,
            });

            const image = await response.json();

            return image.id;
          }
          return null;
        });

        const fileIds = await Promise.all(promises);

        const expenseItem = await createExpenseItem({
          variables: {
            filesIds: fileIds,
            amount: +item.amount,
            currency: item.currency,
            expenseDate: item.expenseDate,
            expenseType: item.expenseType,
          },
        });

        return expenseItem.data.createExpenseItem.id;
      });

      const itemIds = await Promise.all(items);

      await createExpense({
        variables: {
          description: data.description,
          ownerId: user.id,
          itemsIds: itemIds,
        },
      });
      await addToast(
        'Expense submitted!',
        'Expense report was submitted.',
        'positive'
      );
      history.goBack();
    },
  })
);

export default enhance(ExpensesPage);
