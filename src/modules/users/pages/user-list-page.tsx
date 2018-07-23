import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Heading } from 'genui';
import { Link } from 'react-router-dom';

import { getUsers } from '../store/selectors';
import { fetchUsers } from '../store/actions';
import { User } from '../store/models';
import { UserList } from '../components';

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
      <div>
        <Heading as="h1" dividing="true">
          Users
        </Heading>

        <Link to="/users/add">Add user</Link>

        <UserList users={users} />
      </div>
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
