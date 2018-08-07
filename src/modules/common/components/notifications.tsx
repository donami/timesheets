import React, { Component } from 'react';
import { connect } from 'react-redux';

import Feed from './feed';
import { getNotifications } from '../../auth/store/selectors';
import { Notification, NotificationType } from '../../auth/store/models';
import { timeAgo } from '../../../utils/calendar';

type Props = {
  notifications: Notification[];
};

class Notifications extends Component<Props> {
  getSummaryText = (type: NotificationType) => {
    switch (type) {
      case NotificationType.TIMESHEET_APPROVED:
        return 'Your timesheet was approved';

      default:
        return '_UNKNOWN_NOTIFICATION_TYPE_';
    }
  };

  render() {
    const { notifications } = this.props;

    return (
      <Feed>
        {notifications.map(notification => (
          <Feed.Item key={notification.id}>
            <Feed.Label icon={notification.icon} image={notification.image} />

            <Feed.Content>
              <Feed.Summary>
                {this.getSummaryText(notification.notificationType)}
                <Feed.Date>{timeAgo(notification.createdAt)}</Feed.Date>
              </Feed.Summary>
              {notification.message && (
                <Feed.Text>{notification.message}</Feed.Text>
              )}
            </Feed.Content>
          </Feed.Item>
        ))}
      </Feed>
    );
  }
}

export default connect((state: any) => ({
  notifications: getNotifications(state),
}))(Notifications);
