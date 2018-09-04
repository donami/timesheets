import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList, Button, Icon } from 'genui';

import { Group } from '../store/models';
import styled from '../../../styled/styled-components';

export interface GroupListProps {
  groups: Group[];
  onLoadMore: () => any;
  totalCount: number;
  onRemoveGroup(groupId: number): any;
}

class GroupList extends React.Component<GroupListProps> {
  render() {
    const { groups, totalCount, onLoadMore } = this.props;

    const tableItems = groups.map(group => ({
      id: <Link to={`/group/${group.id}`}>{group.id}</Link>,
      name: group.name,
      options: (
        <Options>
          <Link to={`/group/${group.id}/edit`}>
            <Icon name="fas fa-edit" />
          </Link>
          <Icon
            name="fas fa-trash"
            onClick={() => this.props.onRemoveGroup(group.id)}
          />
        </Options>
      ),
    }));

    return (
      <div>
        <TableList headings={['ID', 'Name', 'Options']} items={tableItems} />

        <Button onClick={onLoadMore} disabled={groups.length >= totalCount}>
          Load More...
        </Button>
      </div>
    );
  }
}

export default GroupList;

const Options = styled.div`
  a,
  i {
    margin-right: 5px;
    cursor: pointer;
    color: ${props => props.theme.primaryColor};
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`;
