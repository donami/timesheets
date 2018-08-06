import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'genui';
import { Link } from 'react-router-dom';

import { Row, Column, Box } from '../../ui';
import {
  TimesheetsReadyForReview,
  TimesheetsPastDueDate,
} from '../../timesheets';
import { bindActionCreators } from 'redux';
import { fetchTimesheets } from '../../timesheets/store/actions';
import { fetchExpenses } from '../../expenses/store/actions';
import { getExpenses } from '../../expenses/store/selectors';
import { Translate } from '../../common';

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
            <Box
              title={() => (
                <Translate text="timesheet.labels.TIMESHEETS_READY_FOR_REVIEW" />
              )}
            >
              <TimesheetsReadyForReview />
            </Box>
          </Column>
          <Column sm={6}>
            <Box
              title={() => <Translate text={`help.labels.SUPPORT_AND_HELP`} />}
            >
              <div style={{ textAlign: 'center' }}>
                <Button to="/help/manage">
                  <Translate text={`help.labels.MANAGE_HELP_PAGES`} />
                </Button>
              </div>
            </Box>
          </Column>
        </Row>

        <Row>
          <Column sm={6}>
            <Box
              title={() => (
                <Translate text="timesheet.labels.TIMESHEETS_PAST_DUE_DATE" />
              )}
            >
              <TimesheetsPastDueDate />
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
