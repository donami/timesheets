import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList, StatusColor } from 'genui';

import { User } from '../store/models';

export interface UserListProps {
  users: User[];
}

const getStatusProps = (disabled: boolean) =>
  disabled ? { negative: true } : { positive: true };

class UserList extends React.Component<UserListProps> {
  render() {
    const { users } = this.props;

    const tableItems = users.map(user => ({
      id: <Link to={`/user/${user.id}`}>{user.id}</Link>,
      email: user.email,
      name: user.fullName,
      status: <StatusColor {...getStatusProps(user.disabled)} />,
    }));

    return (
      <div>
        <TableList
          headings={['ID', 'Email', 'Name', 'Status']}
          items={tableItems}
        />
      </div>
    );
  }
}

export default UserList;
