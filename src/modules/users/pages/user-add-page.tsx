import React from 'react';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { UserForm } from '../components';
import { PageHeader } from '../../common';
import { withToastr, WithToastrProps } from '../../common/components/toastr';
import { GET_USERS, USER_LIST_ITEM_FRAGMENT } from '../store/queries';
import { PageLoader } from 'src/modules/ui';

type Props = {};
type DataProps = {
  createUser(options: any): any;
  projects: any[];
  groups: any[];
  history: any;
  loading: boolean;
};
type EnhancedProps = Props & DataProps & WithToastrProps;

type UserFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  project: string;
  group: string;
};

class UserAddPage extends React.Component<EnhancedProps> {
  handleAdd = async (data: UserFormData) => {
    await this.props.createUser({
      variables: {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        password: data.password,
        projectId: data.project,
        groupId: data.group,
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
    const { projects, groups } = this.props;

    return (
      <div>
        <PageHeader>Add new user</PageHeader>
        <UserForm
          onSubmit={this.handleAdd}
          projects={projects}
          groups={groups}
        />
      </div>
    );
  }
}

const QUERY = gql`
  query {
    allProjects {
      id
      name
    }
    allGroups {
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

const enhance = compose(
  withToastr,
  graphql(QUERY, {
    props: ({ data }: any) => ({
      projects: data.allProjects,
      groups: data.allGroups,
      loading: data.loading,
    }),
  }),
  graphql(CREATE_USER, {
    name: 'createUser',
    options: {
      update: (proxy, { data }: any) => {
        const { allUsers }: any = proxy.readQuery({
          query: GET_USERS,
        });

        const item = {
          ...data.createAuthUser,
          __typename: 'User',
          group: null,
          image: null,
        };

        proxy.writeQuery({
          query: GET_USERS,
          data: {
            allUsers: allUsers.concat([item]),
          },
        });
      },
    },
  }),
  branch(({ loading }) => loading, renderComponent(PageLoader))
);

export default enhance(UserAddPage);
