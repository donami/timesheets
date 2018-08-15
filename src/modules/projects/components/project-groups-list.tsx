import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'genui';

import { Group } from '../../groups/store/models';

export interface Props {
  groups: Group[];
  noGroupsText?: string;
}

class ProjectGroupsList extends React.Component<Props> {
  render() {
    const { groups, noGroupsText } = this.props;

    if (!groups.length) {
      return <div>{noGroupsText || 'No groups exist'}</div>;
    }

    const tableItems = groups.map(group => {
      return {
        id: <Link to={`/group/${group.id}`}>{group.id}</Link>,
        name: group.name,
      };
    });

    return (
      <div>
        <Table headings={['ID', 'Name']} items={tableItems} />
      </div>
    );
  }
}

export default ProjectGroupsList;
