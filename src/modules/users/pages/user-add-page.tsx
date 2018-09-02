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
    this.props.createUser(data);
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

const mapStateToProps = (state: any) => ({
  projects: getAuthedUserProjectsWhereAdmin(state),
  groups: getGroups(state),
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
