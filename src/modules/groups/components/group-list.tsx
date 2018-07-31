import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'genui';

import { Group } from '../store/models';

export interface GroupListProps {
  groups: Group[];
  onLoadMore: () => any;
  totalCount: number;
}

class GroupList extends React.Component<GroupListProps> {
  render() {
    const { groups, totalCount, onLoadMore } = this.props;

    const tableItems = groups.map(group => ({
      id: <Link to={`/group/${group.id}`}>{group.id}</Link>,
      name: group.name,
      members: group.members.length || '0',
    }));

    return (
      <div>
        <Table headings={['ID', 'Name', 'Members']} items={tableItems} />

        <Button onClick={onLoadMore} disabled={groups.length >= totalCount}>
          Load More...
        </Button>
      </div>
    );
  }
}

export default GroupList;
