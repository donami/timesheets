import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TimesheetList } from '../components';
import { TimesheetItem } from '../store/models';
import { fetchTimesheets } from '../store/actions';
import { fetchProjects } from '../../projects/store/actions';
import { getTimesheetsWaitingForApprovalWhereAdmin } from '../../common/store/selectors';
import { getTimesheetsLoaded, getTimesheetsLoading } from '../store/selectors';

type Props = {
  timesheets: TimesheetItem[];
  fetchTimesheets: () => any;
  fetchProjects: () => any;
  timesheetsLoaded: boolean;
  timesheetsLoading: boolean;
  limit?: number;
};

class TimesheetsReadyForReview extends React.Component<Props> {
  componentWillMount() {
    const {
      fetchTimesheets,
      fetchProjects,
      timesheetsLoaded,
      timesheetsLoading,
    } = this.props;

    if (!timesheetsLoaded && !timesheetsLoading) {
      fetchTimesheets();
    }
    fetchProjects();
  }

  render() {
    const { timesheets, ...rest } = this.props;

    return (
      <div>
        <TimesheetList items={timesheets} {...rest} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  timesheets: getTimesheetsWaitingForApprovalWhereAdmin(state),
  timesheetsLoaded: getTimesheetsLoaded(state),
  timesheetsLoading: getTimesheetsLoading(state),
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
