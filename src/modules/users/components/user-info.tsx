import * as React from 'react';

import { Box } from '../../ui';
import { User } from '../store/models';

export interface UserInfoProps {
  user: User;
}

const UserInfo: React.StatelessComponent<UserInfoProps> = ({ user }) =>
  user ? (
    <Box title="User Info">
      <strong>ID: {user.id}</strong> <br />
      <strong>Email: {user.email}</strong> <br />
    </Box>
  ) : null;

export default UserInfo;
