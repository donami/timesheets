import React from 'react';
import { connect } from 'react-redux';
import { List } from 'genui';

import { getAuthedUser } from '../store/selectors';
import { User } from '../../users/store/models';
import { Box } from '../../ui';
import { TimesheetItem } from '../../timesheets/store/models';
import { getTimesheetsForAuthedUser } from '../../common/store/selectors';
import { TimesheetList } from '../../timesheets';

type Props = {
  user: User;
  timesheets: TimesheetItem[];
};

class ProfilePage extends React.Component<Props> {
  render() {
    const { user, timesheets } = this.props;

    return (
      <div>
        <Box title="Profile">
          <List divided>
            <List.Item>Name: {`${user.firstname} ${user.lastname}`}</List.Item>
            <List.Item>Role: {user.role}</List.Item>
          </List>
        </Box>

        <Box title="Your Timesheets">
          <TimesheetList timesheets={timesheets} />
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: getAuthedUser(state),
  timesheets: getTimesheetsForAuthedUser(state),
});

export default connect(mapStateToProps)(ProfilePage);
