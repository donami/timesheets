import * as React from 'react';

import { Box } from '../../ui';
import { Group } from '../store/models';

export interface GroupInfoProps {
  group: Group;
}

const GroupInfo: React.StatelessComponent<GroupInfoProps> = ({ group }) =>
  group ? (
    <Box title="View Group">
      <strong>ID: {group.id}</strong> <br />
      <strong>Name: {group.name}</strong> <br />
    </Box>
  ) : null;

export default GroupInfo;
