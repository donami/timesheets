import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UserForm } from '../components';
import { createUser } from '../store/actions';
import { Project } from '../../projects/store/models';
import { fetchProjects } from '../../projects/store/actions';
import { getAuthedUserProjectsWhereAdmin } from '../../auth/store/selectors';
import { PageHeader } from '../../common';

type Props = {
  createUser: (user: UserFormData) => any;
  fetchProjects: () => any;
  projects: Project[];
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
    this.props.createUser(data);
  };

  render() {
    const { projects } = this.props;

    return (
      <div>
        <PageHeader>Add new user</PageHeader>
        <UserForm onSubmit={this.handleAdd} projects={projects} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  projects: getAuthedUserProjectsWhereAdmin(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      createUser,
      fetchProjects,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAddPage);
