import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList } from 'genui';

import { User, UserRole } from '../../users/store/models';

export interface GroupMemberListProps {
  members: User[];
  noMembersText?: string;
}

class GroupMemberList extends React.Component<GroupMemberListProps> {
  render() {
    const { members, noMembersText } = this.props;

    if (!members.length) {
      return <div>{noMembersText || 'No members exist'}</div>;
    }

    const tableItems = members
      .filter(user => user.role === UserRole.User)
      .map(user => {
        return {
          id: <Link to={`/user/${user.id}`}>{user.id}</Link>,
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
        };
      });

    return (
      <div>
        <TableList headings={['ID', 'Name', 'Email']} items={tableItems} />
      </div>
    );
  }
}

export default GroupMemberList;
