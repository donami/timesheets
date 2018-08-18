import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Dropdown, Message } from 'genui';

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
import styled from '../../../styled/styled-components';
import { Link } from 'react-router-dom';

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
    const { user, groups, projects, timesheets, group, disabled } = this.props;

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
          <Message negative>
            <Message.Header>Disabled</Message.Header>
            <p>This user has been disabled</p>
          </Message>
        )}

        <Row>
          <Column sm={6}>
            <UserInfo user={user} />
          </Column>
          <Column sm={6}>
            <UserGroups
              groups={groups}
              onSubmit={this.handleUpdateGroups}
              initialSelectedGroup={group ? group.id : 0}
            />
          </Column>
        </Row>

        <Row>
          <Column sm={6}>
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
          </Column>
          <Column sm={6}>
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
