import React, { Component } from 'react';
import { connect } from 'react-redux';

import Feed from '../feed';
import { getNotifications } from '../../../auth/store/selectors';
import { Notification } from '../../../auth/store/models';
import NotificationItem from './notification-item';

type Props = {
  notifications: Notification[];
};

class Notifications extends Component<Props> {
  render() {
    const { notifications } = this.props;

    return (
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
  }
}

export default connect((state: any) => ({
  notifications: getNotifications(state),
}))(Notifications);
