import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Dropdown, Icon } from 'genui';

import {
  getAuthedUser,
  getUnreadNotifications,
} from '../../auth/store/selectors';
import { UserRole } from '../../users/store/models';
import Avatar from './avatar';
import Popup from './popup';
import Notifications from './notifications';
import Attention from './attention';
import Search from './search';
import { HasAccess } from '../components';
import { withProps } from '../../../styled/styled-components';
import { LOGGED_IN_USER } from '../../auth/store/queries';

type Props = {
  containerHeight: number;
};

type DataProps = {
  loggedInUser: {
    id: string;
    firstName: string;
    lastName: string;
    image: string | null;
    gender?: string;
  } | null;
  notifications: any[];
  loading: boolean;
  unreadNotificationsCount: number;
  clearNotification(options: any): any;
};

type EnhancedProps = Props & DataProps;

type DropdownItem = {
  label: string;
  icon: string;
  to: string;
};

const items: DropdownItem[] = [
  {
    label: 'Profile',
    icon: 'fas fa-user',
    to: '/profile',
  },
  {
    label: 'Edit Profile',
    icon: 'fas fa-cog',
    to: '/profile/edit',
  },
  {
    label: 'Sign out',
    icon: 'fas fa-power-off',
    to: '/logout',
  },
];

class Header extends React.Component<EnhancedProps> {
  handleNotificationsClick = async () => {
    const { notifications, clearNotification } = this.props;

    const updates = notifications.map(notification => {
      return clearNotification({ variables: { id: notification.id } });
    });

    await Promise.all(updates);
  };

  render() {
    const {
      containerHeight,
      unreadNotificationsCount,
      loggedInUser,
      notifications,
    } = this.props;

    if (!loggedInUser) {
      return null;
    }

    return (
      <Container>
        <RightNode className="right-node" containerHeight={containerHeight}>
          {/* <LanguageSelector /> */}

          <HasAccess roles={[UserRole.Admin, UserRole.Manager]}>
            <div>
              <Search />
            </div>
          </HasAccess>

          <HeaderAction>
            <Popup
              trigger={
                <TriggerAction>
                  {unreadNotificationsCount > 0 && <Attention />}
                  <Icon name="far fa-bell" />
                </TriggerAction>
              }
              onClose={this.handleNotificationsClick}
              content={<Notifications notifications={notifications} />}
            />
          </HeaderAction>

          <StyledDropdown
            className="dropdown"
            items={items}
            renderItem={(item: DropdownItem) => (
              <Link to={item.to}>
                <i className={item.icon} />
                {item.label}
              </Link>
            )}
          >
            <Avatar
              view="sm"
              avatar={loggedInUser.image || ''}
              gender={loggedInUser.gender || 'unknown'}
            />
          </StyledDropdown>
        </RightNode>
      </Container>
    );
  }
}
const Container = styled.div`
  position: relative;
  height: 100%;
  border-bottom: #edeef3 1px solid;
`;

const HeaderAction = styled.div`
  border-right: 1px solid #edeef3;
  border-left: 1px solid #edeef3;
  padding: 0 20px;
`;

const TriggerAction = styled.div`
  position: relative;

  i {
    font-size: 1.4em;
    color: #dbdeed;
    line-height: 60px;
    cursor: pointer;
  }

  &:hover {
    i {
      color: #59efb0;
    }
  }
`;

const StyledDropdown = withProps<any>(styled(Dropdown))`
  line-height: normal;
  align-self: center;

  i {
    margin-right: 0.5em;
  }

  img {
    max-height: 3em;
    height: 3em;
  }

  .g-dropdown-menu {
    left: -80px;
    top: 120%;
  }
`;

interface RightNodeProps {
  containerHeight: number;
}

const RightNode = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: space-between;

  ${(props: RightNodeProps) => `line-height: ${props.containerHeight}px;`};
  ${(props: RightNodeProps) => `height: ${props.containerHeight}px;`};

  > div {
    margin: 0 10px;
  }
`;

const UNREAD_NOTIFICATIONS = gql`
  query($userId: ID!) {
    allNotifications(filter: { unread: true, owner: { id: $userId } }) {
      id
      message
      notificationType
      unread
      icon
      image
      createdAt
      updatedAt
    }
    _allNotificationsMeta(filter: { unread: true, owner: { id: $userId } }) {
      count
    }
  }
`;

const CLEAR_NOTIFICATION = gql`
  mutation($id: ID!) {
    updateNotification(id: $id, unread: false) {
      id
      unread
    }
  }
`;

const enhance = compose<any, any>(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      loggedInUser: data.loggedInUser || null,
    }),
  }),
  graphql(UNREAD_NOTIFICATIONS, {
    options: (props: any) => ({
      variables: { userId: props.loggedInUser.id },
    }),
    props: ({ data }: any) => ({
      notifications: data.allNotifications,
      unreadNotificationsCount:
        (data._allNotificationsMeta && data._allNotificationsMeta.count) || 0,
      loading: data.loading,
    }),
  }),
  graphql(CLEAR_NOTIFICATION, {
    name: 'clearNotification',
    options: (props: any) => ({
      update: (proxy, { data }: any) => {
        const variables = { userId: props.loggedInUser.id };
        const query = UNREAD_NOTIFICATIONS;

        const {
          allNotifications,
          _allNotificationsMeta,
        }: any = proxy.readQuery({
          variables,
          query,
        });

        const updatedAllNotifications = allNotifications.filter(
          (item: any) => item.id !== data.updateNotification.id
        );
        proxy.writeQuery({
          variables,
          query,
          data: {
            _allNotificationsMeta: {
              ..._allNotificationsMeta,
              count: updatedAllNotifications.length,
            },
            allNotifications: updatedAllNotifications,
          },
        });
      },
    }),
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(Header);
