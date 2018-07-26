import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Badge } from 'genui';

import { selectProject, fetchProjectById } from '../store/actions';
import { ProjectInfo, ProjectMemberList } from '../components';
import {
  getSelectedProject,
  getSelectedProjectTimesheets,
  getSelectedProjectMembers,
} from '../store/selectors';
import { Project, ProjectMember } from '../store/models';
import { TimesheetItem, TimesheetStatus } from '../../timesheets/store/models';
import { TimesheetList } from '../../timesheets';
import { Box } from '../../ui';
import styled from '../../../styled/styled-components';

export interface ProjectViewPageProps {
  match: any;
  timesheets: TimesheetItem[];
  selectProject: (projectId: number) => any;
  fetchProjectById: (projectId: number) => any;
  project: Project;
  projectMembers: ProjectMember[];
}

class ProjectViewPage extends React.Component<ProjectViewPageProps> {
  componentWillMount() {
    const { match, selectProject, fetchProjectById } = this.props;

    if (match && match.params.id) {
      selectProject(+match.params.id);
      fetchProjectById(+match.params.id);
    }
  }

  render() {
    const { project, timesheets, projectMembers } = this.props;

    const timesheetsWaitingForApproval = timesheets.filter(
      (timesheet: TimesheetItem) =>
        timesheet.status === TimesheetStatus.WaitingForApproval
    );

    return (
      <div>
        <ProjectInfo project={project} />

        <Box title="All timesheets">
          <TimesheetList timesheets={timesheets} />
        </Box>

        <Box
          title={() => (
            <div>
              <BoxTitleWithBadge>
                Timesheets waiting for approval
              </BoxTitleWithBadge>
              <Badge color="blue">{timesheetsWaitingForApproval.length}</Badge>
            </div>
          )}
        >
          <TimesheetList
            noTimesheetsText="No timesheets are waiting for approval"
            timesheets={timesheetsWaitingForApproval}
          />
        </Box>

        <Box
          title={() => (
            <div>
              <BoxTitleWithBadge>
                Users attached to this project
              </BoxTitleWithBadge>
              <Badge color="blue">{projectMembers.length}</Badge>
            </div>
          )}
        >
          <ProjectMemberList
            noMembersText="No users are attached to this project"
            members={projectMembers}
          />
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  project: getSelectedProject(state),
  projectMembers: getSelectedProjectMembers(state),
  timesheets: getSelectedProjectTimesheets(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      selectProject,
      fetchProjectById,
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
