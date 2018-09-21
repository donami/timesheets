import React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { UserForm } from '../components';
import { PageHeader } from '../../common';
import { withToastr, WithToastrProps } from '../../common/components/toastr';

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
  mutation createUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $projectId: ID!
    $groupId: ID!
  ) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
      firstName: $firstName
      lastName: $lastName
      groupId: $groupId
      projectMember: { role: "USER", projectId: $projectId }
    ) {
      id
      email
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
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(UserAddPage);
