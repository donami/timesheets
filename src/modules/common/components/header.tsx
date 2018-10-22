import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Dropdown, Icon } from 'genui';

import { UserRole } from '../../users/store/models';
import Popup from './popup';
import Notifications from './notifications';
import Attention from './attention';
import Search from './search';
import { HasAccess, Avatar } from '../components';
import { withProps } from '../../../styled/styled-components';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import ChatItem from './chat/chat-item';
import ChatList from './chat/chat-list';
import { GET_CHATS } from './chat/queries';
import { fullName } from 'src/utils/helpers';

type Props = {
  containerHeight: number;
};

type DataProps = {
  // user: {
  //   id: string;
  //   firstName: string;
  //   lastName: string;
  //   image: string | null;
  //   gender?: string;
  // } | null;
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
  render() {
    const { containerHeight } = this.props;

    return (
      <Query query={LOGGED_IN_USER}>
        {({ data: { user }, loading }) => {
          if (loading) {
            return null;
          }

          return (
            <Container>
              <RightNode
                className="right-node"
                containerHeight={containerHeight}
              >
                {/* <LanguageSelector /> */}

                <HasAccess roles={[UserRole.Admin, UserRole.Manager]}>
                  <div>
                    <Search />
                  </div>
                </HasAccess>

                <HeaderAction className="header-action">
                  <Popup
                    trigger={
                      <TriggerAction>
                        <Icon name="far fa-comment-alt" />
                      </TriggerAction>
                    }
                    content={
                      <Query query={GET_CHATS} variables={{ userId: user.id }}>
                        {({ data: { allChats }, loading }) => {
                          if (loading) {
                            return null;
                          }
                          return (
                            <ChatList chats={allChats} loggedInUser={user} />
                          );
                        }}
                      </Query>
                    }
                  />
                </HeaderAction>

                <HeaderAction className="header-action" last>
                  <Query
                    query={UNREAD_NOTIFICATIONS}
                    variables={{ userId: user.id }}
                  >
                    {({ data, loading }) => {
                      if (loading) {
                        return null;
                      }

                      const unreadCount = data._allNotificationsMeta.count || 0;
                      const notifications = data.allNotifications;

                      return (
                        <Mutation
                          mutation={CLEAR_NOTIFICATION}
                          update={(proxy, { data }: any) => {
                            const variables = { userId: user.id };
                            const query = UNREAD_NOTIFICATIONS;

                            const {
                              allNotifications,
                              _allNotificationsMeta,
                            }: any = proxy.readQuery({
                              variables,
                              query,
                            });

                            const updatedAllNotifications = allNotifications.filter(
                              (item: any) =>
                                item.id !== data.updateNotification.id
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
                          }}
                        >
                          {clearNotification => (
                            <Popup
                              trigger={
                                <TriggerAction>
                                  {unreadCount > 0 && <Attention />}
                                  <Icon name="far fa-bell" />
                                </TriggerAction>
                              }
                              onClose={async () => {
                                const updates = notifications.map(
                                  (notification: any) => {
                                    return clearNotification({
                                      variables: { id: notification.id },
                                    });
                                  }
                                );

                                await Promise.all(updates);
                              }}
                              content={
                                <Notifications notifications={notifications} />
                              }
                            />
                          )}
                        </Mutation>
                      );
                    }}
                  </Query>
                </HeaderAction>

                <StyledDropdown
                  className="dropdown"
                  items={items}
                  animationIn="flipInY"
                  animationOut="flipOutY"
                  renderItem={(item: DropdownItem) => (
                    <Link to={item.to}>
                      <i className={item.icon} />
                      {item.label}
                    </Link>
                  )}
                >
                  <Avatar view="sm" avatar={user.image} name={fullName(user)} />
                </StyledDropdown>
              </RightNode>
            </Container>
          );
        }}
      </Query>
    );
  }
}
const Container = styled.div`
  position: relative;
  height: 100%;
  border-bottom: #edeef3 1px solid;
`;

const HeaderAction = withProps<{ last?: boolean }>(styled.div)`
border-left: 1px solid #edeef3;
padding: 0 20px;
margin: 0 !important;

${props =>
  props.last &&
  css`
    border-right: 1px solid #edeef3;
  `}
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
  margin: 0 10px;

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
    allNotifications(filter: { unread: true, user: { id: $userId } }) {
      id
      message
      notificationType
      unread
      icon
      image
      createdAt
      updatedAt
    }
    _allNotificationsMeta(filter: { unread: true, user: { id: $userId } }) {
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

export default Header;
