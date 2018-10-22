import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Icon } from 'genui';
import gql from 'graphql-tag';

import styled, { withProps, css } from '../../../styled/styled-components';
import { PageHeader } from '../../common';
import { LOGGED_IN_USER } from '../store/queries';
import { dateFormat } from '../../../utils/calendar';
import { NotificationPageList } from '../../common/components/notifications';

class NotificationsPage extends Component {
  clearNotifications = async (
    notifications: any[],
    mutation: (options: any) => void
  ) => {
    const updates = notifications
      .filter(notification => notification.unread)
      .map((notification: any) => {
        return mutation({
          variables: { id: notification.id },
        });
      });

    await Promise.all(updates);
  };

  render() {
    return (
      <Query query={LOGGED_IN_USER}>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }
          const loggedInUser = data.user;

          return (
            <Query
              query={GET_NOTIFICATIONS}
              variables={{ userId: loggedInUser.id }}
            >
              {({
                data: { allNotifications, _allNotificationsMeta },
                loading,
                fetchMore,
              }) => {
                if (loading) {
                  return null;
                }

                return (
                  <div>
                    <PageHeader>Notifications</PageHeader>

                    <Container>
                      <TopMenuActions>
                        <Mutation mutation={CLEAR_NOTIFICATION}>
                          {clearNotification => (
                            <a
                              onClick={() =>
                                this.clearNotifications(
                                  allNotifications,
                                  clearNotification
                                )
                              }
                            >
                              Mark all as read
                            </a>
                          )}
                        </Mutation>
                      </TopMenuActions>
                      <NotificationPageList
                        totalCount={_allNotificationsMeta.count}
                        notifications={allNotifications}
                        onLoadMore={() => {
                          fetchMore({
                            query: GET_NOTIFICATIONS,
                            variables: {
                              after:
                                allNotifications[allNotifications.length - 1]
                                  .id,
                              userId: loggedInUser.id,
                            },
                            updateQuery: (
                              previousResult,
                              { fetchMoreResult }
                            ) => {
                              return {
                                allNotifications: [
                                  ...previousResult.allNotifications,
                                  ...fetchMoreResult.allNotifications,
                                ],
                                _allNotificationsMeta:
                                  fetchMoreResult._allNotificationsMeta,
                              };
                            },
                          });
                        }}
                      />
                    </Container>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

const GET_NOTIFICATIONS = gql`
  query($userId: ID!, $after: String) {
    allNotifications(
      after: $after
      first: 10
      filter: { user: { id: $userId } }
    ) {
      id
      message
      notificationType
      unread
      icon
      image
      createdAt
      updatedAt
    }
    _allNotificationsMeta(filter: { user: { id: $userId } }) {
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

export default NotificationsPage;

const Container = styled.div`
  background: #fff;
  border: #e8e8e8 1px solid;
  border-radius: 5px;
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
`;

const TopMenuActions = styled.div`
  text-align: right;
  font-size: 0.9em;
  color: #8d919a;
  padding: 10px;
  border-bottom: #e8e8e8 1px solid;

  a {
    color: #8d919a;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const Item = withProps<{ unread?: boolean }>(styled.div)`
  display: flex;
  border-bottom: #e8e8e8 1px solid;
  padding: 20px;
  align-items: center;

  background: ${({ unread }) => (unread ? '#f7f5fc' : '#fff')};
`;

const IconItem = styled.div`
  flex: 1;
  max-width: 10%;
`;
const DescriptionItem = styled.div`
  flex: 1;
`;
const MetaItem = styled.div`
  flex: 1;
  text-align: right;
  color: #b0b4bb;
  font-size: 0.8em;
`;

const LoadMoreItem = styled.a`
  text-align: center;
  padding: 20px;
  display: block;
  transition: all 300ms ease-in-out;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 300;

  &:hover {
    background: #f7f5fc;
  }
`;
