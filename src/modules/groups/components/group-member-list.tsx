import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList } from 'genui';

import { UserRole } from '../../users/store/models';

type Props = {
  members: any[];
  noMembersText?: string;
};

const GroupMemberList: React.SFC<Props> = ({ members, noMembersText }) => {
  if (!members.length) {
    return <div>{noMembersText || 'No members exist'}</div>;
  }

  const tableItems = members
    .filter(user => user.role === UserRole.User)
    .map(user => {
      return {
        id: <Link to={`/user/${user.id}`}>{user.id}</Link>,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      };
    });

  return (
    <div>
      <TableList headings={['ID', 'Name', 'Email']} items={tableItems} />
    </div>
  );
};

export default GroupMemberList;
