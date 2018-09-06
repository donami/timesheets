import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import {
  selectExpenseReport,
  fetchExpenseReportById,
  updateExpense,
} from '../store/actions';
import { ExpenseReportInfo, ExpenseForm } from '../components';
import { getSelectedExpenseReport } from '../store/selectors';
import { ExpenseReport } from '../store/models';
import { PageHeader } from '../../common';
import { Switch, Route } from 'react-router';

type Props = {
  match: any;
  selectExpenseReport(expenseReportId: number): any;
  fetchExpenseReportById(expenseReportId: number): any;
  updateExpense(expenseReportId: number, expense: ExpenseReport): any;
  expenseReport: ExpenseReport;
};

class ExpenseReportPage extends React.Component<Props> {
  componentWillMount() {
    const { match, selectExpenseReport, fetchExpenseReportById } = this.props;

    if (match && match.params.id) {
      selectExpenseReport(+match.params.id);
      fetchExpenseReportById(+match.params.id);
    }
  }

  handleSave = (model: any) => {
    const { expenseReport } = this.props;

    const data = {
      ...model,
      id: expenseReport.id,
    };

    this.props.updateExpense(expenseReport.id, data);
  };

  render() {
    const { expenseReport } = this.props;

    if (!expenseReport) {
      return null;
    }

    return (
      <Switch>
        <Route
          path="/expense-report/:id/edit"
          render={props => (
            <div>
              <PageHeader
                options={() => (
                  <Button to={`/expense-report/${expenseReport.id}`}>
                    Cancel
                  </Button>
                )}
              >
                Edit Expense Report
              </PageHeader>
              <ExpenseForm
                initialValues={expenseReport}
                onSubmit={this.handleSave}
              />
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
                    to={`/expense-report/${expenseReport.id}/edit`}
                    color="purple"
                  >
                    Edit Report
                  </Button>
                )}
              >
                Expense Report
              </PageHeader>
              <ExpenseReportInfo expenseReport={expenseReport} />
            </div>
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = (state: any) => ({
  expenseReport: getSelectedExpenseReport(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectExpenseReport,
      fetchExpenseReportById,
      updateExpense,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseReportPage);
