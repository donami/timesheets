import React from 'react';
import { compose, branch, renderNothing, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

import { GroupForm } from '../components';
import { PageHeader } from '../../common';
import { Group } from '../store/models';
import { Project } from '../../projects/store/models';
import { GET_PROJECTS } from '../../projects/store/queries';
import { GET_TEMPLATES } from '../../timesheets/store/queries';
import { UPDATE_GROUP } from '../store/mutations';
import { WithToastrProps, withToastr } from '../../common/components/toastr';

type Props = {
  group: Group;
  project: Project;
};
type DataProps = {
  projects: any;
  templates: any;
  templatesLoading: boolean;
  projectsLoading: boolean;
  history: any;
  updateGroup(options: any): any;
};
type HandlerProps = { onSave(data: any): any };
type EnhancedProps = Props & DataProps & HandlerProps & WithToastrProps;

const GroupEditPage: React.SFC<EnhancedProps> = ({
  projects,
  templates,
  group,
  onSave,
}) => (
  <div>
    <PageHeader>Update Group</PageHeader>

    <GroupForm
      onSubmit={onSave}
      projects={projects}
      templates={templates}
      initialValues={group}
    />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  withRouter,
  withToastr,
  graphql(GET_PROJECTS, {
    props: ({ data }: any) => ({
      projectsLoading: data.loading,
      projects: data.allProjects,
    }),
  }),
  graphql(GET_TEMPLATES, {
    props: ({ data }: any) => ({
      templatesLoading: data.loading,
      templates: data.allTemplates,
    }),
  }),
  graphql(UPDATE_GROUP, {
    name: 'updateGroup',
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onSave: ({ updateGroup, history, addToast }) => async data => {
      await updateGroup({
        variables: {
          id: data.id,
          name: data.name,
          projectId: data.project,
          templateId: data.timesheetTemplate,
        },
      });
      await addToast('Updated!', 'Group was updated.', 'positive');
      history.goBack();
    },
  }),
  branch<EnhancedProps>(
    ({ projectsLoading, templatesLoading }) =>
      templatesLoading || projectsLoading,
    renderNothing
  )
);

export default enhance(GroupEditPage);
