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

export interface ExpensesPageProps {
  fetchExpenses(): any;
  createExpense(expense: ExpenseReport): any;
  expenseReports: ExpenseReport[];
}

class ExpensesPage extends React.Component<ExpensesPageProps> {
  componentWillMount() {
    this.props.fetchExpenses();
  }

  handleAddExpense = (data: ExpenseReport) => {
    this.props.createExpense(data);
  };

  render() {
    const { expenseReports } = this.props;

    return (
      <Switch>
        <Route
          path="/expense-reports/add"
          render={props => (
            <ExpenseAddPage onAddExpense={this.handleAddExpense} {...props} />
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
                <ExpenseReportList expenseReports={expenseReports} />
              </Box>
            </div>
          )}
        />
      </Switch>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesPage);
