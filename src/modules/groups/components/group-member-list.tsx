import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'genui';

import { User } from '../../users/store/models';

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

    const tableItems = members.map((user: User) => {
      return {
        id: <Link to={`/user/${user.id}`}>{user.id}</Link>,
        email: user.email,
      };
    });

    return (
      <div>
        <Table headings={['ID', 'Email']} items={tableItems} />
      </div>
    );
  }
}

export default GroupMemberList;
