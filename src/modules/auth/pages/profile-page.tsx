import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'genui';

import { getAuthedUser } from '../store/selectors';
import { User, UserRole } from '../../users/store/models';
import { Box } from '../../ui';
import { TimesheetItem } from '../../timesheets/store/models';
import { getTimesheetsForAuthedUser } from '../../common/store/selectors';
import { TimesheetList } from '../../timesheets';
import { PageHeader } from '../../common';
import { fetchProjects } from '../../projects/store/actions';

type Props = {
  user: User;
  timesheets: TimesheetItem[];
  fetchProjects: () => any;
};

class ProfilePage extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchProjects();
  }

  render() {
    const { user, timesheets } = this.props;

    return (
      <div>
        <PageHeader>Your Profile</PageHeader>

        <Box title="Profile">
          <List divided>
            <List.Item>Name: {`${user.firstname} ${user.lastname}`}</List.Item>
            <List.Item>Role: {user.role}</List.Item>
          </List>
        </Box>

        {user.role === UserRole.User && (
          <Box title="Your Timesheets">
            <TimesheetList timesheets={timesheets} />
          </Box>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: getAuthedUser(state),
  timesheets: getTimesheetsForAuthedUser(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchProjects,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
