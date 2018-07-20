import React from 'react';
import { connect } from 'react-redux';

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
        <Box title="Profile">Name: {`${user.firstname} ${user.lastname}`}</Box>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: getAuthedUser(state),
});

export default connect(mapStateToProps)(ProfilePage);
