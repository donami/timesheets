import * as React from 'react';
import { Button } from 'genui';

import { ExpenseReportList } from '../components';
import { Box, PageLoader } from '../../ui';
import { PageHeader } from '../../common';
import { Switch, Route } from 'react-router';
import ExpenseAddPage from './expense-add-page';
import { compose, withHandlers, renderNothing, branch } from 'recompose';
import { graphql, Query } from 'react-apollo';
import { CREATE_EXPENSE, CREATE_EXPENSE_ITEM } from '../store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { GET_EXPENSES } from '../store/queries';
import { API_ENDPOINT_FILE } from '../../../config/constants';
import { CompanyContext } from '../../common/components/routing';
import { LOGGED_IN_USER } from '../../auth/store/queries';

type Props = {
  history: any;
};
type DataProps = {
  user: any;
  userLoading: boolean;
  loading: boolean;
  createExpense(options: any): any;
  createExpenseItem(options: any): any;
};
type HandlerProps = { onAddExpense(data: any): void };
type EnhancedProps = Props & HandlerProps & DataProps & WithToastrProps;

const ExpensesPage: React.SFC<EnhancedProps> = ({ user, onAddExpense }) => (
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
  graphql(CREATE_EXPENSE_ITEM, { name: 'createExpenseItem' }),
  graphql(CREATE_EXPENSE, {
    name: 'createExpense',
    options: (props: any) => ({
      update: (proxy, { data: { createExpense } }: { data: any }) => {
        const { allExpenses }: any = proxy.readQuery({
          query: GET_EXPENSES,
          variables: {
            ownerId: props.user.id,
            companyId: props.user.company.id,
          },
        });

        proxy.writeQuery({
          query: GET_EXPENSES,
          variables: {
            ownerId: props.user.id,
            companyId: props.user.company.id,
          },
          data: {
            allExpenses: allExpenses.concat(createExpense),
          },
        });
      },
    }),
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onAddExpense: ({
      createExpense,
      createExpenseItem,
      user,
      history,
      addToast,
    }) => async (data: any) => {
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
  }),
  branch(({ userLoading }) => userLoading, renderNothing)
);

export default enhance(ExpensesPage);
