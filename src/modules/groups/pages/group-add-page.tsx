import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { GroupForm } from '../components';
import { PageHeader } from '../../common';
import { Group } from '../store/models';
import { createGroup, loadGroupAddPage } from '../store/actions';
import {
  getAuthedUserId,
  getAuthedUserProjectsWhereAdmin,
} from '../../auth/store/selectors';
import { Project } from '../../projects/store/models';
import { getTimesheetTemplates } from '../../timesheets/store/selectors';
import { TimesheetTemplateItem } from '../../timesheets/store/models';

type Props = {
  userId: number;
  projects: Project[];
  templates: TimesheetTemplateItem[];
  loadGroupAddPage: () => any;
  createGroup: (data: Partial<Group>, userId: number, projectId: number) => any;
};

class GroupAddPage extends Component<Props> {
  componentWillMount() {
    this.props.loadGroupAddPage();
  }

  handleAdd = (data: Partial<Group>, projectId: number) => {
    const newGroupData = Object.assign({}, data, {
      timesheetTemplate: data.timesheetTemplate
        ? data.timesheetTemplate.id
        : undefined,
    });

    this.props.createGroup(newGroupData, this.props.userId, projectId);
  };

  render() {
    const { projects, templates } = this.props;

    return (
      <div>
        <PageHeader>Create new Group</PageHeader>

        <GroupForm
          onSubmit={this.handleAdd}
          projects={projects}
          templates={templates}
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
      createGroup,
      loadGroupAddPage,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupAddPage);
