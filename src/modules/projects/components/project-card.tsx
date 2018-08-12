import * as React from 'react';
import { Icon } from 'genui';

import { Project } from '../store/models';
import styled from '../../../styled/styled-components';
import { parseDate } from '../../../utils/helpers';

type Props = {
  project: Project;
};

const ProjectCard: React.SFC<Props> = ({ project }) =>
  project ? (
    <Container>
      <Top>
        <span
          className="fa-stack fa-1x"
          style={{ marginRight: 10, color: '#7b42ff' }}
        >
          <i className="fas fa-square fa-stack-2x" />
          <i className="fas fa-flag fa-stack-1x fa-inverse" />
        </span>
        <span>{project.name}</span>
      </Top>
      <Info>
        <InfoItem>
          <Icon name="fas fa-id-card" /> ID: {project.id}
        </InfoItem>
        <InfoItem>
          <Icon name="fas fa-user" /> Members: {project.members.length}
        </InfoItem>
        <InfoItem>
          <Icon name="fas fa-calendar" />{' '}
          {`Created: ${parseDate(project.createdAt, 'D MMM, YYYY')}`}
        </InfoItem>
        <InfoItem>
          <Icon name="fas fa-briefcase" /> Groups: {project.groups.length}
        </InfoItem>
      </Info>
    </Container>
  ) : null;

const Container = styled.div`
  background: #fff;
  border-radius: 3px;
  margin-bottom: 10px;
`;

const Top = styled.div`
  padding: 20px;
  border-bottom: #f6f8f7 1px solid;
  display: flex;
  line-height: 32px;
  font-size: 1.2em;
`;

const Info = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  font-weight: 300;
  padding: 10px 20px;
  color: #343740;

  i,
  svg {
    color: #e4e4ee;
    width: 20px;
  }
`;

export default ProjectCard;
