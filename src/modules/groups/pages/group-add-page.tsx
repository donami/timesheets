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

type Props = {
  userId: number;
  projects: Project[];
  loadGroupAddPage: () => any;
  createGroup: (data: Partial<Group>, userId: number, projectId: number) => any;
};

class GroupAddPage extends Component<Props> {
  componentWillMount() {
    this.props.loadGroupAddPage();
  }

  handleAdd = (data: Partial<Group>, projectId: number) => {
    this.props.createGroup(data, this.props.userId, projectId);
  };

  render() {
    const { projects } = this.props;

    return (
      <div>
        <PageHeader>Create new Group</PageHeader>

        <GroupForm onSubmit={this.handleAdd} projects={projects} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userId: getAuthedUserId(state),
  projects: getAuthedUserProjectsWhereAdmin(state),
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
