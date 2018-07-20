import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import { selectUser, fetchUserById } from '../store/actions';
import { UserInfo, UserGroups } from '../components';
import {
  getSelectedUser,
  getSelectedUserGroups,
  getSelectedUserGroup,
  getSelectedUserGroupTemplate,
} from '../store/selectors';
import { User } from '../store/models';
import { Group } from '../../groups/store/models';
import { getGroups } from '../../groups/store/selectors';
import { fetchGroups, updateGroupMember } from '../../groups/store/actions';
import { Box } from '../../ui';
import { TimesheetTemplateItem } from '../../timesheets/store/models';
import {
  generateTimesheets,
  confirmTemplates,
} from '../../timesheets/store/actions';
import { getGeneratedTimesheets } from '../../timesheets/store/selectors';
import { fetchProjects } from '../../projects/store/actions';
import { Project } from '../../projects/store/models';
import { getSelectedUserProjects } from '../../common/store/selectors';

type Props = {
  match: any;
  selectUser: (userId: number) => any;
  fetchUserById: (userId: number) => any;
  generateTimesheets: (
    from: string,
    to: string,
    projectId: number,
    template: TimesheetTemplateItem
  ) => any;
  fetchGroups: () => any;
  fetchProjects: () => any;
  updateGroupMember: (groupIds: number[], userId: number) => any;
  confirmTemplates: (timesheets: any) => any;
  user: User;
  groups: Group[];
  projects: Project[];
  allGroups: Group[];
  group: Group;
  template: TimesheetTemplateItem;
  generated: any;
};

class UserViewPage extends React.Component<Props> {
  generateForm: HTMLFormElement | null;

  componentWillMount() {
    const {
      match,
      selectUser,
      fetchUserById,
      fetchGroups,
      fetchProjects,
    } = this.props;

    fetchGroups();
    fetchProjects();

    if (match && match.params.id) {
      selectUser(+match.params.id);
      fetchUserById(+match.params.id);
    }
  }

  handleUpdateGroups = (groupIds: number[]) => {
    // TODO:
    console.log(groupIds);
    this.props.updateGroupMember(groupIds, this.props.user.id);
  };

  handleGenerateTimesheets = (e: any) => {
    e.preventDefault();
    const { from, to, project } = this.generateForm as any;

    this.props.generateTimesheets(
      from.value,
      to.value,
      +project.value,
      this.props.template
    );
  };

  handleConfirmTemplates = (e: any) => {
    this.props.confirmTemplates(this.props.generated);
  };

  render() {
    const {
      user,
      groups,
      allGroups,
      template,
      generated,
      projects,
    } = this.props;

    return (
      <div>
        <UserInfo user={user} />

        <UserGroups
          groups={groups}
          allGroups={allGroups}
          onSubmit={this.handleUpdateGroups}
        />

        <Box title="Generate new timesheets">
          {template && (
            <React.Fragment>
              <h4>Generate timesheets using the template: {template.name}</h4>

              {generated.length > 0 && (
                <div>
                  <h4>Generated Timesheets</h4>

                  {generated.map((month: any, index: any) => (
                    <div key={index}>{month.month}</div>
                  ))}

                  <div>
                    <Button color="green" onClick={this.handleConfirmTemplates}>
                      Confirm
                    </Button>
                    <Button>Cancel</Button>
                  </div>
                </div>
              )}

              {generated.length === 0 && (
                <form
                  onSubmit={this.handleGenerateTimesheets}
                  ref={form => {
                    this.generateForm = form;
                  }}
                >
                  <label>From:</label>
                  <select name="from">
                    <option value="2018-06-01">Jun 2018</option>
                  </select>

                  <label>To:</label>
                  <select name="to">
                    <option value="2018-12-01">Dec 2018</option>
                  </select>

                  <div>
                    <label>Project:</label>
                    <select name="project">
                      {projects.map(project => (
                        <option value={project.id} key={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button type="submit" color="blue">
                    Generate
                  </Button>
                </form>
              )}
            </React.Fragment>
          )}

          {!template && (
            <React.Fragment>
              In order to generate timesheets, the user needs to be attached to
              a group which has a timesheet template assigned to it.
            </React.Fragment>
          )}
        </Box>
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
  template: getSelectedUserGroupTemplate(state),
  generated: getGeneratedTimesheets(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectUser,
      updateGroupMember,
      fetchUserById,
      fetchGroups,
      fetchProjects,
      generateTimesheets,
      confirmTemplates,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserViewPage);
