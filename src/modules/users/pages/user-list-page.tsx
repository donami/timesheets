import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getUsers } from '../store/selectors';
import { fetchUsers } from '../store/actions';
import { User, UserRole } from '../store/models';
import { UserList } from '../components';
import { HasAccess } from '../../common';

export interface UserListPageProps {
  fetchUsers: () => any;
  users: User[];
}

class UserListPage extends React.Component<UserListPageProps> {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;
    return (
      <HasAccess roles={[UserRole.Manager, UserRole.Admin]}>
        <UserList users={users} />;
      </HasAccess>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: getUsers(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchUsers,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListPage);
