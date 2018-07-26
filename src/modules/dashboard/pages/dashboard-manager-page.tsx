import React from 'react';
import { connect } from 'react-redux';

import { Row, Column, Box } from '../../ui';
import { TimesheetsReadyForReview } from '../../timesheets';
import { bindActionCreators } from 'redux';
import { fetchTimesheets } from '../../timesheets/store/actions';
import { fetchExpenses } from '../../expenses/store/actions';
import { getExpenses } from '../../expenses/store/selectors';

type Props = {
  fetchTimesheets: () => any;
  fetchExpenses: () => any;
};

class DashboardManagerPage extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchTimesheets();
    this.props.fetchExpenses();
  }

  render() {
    return (
      <div>
        <Row>
          <Column sm={6}>
            <Box title="Timesheets Ready for Review">
              <TimesheetsReadyForReview />
            </Box>
          </Column>
          <Column sm={6} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
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
)(DashboardManagerPage);
