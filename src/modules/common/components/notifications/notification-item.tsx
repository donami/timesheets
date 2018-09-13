import React from 'react';

import Feed from '../feed';
import { Notification, NotificationType } from '../../../auth/store/models';
import { timeAgo } from '../../../../utils/calendar';

type Props = {
  notification: Notification;
};

const getSummaryText = (type: NotificationType) => {
  switch (type) {
    case NotificationType.TIMESHEET_APPROVED:
      return 'Your timesheet was approved.';

    case NotificationType.TIMESHEET_NEEDS_REVISEMENT:
      return 'Your timesheet was declined and needs to be submitted again once corrected.';

    default:
      return '_UNKNOWN_NOTIFICATION_TYPE_';
  }
};

const Notification: React.SFC<Props> = ({ notification }) => {
  return (
    <Feed.Item key={notification.id}>
      <Feed.Label icon={notification.icon} image={notification.image} />

      <Feed.Content>
        <Feed.Summary>
          {getSummaryText(notification.notificationType)}
          <Feed.Date>{timeAgo(notification.createdAt)}</Feed.Date>
        </Feed.Summary>
        {notification.message && <Feed.Text>{notification.message}</Feed.Text>}
      </Feed.Content>
    </Feed.Item>
  );
};

export default Notification;
