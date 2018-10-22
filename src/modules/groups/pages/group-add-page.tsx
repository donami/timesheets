import React from 'react';
import { compose, branch, renderNothing, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import { GroupForm } from '../components';
import { PageHeader } from '../../common';
import { Project } from '../../projects/store/models';
import { TimesheetTemplateItem } from '../../timesheets/store/models';
import { CREATE_GROUP } from '../store/mutations';
import { GET_PROJECTS } from '../../projects/store/queries';
import { GET_TEMPLATES } from '../../timesheets/store/queries';
import { GET_GROUPS } from '../store/queries';
import { withToastr } from '../../common/components/toastr/toastr';

type Props = {
  userId: number;
  projects: Project[];
  templates: TimesheetTemplateItem[];
};
type DataProps = {
  createGroup(options: any): any;
  addToastMutate(options: any): any;
  addToast(title: string, message: string, type: string): Promise<any>;
  projectsLoading: boolean;
  templatesLoading: boolean;
  history: any;
};
type HandlerProps = { onAdd(data: any): any };
type EnhancedProps = Props & DataProps & HandlerProps;

const GroupAddPage: React.SFC<EnhancedProps> = ({
  projects,
  templates,
  onAdd,
}) => (
  <div>
    <PageHeader>Create new Group</PageHeader>

    <GroupForm onSubmit={onAdd} projects={projects} templates={templates} />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
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
  withToastr,
  graphql(CREATE_GROUP, {
    name: 'createGroup',
    options: {
      update: (proxy, { data: { createGroup } }: { data: any }) => {
        const { allGroups }: any = proxy.readQuery({
          query: GET_GROUPS,
        });

        proxy.writeQuery({
          query: GET_GROUPS,
          data: {
            allGroups: allGroups.concat(createGroup),
          },
        });
      },
    },
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onAdd: ({ createGroup, addToast, history }) => data => {
      createGroup({
        variables: {
          name: data.name,
          projectId: data.project,
          templateId: data.timesheetTemplate,
        },
      }).then(() => {
        addToast(
          'Group was added',
          'Group was successfully created',
          'positive'
        ).then(() => {
          history.goBack();
        });
      });
    },
  }),

  branch<EnhancedProps>(
    ({ projectsLoading, templatesLoading }) =>
      templatesLoading || projectsLoading,
    renderNothing
  )
);

export default enhance(GroupAddPage);
