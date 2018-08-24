import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList, Button } from 'genui';

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
    }));

    return (
      <div>
        <TableList headings={['ID', 'Name']} items={tableItems} />

        <Button onClick={onLoadMore} disabled={groups.length >= totalCount}>
          Load More...
        </Button>
      </div>
    );
  }
}

export default GroupList;
