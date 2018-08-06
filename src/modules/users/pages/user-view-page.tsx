import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectUser } from '../store/actions';
import { UserInfo, UserGroups } from '../components';
import { getSelectedUser, getSelectedUserGroup } from '../store/selectors';
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
import { PageHeader, Translate } from '../../common';

type Props = {
  match: any;
  selectUser: (userId: number) => any;
  updateGroupMember: (groupId: number, userId: number) => any;
  user: User;
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

  render() {
    const { user, groups, projects, timesheets, group } = this.props;

    if (!user) {
      return null;
    }

    return (
      <div>
        <PageHeader>
          <Translate text="users.labels.USER_PROFILE" />: {user.fullName}
        </PageHeader>

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
              <TimesheetGenerator userId={user.id} projects={projects} />
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

// TODO: translate noTimesheetsText in "Timesheets fr user"

const mapStateToProps = (state: any) => ({
  user: getSelectedUser(state),
  projects: getSelectedUserProjects(state),
  groups: getGroups(state),
  group: getSelectedUserGroup(state),
  timesheets: getSelectedUserTimesheets(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectUser,
      updateGroupMember,
      generateTimesheets,
      confirmTemplates,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserViewPage);
