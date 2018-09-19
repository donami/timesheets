import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UserForm } from '../components';
import { createUser } from '../store/actions';
import { Project } from '../../projects/store/models';
import { fetchProjects } from '../../projects/store/actions';
import { getAuthedUserProjectsWhereAdmin } from '../../auth/store/selectors';
import { PageHeader } from '../../common';
import { getGroups } from '../../groups/store/selectors';
import { Group } from '../../groups/store/models';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import { GET_PROJECTS } from '../../projects/store/queries';
import gql from 'graphql-tag';

type Props = {
  createUser: (user: UserFormData) => any;
  fetchProjects: () => any;
  projects: Project[];
  groups: Group[];
  error: any;
};

type UserFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  projects: number[];
};

class UserAddPage extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchProjects();
  }

  handleAdd = (data: UserFormData) => {
    // this.props.createUser(data);
    console.log(data);
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

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      createUser,
      fetchProjects,
    },
    dispatch
  );

const query = gql`
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

const mutation = gql`
  mutation signUp {
    createUser(
      authProvider: { email: { email: "liv@gmail.com", password: "123" } }
    ) {
      id
    }
  }
`;

const enhance = compose(
  graphql(query, {
    props: ({ data }: any) => ({
      projects: data.allProjects,
      groups: data.allGroups,
      loading: data.loading,
    }),
  }),
  connect(
    undefined,
    mapDispatchToProps
  ),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(UserAddPage);
