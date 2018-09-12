import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Badge } from 'genui';

import { selectProject, updateProject } from '../store/actions';
import {
  ProjectCard,
  ProjectMemberList,
  ProjectGroupsList,
  ProjectForm,
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
import { Switch, Route } from 'react-router-dom';
import { PageHeader } from '../../common';

export interface ProjectViewPageProps {
  match: any;
  timesheets: TimesheetItem[];
  selectProject(projectId: number): any;
  updateProject(projectId: number, project: Project): any;
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

  handleSave = (data: Project) => {
    this.props.updateProject(data.id, data);
  };

  render() {
    const { project, timesheets, projectMembers, groups } = this.props;

    const timesheetsWaitingForApproval = timesheets.filter(
      (timesheet: TimesheetItem) =>
        timesheet.status === TimesheetStatus.WaitingForApproval
    );

    return (
      <Switch>
        <Route
          path={`/project/:id/edit`}
          render={props => (
            <div>
              <PageHeader>Edit Project</PageHeader>
              <ProjectForm onSubmit={this.handleSave} initialValues={project} />
            </div>
          )}
        />
        <Route
          path="/project/:id"
          render={props => (
            <div>
              <Row>
                <Column xs={12} sm={3}>
                  <ProjectCard project={project} />
                </Column>
                <Column xs={12} sm={9}>
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
                      items={timesheetsWaitingForApproval}
                    />
                  </Box>
                </Column>
              </Row>

              <Box title="All timesheets">
                <TimesheetList items={timesheets} />
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
          )}
        />
      </Switch>
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
      updateProject,
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
