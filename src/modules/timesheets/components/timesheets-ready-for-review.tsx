import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TimesheetList } from '../components';
import { TimesheetItem } from '../store/models';
import { fetchTimesheets } from '../store/actions';
import { fetchProjects } from '../../projects/store/actions';
import { getTimesheetsWaitingForApprovalWhereAdmin } from '../../common/store/selectors';

type Props = {
  timesheets: TimesheetItem[];
  fetchTimesheets: () => any;
  fetchProjects: () => any;
};

class TimesheetsReadyForReview extends React.Component<Props> {
  componentWillMount() {
    const { fetchTimesheets, fetchProjects } = this.props;

    fetchProjects();
    fetchTimesheets();
  }

  render() {
    const { timesheets } = this.props;

    return (
      <div>
        <TimesheetList timesheets={timesheets} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  timesheets: getTimesheetsWaitingForApprovalWhereAdmin(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchTimesheets,
      fetchProjects,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetsReadyForReview);
