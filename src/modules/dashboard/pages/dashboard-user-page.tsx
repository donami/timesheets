import React from 'react';
import { connect } from 'react-redux';

import { Row, Column, Box } from '../../ui';
import { TimesheetList } from '../../timesheets';
import { bindActionCreators } from 'redux';
import { fetchTimesheets } from '../../timesheets/store/actions';
import { fetchExpenses } from '../../expenses/store/actions';
import { TimesheetItem } from '../../timesheets/store/models';
import { ExpenseReport } from '../../expenses/store/models';
import { getExpenses } from '../../expenses/store/selectors';
import { ExpenseReportList } from '../../expenses';
import { getTimesheetsForAuthedUser } from '../../common/store/selectors';

type Props = {
  timesheets: TimesheetItem[];
  expenseReports: ExpenseReport[];
  fetchTimesheets: () => any;
  fetchExpenses: () => any;
};

class DashboardUserPage extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchTimesheets();
    this.props.fetchExpenses();
  }

  render() {
    const { timesheets, expenseReports } = this.props;

    return (
      <div>
        <Row>
          <Column sm={6}>
            <Box title="Timesheets">
              <TimesheetList timesheets={timesheets} />
            </Box>
          </Column>
          <Column sm={6}>
            <Box title="Expenses">
              <ExpenseReportList expenseReports={expenseReports} />
            </Box>
          </Column>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  timesheets: getTimesheetsForAuthedUser(state),
  expenseReports: getExpenses(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchTimesheets,
      fetchExpenses,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardUserPage);