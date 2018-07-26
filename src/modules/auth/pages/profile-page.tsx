import React from 'react';
import { connect } from 'react-redux';
import { List } from 'genui';

import { getAuthedUser } from '../store/selectors';
import { User } from '../../users/store/models';
import { Box } from '../../ui';

type Props = {
  user: User;
};

class ProfilePage extends React.Component<Props> {
  render() {
    const { user } = this.props;

    return (
      <div>
        <Box title="Profile">
          <List divided>
            <List.Item>Name: {`${user.firstname} ${user.lastname}`}</List.Item>
            <List.Item>Role: {user.role}</List.Item>
          </List>
          <br />
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: getAuthedUser(state),
});

export default connect(mapStateToProps)(ProfilePage);
