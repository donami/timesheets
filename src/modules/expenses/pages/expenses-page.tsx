import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import { fetchExpenses, createExpense } from '../store/actions';
import { ExpenseReport } from '../store/models';
import { getExpenses } from '../store/selectors';
import { ExpenseReportList } from '../components';
import { Box } from '../../ui';
import { PageHeader } from '../../common';
import { Switch, Route } from 'react-router';
import ExpenseAddPage from './expense-add-page';
import { lifecycle, compose, withHandlers } from 'recompose';

type Props = {
  fetchExpenses(): any;
  createExpense(expense: ExpenseReport): any;
  expenseReports: ExpenseReport[];
};
type HandlerProps = { onAddExpense(data: any): void };
type EnhancedProps = Props & HandlerProps;

const ExpensesPage: React.SFC<EnhancedProps> = ({
  expenseReports,
  onAddExpense,
}) => (
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
            <ExpenseReportList items={expenseReports} paginated />
          </Box>
        </div>
      )}
    />
  </Switch>
);

const mapStateToProps = (state: any) => ({
  expenseReports: getExpenses(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchExpenses,
      createExpense,
    },
    dispatch
  );

const enhance = compose<EnhancedProps, Props>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle<Props, {}>({
    componentWillMount() {
      this.props.fetchExpenses();
    },
  }),
  withHandlers<Props, HandlerProps>({
    onAddExpense: props => (data: any) => {
      props.createExpense(data);
    },
  })
);

export default enhance(ExpensesPage);
