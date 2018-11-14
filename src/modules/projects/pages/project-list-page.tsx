import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { Query, Mutation, graphql } from 'react-apollo';
import { Button, TableBuilder, Table } from 'genui';
import { Alert, Intent } from '@blueprintjs/core';

import { PageHeader, Translate } from '../../common';
import { GET_PROJECTS } from '../store/queries';
import { DELETE_PROJECT, DELETE_PROJECT_MEMBER } from '../store/mutations';
import { PageLoader } from 'src/modules/ui';
import { CompanyContext } from '../../common/components/routing';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { UserRole } from '../../users/store/models';

type Props = {};
type DataProps = {
  user: any;
  loading: boolean;
  setAwaitingDeleteId: any;
  deleteProjectMember(options: any): any;
};
type StateProps = {
  awaitingDeleteId: string | boolean;
};
type HandlerProps = {};
type EnhancedProps = Props & DataProps & StateProps & HandlerProps;

const ProjectListPage: React.SFC<EnhancedProps> = ({
  awaitingDeleteId,
  setAwaitingDeleteId,
  deleteProjectMember,
  loading: userLoading,
  user,
}) => (
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

    <CompanyContext.Consumer>
      {({ company }: any) => (
        <Query query={GET_PROJECTS} variables={{ companyId: company.id }}>
          {({ data, loading }) => {
            if (loading || userLoading) {
              return <PageLoader />;
            }

            let filteredProjects = data.allProjects;

            if (user.role === UserRole.Manager || user.role === UserRole.User) {
              filteredProjects = data.allProjects.filter((project: any) => {
                return !!user.projectMember.find(
                  (userProject: any) => userProject.project.id === project.id
                );
              });
            }

            return (
              <>
                <Mutation
                  mutation={DELETE_PROJECT}
                  update={(
                    proxy,
                    { data: { deleteProject } }: { data: any }
                  ) => {
                    const { allProjects }: any = proxy.readQuery({
                      query: GET_PROJECTS,
                      variables: {
                        companyId: company.id,
                      },
                    });

                    proxy.writeQuery({
                      query: GET_PROJECTS,
                      variables: {
                        companyId: company.id,
                      },
                      data: {
                        allProjects: allProjects.filter(
                          (project: any) => project.id !== deleteProject.id
                        ),
                      },
                    });
                  }}
                >
                  {mutate => (
                    <Alert
                      cancelButtonText="Cancel"
                      confirmButtonText="Are you sure?"
                      icon="trash"
                      intent={Intent.DANGER}
                      isOpen={awaitingDeleteId !== false}
                      onCancel={() => setAwaitingDeleteId(false)}
                      onConfirm={async () => {
                        if (awaitingDeleteId !== false) {
                          const projectToDelete = data.allProjects.find(
                            (project: any) => project.id === awaitingDeleteId
                          );

                          if (projectToDelete) {
                            const promises = projectToDelete.members.map(
                              (member: any) => {
                                return deleteProjectMember({
                                  variables: {
                                    id: member.id,
                                  },
                                });
                              }
                            );

                            await Promise.all(promises);
                            await mutate({
                              variables: {
                                id: awaitingDeleteId,
                              },
                            });
                          }
                        }
                        setAwaitingDeleteId(false);
                      }}
                    >
                      <p>Do you really want to remove this project?</p>
                    </Alert>
                  )}
                </Mutation>

                <TableBuilder
                  selectable
                  items={filteredProjects}
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
                      <Table.HeaderCell sortableBy="name">
                        Name
                      </Table.HeaderCell>
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
                          icon: 'fas fa-trash',
                          onClick: () => setAwaitingDeleteId(item.id),
                        }}
                      />
                    </>
                  )}
                />
              </>
            );
          }}
        </Query>
      )}
    </CompanyContext.Consumer>
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      user: data.user,
      loading: data.loading,
    }),
  }),
  graphql(DELETE_PROJECT_MEMBER, { name: 'deleteProjectMember' }),
  withState('awaitingDeleteId', 'setAwaitingDeleteId', false)
);

export default enhance(ProjectListPage);
