import * as React from 'react';
import { List } from 'genui';

import { Box } from '../../ui';
import { User } from '../store/models';
import { Translate } from '../../common';

export interface UserInfoProps {
  user: User;
}

const UserInfo: React.StatelessComponent<UserInfoProps> = ({ user }) =>
  user ? (
    <Box title={() => <Translate text="users.labels.USER_INFO" />}>
      <List>
        <List.Item>
          <strong>ID: {user.id}</strong>
        </List.Item>
        <List.Item>
          <strong>Email: {user.email}</strong>
        </List.Item>
      </List>
    </Box>
  ) : null;

export default UserInfo;
