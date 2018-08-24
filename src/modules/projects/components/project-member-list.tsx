import React from 'react';
import { Link } from 'react-router-dom';
import { TableList } from 'genui';

import { ProjectMember } from '../store/models';
import { User } from '../../users/store/models';

export interface ProjectMemberListProps {
  members: ProjectMember[];
  noMembersText?: string;
}

class ProjectMemberList extends React.Component<ProjectMemberListProps> {
  render() {
    const { members, noMembersText } = this.props;

    if (!members.length) {
      return <div>{noMembersText || 'No members exist'}</div>;
    }

    const tableItems = members.map(member => {
      const user = member.user as User;
      return {
        id: <Link to={`/user/${user.id}`}>{user.id}</Link>,
        email: user.email,
        role: member.role,
      };
    });

    return (
      <div>
        <TableList headings={['ID', 'Email', 'Role']} items={tableItems} />
      </div>
    );
  }
}

export default ProjectMemberList;
