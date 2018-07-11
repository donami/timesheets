import * as React from 'react';

import { Box } from '../../ui';
import { Project } from '../store/models';

export interface ProjectInfoProps {
  project: Project;
}

const ProjectInfo: React.StatelessComponent<ProjectInfoProps> = ({ project }) =>
  project ? (
    <Box title="View Project">
      <strong>ID: {project.id}</strong> <br />
      <strong>Email: {project.name}</strong> <br />
    </Box>
  ) : null;

export default ProjectInfo;
