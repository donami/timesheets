import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'genui';

import { Project } from '../store/models';

export interface ProjectListProps {
  projects: Project[];
}

class ProjectList extends React.Component<ProjectListProps> {
  render() {
    const { projects } = this.props;

    const tableItems = projects.map(project => ({
      id: <Link to={`/project/${project.id}`}>{project.id}</Link>,
      name: project.name,
    }));

    return (
      <div>
        <Table headings={['ID', 'Name']} items={tableItems} />
      </div>
    );
  }
}

export default ProjectList;
