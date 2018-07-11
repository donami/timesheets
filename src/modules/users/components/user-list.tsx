import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'genui';

import { User } from '../store/models';

export interface UserListProps {
  users: User[];
}

class UserList extends React.Component<UserListProps> {
  render() {
    const { users } = this.props;

    const tableItems = users.map(user => ({
      id: <Link to={`/user/${user.id}`}>{user.id}</Link>,
      email: user.email,
    }));

    return (
      <div>
        <Table headings={['ID', 'Email']} items={tableItems} />
      </div>
    );
  }
}

export default UserList;
