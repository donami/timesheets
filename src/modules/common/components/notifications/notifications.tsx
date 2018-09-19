import React from 'react';

import Feed from '../feed';
import { Notification } from '../../../auth/store/models';
import NotificationItem from './notification-item';

type Props = {
  notifications: Notification[];
};

const Notifications: React.SFC<Props> = ({ notifications }) => (
  <Feed>
    {notifications.length === 0 && (
      <Feed.Item>
        <Feed.Content>You have no new notifications.</Feed.Content>
      </Feed.Item>
    )}
    {notifications.map(notification => (
      <NotificationItem notification={notification} key={notification.id} />
    ))}
  </Feed>
);

export default Notifications;
