import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  compose,
  branch,
  renderNothing,
  withHandlers,
  renderComponent,
} from 'recompose';
import { graphql } from 'react-apollo';
import { Button, TableBuilder, Table, Icon, ActionProps } from 'genui';

import { Project } from '../store/models';
import { PageHeader, Translate } from '../../common';
import { GET_PROJECTS } from '../store/queries';
import { DELETE_PROJECT } from '../store/mutations';
import { PageLoader } from 'src/modules/ui';

type Props = {};
type DataProps = {
  projects: Project[];
  deleteProject(options: any): any;
};
type HandlerProps = {
  onRemove(projectId: string): any;
};
type EnhancedProps = Props & DataProps & HandlerProps;

const ProjectListPage: React.SFC<EnhancedProps> = ({ projects, onRemove }) => (
  <div>
    <PageHeader
      options={() => (
        <Button to="/projects/add" color="purple">
          <Translate text="projects.labels.NEW_PROJECT" />
        </Button>
      )}
    >
      <Translate text="projects.labels.PROJECTS" />
    </PageHeader>

    <TableBuilder
      selectable
      items={projects}
      itemsOptions={(item: any) => [
        {
          label: 'View project',
          icon: 'fas fa-eye',
          to: `/project/${item.id}`,
        },
      ]}
      renderHeaders={
        <>
          <Table.HeaderCell sortableBy="id">ID</Table.HeaderCell>
          <Table.HeaderCell sortableBy="name">Name</Table.HeaderCell>
          <Table.HeaderCell length="5%" />
          <Table.HeaderCell length="5%" />
          <Table.HeaderCell length="5%" />
        </>
      }
      renderItem={(item: any) => (
        <>
          <Table.Cell>
            <Link to={`/project/${item.id}`}>#{item.id}</Link>
          </Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell
            option={{
              icon: 'fas fa-pencil-alt',
              to: `/project/${item.id}/edit`,
            }}
          />
          <Table.Cell
            option={{
              confirm: {
                trigger: <Icon name="fas fa-trash" title="Remove" />,
                content: `Do you really want to remove "${item.name}"?`,
                onActionClick: (
                  e: React.MouseEvent<HTMLElement>,
                  actionProps: ActionProps
                ) => {
                  if (actionProps.positive) {
                    onRemove(item.id);
                  }
                },
              },
            }}
          />
        </>
      )}
    />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_PROJECTS, {
    props: ({ data }: any) => ({
      projects: data.allProjects,
      loading: data.loading,
    }),
  }),
  graphql(DELETE_PROJECT, {
    name: 'deleteProject',
    options: {
      update: (proxy, { data: { deleteProject } }: { data: any }) => {
        const { allProjects }: any = proxy.readQuery({
          query: GET_PROJECTS,
        });

        proxy.writeQuery({
          query: GET_PROJECTS,
          data: {
            allProjects: allProjects.filter(
              (project: any) => project.id !== deleteProject.id
            ),
          },
        });
      },
    },
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onRemove: ({ deleteProject }) => (projectId: string) => {
      deleteProject({ variables: { id: projectId } });
    },
  }),
  branch(({ loading }) => loading, renderComponent(PageLoader))
);

export default enhance(ProjectListPage);
