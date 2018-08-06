import * as React from 'react';

import { Box } from '../../ui';
import { User } from '../store/models';
import { Translate } from '../../common';

export interface UserInfoProps {
  user: User;
}

const UserInfo: React.StatelessComponent<UserInfoProps> = ({ user }) =>
  user ? (
    <Box title={() => <Translate text="users.labels.USER_INFO" />}>
      <strong>ID: {user.id}</strong> <br />
      <strong>Email: {user.email}</strong> <br />
    </Box>
  ) : null;

export default UserInfo;
