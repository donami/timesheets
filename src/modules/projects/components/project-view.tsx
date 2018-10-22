import React, { Component } from 'react';
import { NotFoundPage } from 'src/modules/common';
import { PageLoader, Row, Column, Box } from 'src/modules/ui';
import { TimesheetList } from 'src/modules/timesheets';
import styled from 'src/styled/styled-components';
import { Badge } from 'genui';
import ProjectGroupsList from './project-groups-list';
import ProjectMemberList from './project-member-list';
import ProjectCard from './project-card';
import { TimesheetStatus } from 'src/modules/timesheets/store/models';

type Props = {
  project: any;
  loading: boolean;
};

class ProjectView extends Component<Props> {
  render() {
    const { project, loading } = this.props;

    if (loading) {
      return <PageLoader />;
    }

    if (!project) {
      return <NotFoundPage />;
    }

    const timesheetsWaitingForApproval = (project.timesheets || []).filter(
      (timesheet: any) =>
        timesheet.status === TimesheetStatus.WaitingForApproval
    );

    return (
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
                items={timesheetsWaitingForApproval}
                paginated
                noItemsText="No timesheets are waiting for approval."
                pageSize={10}
                includeUser
              />
            </Box>
          </Column>
        </Row>

        <Box title="All timesheets">
          <TimesheetList
            items={project.timesheets}
            paginated
            noItemsText="No timesheets belongs to this project."
            pageSize={10}
            includeUser
          />
        </Box>

        <Box
          title={() => (
            <div>
              <BoxTitleWithBadge>
                Users attached to this project
              </BoxTitleWithBadge>
              <Badge color="purple">{project.members.length}</Badge>
            </div>
          )}
        >
          <ProjectMemberList
            noMembersText="No users are attached to this project"
            members={project.members}
          />
        </Box>

        <Box
          title={() => (
            <div>
              <BoxTitleWithBadge>
                Groups attached to this project
              </BoxTitleWithBadge>
              <Badge color="purple">{project.groups.length || 0}</Badge>
            </div>
          )}
        >
          <ProjectGroupsList
            noGroupsText="No groups are attached to this project"
            groups={project.groups}
          />
        </Box>
      </div>
    );
  }
}

export default ProjectView;

const BoxTitleWithBadge = styled.span`
  margin-right: 5px;
`;
