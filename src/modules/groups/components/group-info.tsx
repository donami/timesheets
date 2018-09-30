import * as React from 'react';

import { Box } from '../../ui';
import { Group } from '../store/models';
import { List } from 'genui';

export interface GroupInfoProps {
  group: Group;
}

const GroupInfo: React.StatelessComponent<GroupInfoProps> = ({ group }) =>
  group ? (
    <Box title="View Group">
      <List>
        <List.Item>
          <strong>ID: </strong> {group.id}
        </List.Item>
        <List.Item>
          <strong>Name:</strong> {group.name}
        </List.Item>
      </List>
    </Box>
  ) : null;

export default GroupInfo;
