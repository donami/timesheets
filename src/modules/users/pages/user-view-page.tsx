import * as React from 'react';
import { Button, Dropdown, Message, Icon } from 'genui';
import gql from 'graphql-tag';
import { History } from 'history';
import { Link, Switch, Route } from 'react-router-dom';
import { compose, withHandlers, branch, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';

import { UserInfo, UserGroups, EditUser, EditUserStatus } from '../components';
import { Group } from '../../groups/store/models';
import { Box, Row, Column, PageLoader } from '../../ui';
import { TimesheetGenerator, TimesheetList } from '../../timesheets';
import { PageHeader, Translate, Avatar } from '../../common';
import styled, { withProps, css } from '../../../styled/styled-components';
import { DISABLE_USER, ENABLE_USER } from '../store/mutations';
import CreateChat from '../../common/components/chat/create-chat';
import { fullName } from 'src/utils/helpers';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { CompanyContext } from '../../common/components/routing';

type DropdownItem = {
  label: string;
  icon: string;
  onClick?: any;
  to?: string;
};

type Props = {
  match: any;
  selectUser: (userId: number) => any;
  updateGroupMember: (groupId: number, userId: number) => any;
  groups: Group[];
  history: History;
  group: Group;
};
type DataProps = {
  user: any;
  groups: any[];
  projects: any[];
  authedUser: any;
  disableUser(options: any): any;
  enableUser(options: any): any;
};
type HandlerProps = {
  onEnableUser(): any;
  onDisableUser(): any;
};
type EnhancedProps = Props & DataProps & HandlerProps;

class UserViewPage extends React.Component<EnhancedProps> {
  handleUpdateGroups = (groupId: string) => {
    // this.props.updateGroupMember(groupId, this.props.user.id);
  };

  render() {
    const {
      user,
      groups,
      projects,
      history,
      match,
      onEnableUser,
      onDisableUser,
    } = this.props;

    if (!user) {
      return null;
    }

    const items: DropdownItem[] = [
      {
        label: 'Edit',
        icon: 'fas fa-pencil-alt',
        onClick: (userId: string) =>
          this.props.history.push(`/user/${userId}/edit`),
      },
    ];

    if (user.disabled) {
      items.push({
        label: 'Enable user',
        icon: 'fas fa-unlock',
        onClick: onEnableUser,
      });
    } else {
      items.push({
        label: 'Disable user',
        icon: 'fas fa-ban',
        onClick: onDisableUser,
      });
    }

    return (
      <div>
        <PageHeader
          options={() => (
            <StyledDropdown
              className="dropdown"
              items={items}
              renderItem={(item: DropdownItem) => {
                if (item.to) {
                  return (
                    <Link to={item.to}>
                      <i className={item.icon} />
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <div onClick={() => item.onClick(user.id)}>
                    <i className={item.icon} />
                    {item.label}
                  </div>
                );
              }}
            >
              <Button icon="fas fa-cog" />
            </StyledDropdown>
          )}
        >
          <Translate text="users.labels.USER_PROFILE" />:{' '}
          {`${user.firstName} ${user.lastName}`}
        </PageHeader>

        {user.disabled && (
          <Row>
            <Column xs={12}>
              <Message negative>
                <Message.Header>User Disabled</Message.Header>
                <p>This user has been disabled</p>
              </Message>
            </Column>
          </Row>
        )}

        <Row>
          <Column xs={12} sm={3} md={2}>
            <UserLeftColumn>
              <UserCard>
                <UserCardActions>
                  <CreateChat history={this.props.history} otherUser={user}>
                    <span className="fa-stack fa-2x">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fas fa-envelope fa-stack-1x fa-inverse" />
                    </span>
                  </CreateChat>
                </UserCardActions>
                <Avatar view="lg" avatar={user.image} name={fullName(user)} />

                <h3>{`${user.firstName} ${user.lastName}`}</h3>
              </UserCard>

              <UserNavigation>
                <ul>
                  <UserNavigationLink active={!match.params.page}>
                    <Link to={`/user/${user.id}`}>
                      <Icon name="fas fa-clock" fixedWidth />
                      Timesheets
                    </Link>
                  </UserNavigationLink>
                  <UserNavigationLink
                    active={match.params.page === 'generator'}
                  >
                    <Link to={`/user/${user.id}/generator`}>
                      <Icon name="fas fa-code-branch" fixedWidth />
                      Generator
                    </Link>
                  </UserNavigationLink>
                  <UserNavigationLink active={match.params.page === 'details'}>
                    <Link to={`/user/${user.id}/details`}>
                      <Icon name="fas fa-info-circle" fixedWidth />
                      Details
                    </Link>
                  </UserNavigationLink>
                </ul>
              </UserNavigation>
            </UserLeftColumn>
          </Column>

          <Column xs={12} sm={9} md={10}>
            <Switch>
              <Route
                path={`/user/:id/generator`}
                render={props => (
                  <Box
                    title={() => (
                      <Translate text="timesheet.labels.GENERATE_NEW_TIMESHEETS" />
                    )}
                  >
                    <CompanyContext.Consumer>
                      {({ company }: any) => (
                        <TimesheetGenerator
                          history={props.history}
                          userId={user.id}
                          group={user.group}
                          companyId={company.id}
                          userProjectId={
                            (user.projectMember || []).map(
                              (member: any) => member.project.id
                            )[0]
                          }
                          projects={(user.projectMember || []).map(
                            (member: any) => member.project
                          )}
                          previousTimesheets={user.timesheets}
                        />
                      )}
                    </CompanyContext.Consumer>
                  </Box>
                )}
              />
              <Route
                path={`/user/:id/details`}
                render={props => (
                  <>
                    <UserInfo user={user} />
                    <UserGroups
                      user={user}
                      groups={groups}
                      onSubmit={this.handleUpdateGroups}
                      initialSelectedGroup={user.group ? user.group.id : ''}
                    />
                  </>
                )}
              />
              <Route
                path={`/user/:id/edit`}
                render={props => (
                  <>
                    <EditUser
                      {...props}
                      user={user}
                      userProject={(user.projectMember || []).map(
                        (member: any) => member.project
                      )}
                      projects={projects}
                    />
                    <h3>Change user type</h3>
                    <EditUserStatus user={user} />
                  </>
                )}
              />
              <Route
                path={`/user/:id`}
                render={props => (
                  <Box
                    title={() => (
                      <Translate text="timesheet.labels.TIMESHEETS_FOR_USER" />
                    )}
                  >
                    <TimesheetList
                      items={user.timesheets || []}
                      disableFilter={false}
                      noItemsText="There is no generated timesheets for this user."
                    />
                  </Box>
                )}
              />
            </Switch>
          </Column>
        </Row>
      </div>
    );
  }
}

export const USER_VIEW_PAGE_QUERY = gql`
  query($id: ID!, $companyId: ID!) {
    User(id: $id) {
      __typename
      id
      firstName
      lastName
      disabled
      email
      role
      image {
        __typename
        id
        name
        url
      }
      timesheets {
        __typename
        id
        status
        periodStart
      }
      projectMember {
        id
        role
        project {
          id
          name
        }
      }
      group {
        id
        name
        template {
          id
          name
          hoursDays {
            id
            break
            holiday
            inTime
            outTime
            totalHours
          }
        }
      }
    }
    allGroups(filter: { project: { company: { id: $companyId } } }) {
      id
      name
      project {
        id
        name
      }
    }
    allProjects(filter: { company: { id: $companyId } }) {
      id
      name
    }
  }
`;

const enhance = compose(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      authedUser: data.user,
    }),
  }),
  graphql(USER_VIEW_PAGE_QUERY, {
    options: (props: any) => ({
      variables: {
        id: props.match.params.id,
        companyId: props.authedUser.company.id,
      },
    }),
    props: ({ data }: any) => ({
      loading: data.loading,
      groups: data.allGroups || [],
      projects: data.allProjects || [],
      user: data.User,
    }),
  }),
  graphql(DISABLE_USER, {
    name: 'disableUser',
  }),
  graphql(ENABLE_USER, {
    name: 'enableUser',
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    // onRemove: ({ deleteUser }) => (userId: string) => {
    //   deleteUser({ variables: { id: userId } });
    // },
    onDisableUser: ({ disableUser, user }) => () => {
      disableUser({ variables: { id: user.id } });
    },
    onEnableUser: ({ enableUser, user }) => () => {
      enableUser({ variables: { id: user.id } });
    },
  }),
  branch(({ loading }) => loading, renderComponent(PageLoader))
);

export default enhance(UserViewPage);

const StyledDropdown = withProps<any>(styled(Dropdown))`
  line-height: normal;
  align-self: center;

  .g-dropdown-menu {
    left: -80px;
    top: 83%;
    i {
      margin-right: 0.5em;
    }
  }
`;

const UserCard = styled.div`
  text-align: center;

  h3 {
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 300;
  }

  img {
    max-width: 90px;
  }

  a {
    color: #9ea1a8;
    text-decoration: none;

    &:hover {
      color: ${props => props.theme.primaryColor};
    }
  }

  margin-bottom: 20px;
`;

const UserCardActions = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;

  a {
    color: inherit;

    &:hover {
      opacity: 0.8;
    }
  }

  span {
    font-size: 1em;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const UserLeftColumn = styled.div`
  background: #fff;

  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
`;

const UserNavigation = styled.div`
  border-top: #e8e8e8 1px solid;
  border-bottom: #e8e8e8 1px solid;
  padding: 10px 0;
  margin: 20px 0;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const UserNavigationLink = withProps<{ active: boolean }, HTMLLIElement>(
  styled.li
)`
  a {
    color: inherit;
    text-decoration: none;
    border-left: 3px solid transparent;
    padding: 10px;
    display: block;
    opacity: 0.8;

    &:hover {
      background-color: #f8fafb;
      border-left: 3px solid ${props => props.theme.primaryColor};
      opacity: 1;
    }

    i {
      width: 30px;
      opacity: 0.5;
    }

    ${({ active }) =>
      active &&
      css`
        opacity: 1;
      `}
  }
`;
