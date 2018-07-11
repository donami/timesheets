import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectExpenseReport, fetchExpenseReportById } from '../store/actions';
import { ExpenseReportInfo } from '../components';
import { getSelectedExpenseReport } from '../store/selectors';
import { ExpenseReport } from '../store/models';

export interface ExpenseReportPageProps {
  match: any;
  selectExpenseReport: (expenseReportId: number) => any;
  fetchExpenseReportById: (expenseReportId: number) => any;
  expenseReport: ExpenseReport;
}

class ExpenseReportPage extends React.Component<ExpenseReportPageProps> {
  componentWillMount() {
    const { match, selectExpenseReport, fetchExpenseReportById } = this.props;

    if (match && match.params.id) {
      selectExpenseReport(+match.params.id);
      fetchExpenseReportById(+match.params.id);
    }
  }

  render() {
    const { expenseReport } = this.props;

    return (
      <div>
        <ExpenseReportInfo expenseReport={expenseReport} />
      </div>
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseReportPage);
