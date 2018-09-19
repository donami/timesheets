import * as React from 'react';
import { Badge } from 'genui';
import { Switch, Route } from 'react-router-dom';
import { compose, withHandlers, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';

import {
  ProjectCard,
  ProjectMemberList,
  ProjectGroupsList,
  ProjectForm,
} from '../components';
import { TimesheetStatus } from '../../timesheets/store/models';
import { Box, Row, Column } from '../../ui';
import styled from '../../../styled/styled-components';
import { PageHeader } from '../../common';
import { TimesheetList } from '../../timesheets';
import { GET_PROJECT } from '../store/queries';
import { UPDATE_PROJECT } from '../store/mutations';

type Props = {
  match: any;
  history: any;
};
type DataProps = {
  project: any;
  updateProject(options: any): any;
};
type HandlerProps = {
  onSave(data: any): any;
};
type EnhancedProps = Props & DataProps & HandlerProps;

const ProjectViewPage: React.SFC<EnhancedProps> = ({ project, onSave }) => {
  const timesheetsWaitingForApproval = (project.timesheets || []).filter(
    (timesheet: any) => timesheet.status === TimesheetStatus.WaitingForApproval
  );

  return (
    <Switch>
      <Route
        path={`/project/:id/edit`}
        render={props => (
          <div>
            <PageHeader>Edit Project</PageHeader>
            <ProjectForm onSubmit={onSave} initialValues={project} />
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
        )}
      />
    </Switch>
  );
};

const enhance = compose(
  graphql(GET_PROJECT, {
    options: (props: any) => ({
      variables: { id: props.match.params.id },
    }),
    props: ({ data }: any) => ({
      loading: data.loading,
      project: data.Project,
    }),
  }),
  graphql(UPDATE_PROJECT, { name: 'updateProject' }),
  withHandlers<EnhancedProps, HandlerProps>({
    onSave: ({ updateProject, history }) => (data: any) => {
      updateProject({ variables: { id: data.id, name: data.name } }).then(() =>
        history.goBack()
      );
    },
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(ProjectViewPage);

const BoxTitleWithBadge = styled.span`
  margin-right: 5px;
`;
