import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TimesheetList } from '../components';
import { fetchTimesheets } from '../store/actions';
import { getTimesheetsForAuthedUser } from '../../common/store/selectors';
import { sortByDate, filterOutFutureTimesheets } from '../utils';

type Props = {
  fetchTimesheets: () => any;
  timesheets: any;
};

class TimesheetsPage extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchTimesheets();
  }

  render() {
    const { timesheets } = this.props;

    const filteredTimesheets = timesheets
      .filter(filterOutFutureTimesheets)
      .sort(sortByDate);

    return (
      <div>
        <TimesheetList timesheets={filteredTimesheets} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  timesheets: getTimesheetsForAuthedUser(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchTimesheets,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetsPage);
