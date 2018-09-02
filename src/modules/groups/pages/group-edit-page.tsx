import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { GroupForm } from '../components';
import { PageHeader } from '../../common';
import { Group } from '../store/models';
import { updateGroup } from '../store/actions';
import {
  getAuthedUserId,
  getAuthedUserProjectsWhereAdmin,
} from '../../auth/store/selectors';
import { Project } from '../../projects/store/models';
import { getTimesheetTemplates } from '../../timesheets/store/selectors';
import { TimesheetTemplateItem } from '../../timesheets/store/models';

type Props = {
  userId: number;
  group: Group;
  projects: Project[];
  templates: TimesheetTemplateItem[];
  project: Project;
  updateGroup(groupId: number, group: Group): any;
  // createGroup: (data: Partial<Group>, userId: number, projectId: number) => any;
};

class GroupEditPage extends Component<Props> {
  handleSave = (data: Partial<Group>, projectId: number) => {
    const groupData = Object.assign({}, data, {
      timesheetTemplate: data.timesheetTemplate
        ? data.timesheetTemplate.id
        : undefined,
    });

    if (!groupData.id) {
      return;
    }

    this.props.updateGroup(groupData.id, groupData as any);
  };

  render() {
    const { projects, templates, group, project } = this.props;

    return (
      <div>
        <PageHeader>Update Group</PageHeader>

        <GroupForm
          onSubmit={this.handleSave}
          projects={projects}
          templates={templates}
          initialValues={group}
          project={project}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userId: getAuthedUserId(state),
  projects: getAuthedUserProjectsWhereAdmin(state),
  templates: getTimesheetTemplates(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      updateGroup,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupEditPage);
