import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TimesheetList } from '../components';
import { TimesheetItem } from '../store/models';
import { fetchTimesheets } from '../store/actions';
import { getTimesheetsWaitingForApproval } from '../store/selectors';
import { getAuthedUserProjectsWhereAdmin } from '../../auth/store/selectors';
import { fetchProjects } from '../../projects/store/actions';

type Props = {
  timesheets: TimesheetItem[];
  projects: any[] | any;
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
  timesheets: getTimesheetsWaitingForApproval(state),
  projects: getAuthedUserProjectsWhereAdmin(state),
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
