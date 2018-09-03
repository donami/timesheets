import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, TableBuilder, Table } from 'genui';

import { fetchProjects } from '../store/actions';
import { Project } from '../store/models';
// import { ProjectList } from '../components';
import { getAuthedUserProjects } from '../../auth/store/selectors';
import { PageHeader, Translate } from '../../common';
import { Link } from 'react-router-dom';

export interface ProjectListPageProps {
  fetchProjects: () => any;
  projects: Project[];
}

class ProjectListPage extends React.Component<ProjectListPageProps> {
  componentWillMount() {
    this.props.fetchProjects();
  }

  handleRemove = (projectId: number) => {
    // TODO: implement
  };

  render() {
    const { projects } = this.props;

    return (
      <div>
        <PageHeader
          options={() => (
            <Button to="/projects/add" color="purple">
              <Translate text="projects.labels.NEW_PROJECT" />
            </Button>
          )}
        >
          <Translate text="projects.labels.PROJECTS" />
        </PageHeader>

        <TableBuilder
          selectable
          items={projects}
          itemsOptions={(item: any) => [
            {
              label: 'View project',
              icon: 'fas fa-eye',
              to: `/project/${item.id}`,
            },
          ]}
          renderHeaders={
            <>
              <Table.HeaderCell sortableBy="id">ID</Table.HeaderCell>
              <Table.HeaderCell sortableBy="name">Name</Table.HeaderCell>
              <Table.HeaderCell length="5%" />
              <Table.HeaderCell length="5%" />
              <Table.HeaderCell length="5%" />
            </>
          }
          renderItem={(item: any) => (
            <>
              <Table.Cell>
                <Link to={`/project/${item.id}`}>#{item.id}</Link>
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>

              <Table.Cell
                option={{
                  icon: 'fas fa-pencil-alt',
                  to: `/project/${item.id}/edit`,
                }}
              />
              <Table.Cell
                option={{
                  icon: 'fas fa-trash',
                  onClick: () => this.handleRemove(item.id),
                }}
              />
            </>
          )}
        />

        {/* <ProjectList projects={projects} /> */}
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
