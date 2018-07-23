import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectUser, fetchUserById } from '../store/actions';
import { UserInfo, UserGroups } from '../components';
import {
  getSelectedUser,
  getSelectedUserGroups,
  getSelectedUserGroup,
} from '../store/selectors';
import { User } from '../store/models';
import { Group } from '../../groups/store/models';
import { getGroups } from '../../groups/store/selectors';
import { updateGroupMember } from '../../groups/store/actions';
import { Box } from '../../ui';
import {
  generateTimesheets,
  confirmTemplates,
} from '../../timesheets/store/actions';
import { Project } from '../../projects/store/models';
import { getSelectedUserProjects } from '../../common/store/selectors';
import { TimesheetGenerator } from '../../timesheets';

type Props = {
  match: any;
  selectUser: (userId: number) => any;
  fetchUserById: (userId: number) => any;
  updateGroupMember: (groupIds: number[], userId: number) => any;
  user: User;
  groups: Group[];
  projects: Project[];
  allGroups: Group[];
  group: Group;
};

class UserViewPage extends React.Component<Props> {
  componentWillMount() {
    const { match, selectUser, fetchUserById } = this.props;

    if (match && match.params.id) {
      selectUser(+match.params.id);
      fetchUserById(+match.params.id);
    }
  }

  handleUpdateGroups = (groupIds: number[]) => {
    // TODO:
    this.props.updateGroupMember(groupIds, this.props.user.id);
  };

  render() {
    const { user, groups, allGroups, projects } = this.props;

    return (
      <div>
        <UserInfo user={user} />

        <UserGroups
          groups={groups}
          allGroups={allGroups}
          onSubmit={this.handleUpdateGroups}
        />

        {user &&
          user.id && (
            <Box title="Generate new timesheets">
              <TimesheetGenerator userId={user.id} projects={projects} />
            </Box>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: getSelectedUser(state),
  groups: getSelectedUserGroups(state),
  projects: getSelectedUserProjects(state),
  allGroups: getGroups(state),
  group: getSelectedUserGroup(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectUser,
      updateGroupMember,
      fetchUserById,
      generateTimesheets,
      confirmTemplates,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserViewPage);
