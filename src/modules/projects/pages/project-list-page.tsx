import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProjects } from '../store/selectors';
import { fetchProjects } from '../store/actions';
import { Project } from '../store/models';
import { ProjectList } from '../components';
import { HasAccess } from '../../common';
import { UserRole } from '../../users/store/models';

export interface ProjectListPageProps {
  fetchProjects: () => any;
  projects: Project[];
}

class ProjectListPage extends React.Component<ProjectListPageProps> {
  componentWillMount() {
    this.props.fetchProjects();
  }

  render() {
    const { projects } = this.props;

    return (
      <HasAccess roles={[UserRole.Manager, UserRole.Admin]}>
        <ProjectList projects={projects} />
      </HasAccess>
    );
  }
}

const mapStateToProps = (state: any) => ({
  projects: getProjects(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchProjects,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectListPage);
