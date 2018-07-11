import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box } from 'genui';

import { fetchExpenses } from '../store/actions';
import { ExpenseReport } from '../store/models';
import { getExpenses } from '../store/selectors';
import { ExpenseReportList } from '../components';

export interface ExpensesPageProps {
  fetchExpenses: () => any;
  expenseReports: ExpenseReport[];
}

class ExpensesPage extends React.Component<ExpensesPageProps> {
  componentWillMount() {
    this.props.fetchExpenses();
  }

  render() {
    const { expenseReports } = this.props;

    return (
      <Box title="Expenses">
        <ExpenseReportList expenseReports={expenseReports} />
      </Box>
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
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesPage);
