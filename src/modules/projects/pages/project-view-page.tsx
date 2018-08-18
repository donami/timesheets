import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Badge } from 'genui';

import { selectProject } from '../store/actions';
import {
  ProjectCard,
  ProjectMemberList,
  ProjectGroupsList,
} from '../components';
import {
  getSelectedProject,
  getSelectedProjectTimesheets,
  getSelectedProjectMembers,
  getSelectedProjectId,
} from '../store/selectors';
import { Project, ProjectMember } from '../store/models';
import { TimesheetItem, TimesheetStatus } from '../../timesheets/store/models';
import { TimesheetList } from '../../timesheets';
import { Box, Row, Column } from '../../ui';
import styled from '../../../styled/styled-components';
import { Group } from '../../groups/store/models';
import { getSelectedProjectGroups } from '../../common/store/selectors';

export interface ProjectViewPageProps {
  match: any;
  timesheets: TimesheetItem[];
  selectProject: (projectId: number) => any;
  projectId: number;
  project: Project;
  groups: Group[];
  projectMembers: ProjectMember[];
}

class ProjectViewPage extends React.Component<ProjectViewPageProps> {
  componentWillMount() {
    const { match, selectProject, projectId } = this.props;

    if (match && match.params.id && +match.params.id !== projectId) {
      selectProject(+match.params.id);
    }
  }

  render() {
    const { project, timesheets, projectMembers, groups } = this.props;

    const timesheetsWaitingForApproval = timesheets.filter(
      (timesheet: TimesheetItem) =>
        timesheet.status === TimesheetStatus.WaitingForApproval
    );

    return (
      <div>
        <Row>
          <Column sm={3}>
            <ProjectCard project={project} />
          </Column>
          <Column sm={9}>
            <Box
              title={() => (
                <div>
                  <BoxTitleWithBadge>
                    Timesheets waiting for approval
                  </BoxTitleWithBadge>
                  <Badge color="purple">
                    {timesheetsWaitingForApproval.length}
                  </Badge>
                </div>
              )}
            >
              <TimesheetList
                noTimesheetsText="No timesheets are waiting for approval"
                timesheets={timesheetsWaitingForApproval}
              />
            </Box>
          </Column>
        </Row>

        <Box title="All timesheets">
          <TimesheetList timesheets={timesheets} />
        </Box>

        <Box
          title={() => (
            <div>
              <BoxTitleWithBadge>
                Users attached to this project
              </BoxTitleWithBadge>
              <Badge color="purple">{projectMembers.length}</Badge>
            </div>
          )}
        >
          <ProjectMemberList
            noMembersText="No users are attached to this project"
            members={projectMembers}
          />
        </Box>

        <Box
          title={() => (
            <div>
              <BoxTitleWithBadge>
                Groups attached to this project
              </BoxTitleWithBadge>
              <Badge color="purple">{groups.length || 0}</Badge>
            </div>
          )}
        >
          <ProjectGroupsList
            noGroupsText="No groups are attached to this project"
            groups={groups}
          />
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  project: getSelectedProject(state),
  projectId: getSelectedProjectId(state),
  projectMembers: getSelectedProjectMembers(state),
  timesheets: getSelectedProjectTimesheets(state),
  groups: getSelectedProjectGroups(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectProject,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectViewPage);

const BoxTitleWithBadge = styled.span`
  margin-right: 5px;
`;
