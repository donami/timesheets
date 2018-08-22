import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dropdown, Message, Icon } from 'genui';

import { selectUser, disableUser, enableUser } from '../store/actions';
import { UserInfo, UserGroups } from '../components';
import {
  getSelectedUser,
  getSelectedUserGroup,
  getSelectedUserDisabled,
} from '../store/selectors';
import { User } from '../store/models';
import { Group } from '../../groups/store/models';
import { getGroups } from '../../groups/store/selectors';
import { updateGroupMember } from '../../groups/store/actions';
import { Box, Row, Column } from '../../ui';
import {
  generateTimesheets,
  confirmTemplates,
} from '../../timesheets/store/actions';
import { Project } from '../../projects/store/models';
import {
  getSelectedUserProjects,
  getSelectedUserTimesheets,
} from '../../common/store/selectors';
import { TimesheetGenerator, TimesheetList } from '../../timesheets';
import { TimesheetItem } from '../../timesheets/store/models';
import { PageHeader, Translate, Avatar } from '../../common';
import styled, { withProps, css } from '../../../styled/styled-components';
import { Link, Switch, Route } from 'react-router-dom';

type DropdownItem = {
  label: string;
  icon: string;
  onClick: any;
};

type Props = {
  match: any;
  selectUser: (userId: number) => any;
  disableUser: (userId: number) => any;
  enableUser: (userId: number) => any;
  updateGroupMember: (groupId: number, userId: number) => any;
  user: User;
  disabled: boolean;
  projects: Project[];
  groups: Group[];
  group: Group;
  timesheets: TimesheetItem[];
};

class UserViewPage extends React.Component<Props> {
  componentWillMount() {
    const { match, selectUser } = this.props;

    if (match && match.params.id) {
      selectUser(+match.params.id);
    }
  }

  handleUpdateGroups = (groupId: number) => {
    this.props.updateGroupMember(groupId, this.props.user.id);
  };

  handleDisableUser = () => {
    this.props.disableUser(this.props.user.id);
  };

  handleEnableUser = () => {
    this.props.enableUser(this.props.user.id);
  };

  render() {
    const {
      user,
      groups,
      projects,
      timesheets,
      group,
      disabled,
      match,
    } = this.props;

    if (!user) {
      return null;
    }

    const items: DropdownItem[] = [];

    if (disabled) {
      items.push({
        label: 'Enable user',
        icon: 'fas fa-unlock',
        onClick: this.handleEnableUser,
      });
    } else {
      items.push({
        label: 'Disable user',
        icon: 'fas fa-ban',
        onClick: this.handleDisableUser,
      });
    }

    return (
      <div>
        <PageHeader
          options={() => (
            <StyledDropdown
              className="dropdown"
              items={items}
              renderItem={(item: DropdownItem) => (
                <div onClick={item.onClick}>
                  <i className={item.icon} />
                  {item.label}
                </div>
              )}
            >
              <Button icon="fas fa-cog" />
            </StyledDropdown>
          )}
        >
          <Translate text="users.labels.USER_PROFILE" />: {user.fullName}
        </PageHeader>

        {disabled && (
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
          <Column sm={3} md={2}>
            <UserLeftColumn>
              <UserCard>
                <Avatar view="lg" avatar={user.image} />

                <h3>{user.fullName}</h3>
                <Link to="/profile/edit">Edit Profile</Link>
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

          <Column sm={9} md={10}>
            <Switch>
              <Route
                path={`/user/:id/generator`}
                render={props => (
                  <Box
                    title={() => (
                      <Translate text="timesheet.labels.GENERATE_NEW_TIMESHEETS" />
                    )}
                  >
                    <TimesheetGenerator
                      userId={user.id}
                      projects={projects}
                      previousTimesheets={timesheets}
                    />
                  </Box>
                )}
              />
              <Route
                path={`/user/:id/details`}
                render={props => (
                  <>
                    <UserInfo user={user} />
                    <UserGroups
                      groups={groups}
                      onSubmit={this.handleUpdateGroups}
                      initialSelectedGroup={group ? group.id : 0}
                    />
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
                      timesheets={timesheets || []}
                      disableFilter={true}
                      noTimesheetsText="There is no generated timesheets for this user."
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

const mapStateToProps = (state: any) => ({
  user: getSelectedUser(state),
  projects: getSelectedUserProjects(state),
  groups: getGroups(state),
  group: getSelectedUserGroup(state),
  timesheets: getSelectedUserTimesheets(state),
  disabled: getSelectedUserDisabled(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectUser,
      updateGroupMember,
      generateTimesheets,
      confirmTemplates,
      disableUser,
      enableUser,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserViewPage);

const StyledDropdown = styled(Dropdown)`
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
  padding: 20px;

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
      color: #763ffe;
    }
  }

  margin-bottom: 20px;
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
      border-left: 3px solid #763ffe;
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
