import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom';
import { Button } from 'genui';

import { getUsers } from '../store/selectors';
import { fetchUsers } from '../store/actions';
import { User } from '../store/models';
import { UserList } from '../components';
import { PageHeader, Translate } from '../../common';

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
        <PageHeader
          options={() => (
            <Button to="/users/add" color="blue">
              <Translate text="users.labels.NEW_USER" />
            </Button>
          )}
        >
          <Translate text="users.labels.USERS" />
        </PageHeader>

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
