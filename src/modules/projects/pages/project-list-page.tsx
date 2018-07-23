import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Heading } from 'genui';

import { fetchProjects } from '../store/actions';
import { Project } from '../store/models';
import { ProjectList } from '../components';
import { getAuthedUserProjects } from '../../auth/store/selectors';

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
      <div>
        <Heading as="h1" dividing="true">
          Projects
        </Heading>
        <ProjectList projects={projects} />;
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  projects: getAuthedUserProjects(state),
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
