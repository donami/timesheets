import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'genui';

import { Group } from '../store/models';

export interface GroupListProps {
  groups: Group[];
}

class GroupList extends React.Component<GroupListProps> {
  render() {
    const { groups } = this.props;

    const tableItems = groups.map(group => ({
      id: <Link to={`/group/${group.id}`}>{group.id}</Link>,
      name: group.name,
      members: group.members.length,
    }));

    return (
      <div>
        <Table headings={['ID', 'Name', 'Members']} items={tableItems} />
      </div>
    );
  }
}

export default GroupList;
