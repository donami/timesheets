import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';
import { Switch, Route } from 'react-router';
import {
  compose,
  lifecycle,
  withHandlers,
  branch,
  renderNothing,
} from 'recompose';

import {
  selectExpenseReport,
  fetchExpenseReportById,
  updateExpense,
} from '../store/actions';
import { ExpenseReportInfo, ExpenseForm } from '../components';
import { getSelectedExpenseReport } from '../store/selectors';
import { ExpenseReport } from '../store/models';
import { PageHeader } from '../../common';

type Props = {
  match: any;
  selectExpenseReport(expenseReportId: number): any;
  fetchExpenseReportById(expenseReportId: number): any;
  updateExpense(expenseReportId: number, expense: ExpenseReport): any;
  expenseReport: ExpenseReport;
};

type HandlersProps = { onSave(model: any): void };
type EnhancedProps = Props & HandlersProps;

const ExpenseReportPage: React.SFC<EnhancedProps> = ({
  expenseReport,
  onSave,
}) => (
  <Switch>
    <Route
      path="/expense-report/:id/edit"
      render={props => (
        <div>
          <PageHeader
            options={() => (
              <Button to={`/expense-report/${expenseReport.id}`}>Cancel</Button>
            )}
          >
            Edit Expense Report
          </PageHeader>
          <ExpenseForm initialValues={expenseReport} onSubmit={onSave} />
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

const enhance = compose<EnhancedProps, Props>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle<Props, {}>({
    componentWillMount() {
      const { match, selectExpenseReport, fetchExpenseReportById } = this.props;

      if (match && match.params.id) {
        selectExpenseReport(+match.params.id);
        fetchExpenseReportById(+match.params.id);
      }
    },
  }),
  withHandlers<Props, HandlersProps>({
    onSave: props => (model: any) => {
      const data = {
        ...model,
        id: props.expenseReport.id,
      };

      props.updateExpense(props.expenseReport.id, data);
    },
  }),
  branch<Props>(props => !props.expenseReport, renderNothing)
);

export default enhance(ExpenseReportPage);
