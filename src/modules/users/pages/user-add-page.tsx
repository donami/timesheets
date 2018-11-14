import React from 'react';
import { compose } from 'recompose';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';

import { UserForm } from '../components';
import { PageHeader } from '../../common';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { GET_USERS } from '../store/queries';
import { UPDATE_USER } from '../store/mutations';
import { CompanyContext } from '../../common/components/routing';
import { PageLoader } from '../../ui';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { UserRole } from '../store/models';
import { GET_GROUPS } from '../../groups/store/queries';

type Props = {};
type DataProps = {
  history: any;
};
type EnhancedProps = Props & DataProps & WithToastrProps;

type UserFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  project: string;
  group: string;
  companyId: string;
};

type RenderProps = {
  createUser: { mutation: Function; result: { loading: boolean } };
  updateUser: { mutation: Function; result: { loading: boolean } };
};

const Mutations = adopt<RenderProps, { companyId: string }>({
  createUser: ({ render, companyId }: any) => (
    <Mutation
      mutation={CREATE_USER}
      update={(proxy, { data }) => {
        const { allUsers }: any = proxy.readQuery({
          query: GET_USERS,
          variables: {
            companyId,
          },
        });

        const item = {
          ...data.createAuthUser,
          __typename: 'User',
          group: null,
          image: null,
        };

        proxy.writeQuery({
          query: GET_USERS,
          variables: {
            companyId,
          },
          data: {
            allUsers: allUsers.concat([item]),
          },
        });
      }}
    >
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  updateUser: ({ render }: any) => (
    <Mutation mutation={UPDATE_USER}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
});

class UserAddPage extends React.Component<EnhancedProps> {
  handleAdd = async (data: UserFormData, mutations: any) => {
    const {
      data: { createAuthUser },
    } = await mutations.createUser.mutation({
      variables: {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        password: data.password,
        projectId: data.project,
        groupId: data.group,
      },
    });

    await mutations.updateUser.mutation({
      variables: {
        id: createAuthUser.id,
        companyId: data.companyId,
      },
    });

    await this.props.addToast(
      'User created!',
      'User was created successfully.',
      'positive'
    );
    this.props.history.goBack();
  };

  render() {
    return (
      <Query query={LOGGED_IN_USER}>
        {({ data: { user }, loading }: any) => {
          if (loading) {
            return <PageLoader />;
          }

          const projectIds = user.projectMember.map((member: any) => {
            return member.project.id;
          });

          return (
            <div>
              <CompanyContext.Consumer>
                {({ company }: any) => {
                  const queryVariables = {
                    companyId: company.id,
                    ...(user.role !== UserRole.Admin && {
                      projectIds,
                    }),
                  };

                  return (
                    <>
                      <Query query={QUERY} variables={queryVariables}>
                        {({ data, loading }) => {
                          if (loading) {
                            return null;
                          }

                          return (
                            <>
                              <PageHeader>Add new user</PageHeader>
                              <Mutations companyId={company.id}>
                                {({ createUser, updateUser }) => (
                                  <UserForm
                                    onSubmit={(data: UserFormData) =>
                                      this.handleAdd(data, {
                                        createUser,
                                        updateUser,
                                      })
                                    }
                                    projects={data.allProjects || []}
                                    groups={data.allGroups || []}
                                    loading={
                                      createUser.result.loading ||
                                      updateUser.result.loading
                                    }
                                  />
                                )}
                              </Mutations>
                            </>
                          );
                        }}
                      </Query>
                    </>
                  );
                }}
              </CompanyContext.Consumer>
            </div>
          );
        }}
      </Query>
    );
  }
}

const QUERY = gql`
  query($companyId: ID!, $projectIds: [ID!]) {
    allProjects(
      filter: { AND: [{ id_in: $projectIds }, { company: { id: $companyId } }] }
    ) {
      id
      name
    }
    allGroups(
      filter: {
        project: {
          AND: [{ id_in: $projectIds }, { company: { id: $companyId } }]
        }
      }
    ) {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $projectId: ID!
    $groupId: ID!
  ) {
    createAuthUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      groupId: $groupId
      projectId: $projectId
      projectRole: "USER"
      role: "USER"
    ) {
      id
      firstName
      lastName
      disabled
    }
  }
`;

const enhance = compose(withToastr);

export default enhance(UserAddPage);
