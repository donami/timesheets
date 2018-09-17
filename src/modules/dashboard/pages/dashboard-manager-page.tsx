import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'genui';

import { Row, Column, Box } from '../../ui';
import {
  TimesheetsReadyForReview,
  TimesheetsPastDueDate,
  TimesheetsRecentlyUpdated,
} from '../../timesheets';
import { fetchTimesheets } from '../../timesheets/store/actions';
import { fetchExpenses } from '../../expenses/store/actions';
import { getExpenses } from '../../expenses/store/selectors';
import { Translate, PageHeader } from '../../common';
import { getAuthedUser } from '../../auth/store/selectors';
import { User } from '../../users/store/models';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { LOGGED_IN_USER } from '../../auth/store/queries';

type Props = {
  fetchTimesheets: () => any;
  fetchExpenses: () => any;
};

type DataProps = {
  user: any;
};
type EnhancedProps = Props & DataProps;

class DashboardManagerPage extends React.Component<EnhancedProps> {
  // componentWillMount() {
  //   this.props.fetchTimesheets();
  //   this.props.fetchExpenses();
  // }

  render() {
    const { user } = this.props;

    return (
      <div>
        <PageHeader>Welcome {user.firstName}!</PageHeader>

        <Row>
          <Column xs={12} sm={6}>
            <Box
              actions={
                <Link to="/manage-timesheets">
                  <Icon name="fas fa-external-link-alt" />
                </Link>
              }
              title={() => (
                <Translate text="timesheet.labels.TIMESHEETS_READY_FOR_REVIEW" />
              )}
            >
              <TimesheetsReadyForReview limit={10} />
            </Box>
          </Column>
          <Column xs={12} sm={6}>
            <Box
              title={() => <Translate text={`help.labels.SUPPORT_AND_HELP`} />}
            >
              <div style={{ textAlign: 'center' }}>
                <Button to="/help/manage">
                  <Icon name="fas fa-cog" />
                  <Translate text={`help.labels.MANAGE_HELP_PAGES`} />
                </Button>
              </div>
            </Box>
          </Column>
        </Row>

        <Row>
          <Column xs={12} sm={6}>
            <Box
              actions={
                <Link to="/manage-timesheets">
                  <Icon name="fas fa-external-link-alt" />
                </Link>
              }
              title={() => (
                <>
                  <Translate text="timesheet.labels.TIMESHEETS_PAST_DUE_DATE" />
                </>
              )}
            >
              <TimesheetsPastDueDate limit={10} />
            </Box>
          </Column>
          <Column xs={12} sm={6}>
            <Box
              actions={
                <Link to="/manage-timesheets">
                  <Icon name="fas fa-external-link-alt" />
                </Link>
              }
              title="Timesheets Recently Updated"
            >
              <TimesheetsRecentlyUpdated limit={10} />
            </Box>
          </Column>
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DashboardManagerPage);

const enhance = compose(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      user: data.loggedInUser || null,
    }),
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(DashboardManagerPage);
