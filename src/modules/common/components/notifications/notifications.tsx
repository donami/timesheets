import React from 'react';
import { Link } from 'react-router-dom';

import Feed from '../feed';
import { Notification } from '../../../auth/store/models';
import NotificationItem from './notification-item';
import styled from '../../../../styled/styled-components';

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
    <Feed.Item>
      <AllNotificationsContent>
        <Link to="/notifications">See all notifications</Link>
      </AllNotificationsContent>
    </Feed.Item>
  </Feed>
);

export default Notifications;

const AllNotificationsContent = styled(Feed.Content)`
  text-align: center;
  text-transform: uppercase;
  font-weight: 300;
`;
