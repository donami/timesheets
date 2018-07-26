import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProjectForm } from '../components';
import { PageHeader } from '../../common';
import { Project } from '../store/models';
import { createProject } from '../store/actions';
import { getAuthedUserId } from '../../auth/store/selectors';

type Props = {
  userId: number;
  createProject: (data: Partial<Project>, userId: number) => any;
};

class ProjectAddPage extends Component<Props> {
  handleAdd = (data: Partial<Project>) => {
    this.props.createProject(data, this.props.userId);
  };

  render() {
    return (
      <div>
        <PageHeader>Create new project</PageHeader>

        <ProjectForm onSubmit={this.handleAdd} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userId: getAuthedUserId(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      createProject,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectAddPage);
