import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'genui';

import { User } from '../store/models';
import { Form, Select, BackButton } from '../../common';
import { getProjects } from '../../projects/store/selectors';
import { Project } from '../../projects/store/models';
import { bindActionCreators } from 'redux';
import { updateUser } from '../store/actions';

type Props = {
  user: User;
  projects: Project[];
  userProject: Project[];
  updateUser(userId: number, data: any): any;
};

class EditUser extends Component<Props> {
  handleSubmit = (model: any) => {
    const data = {
      ...model,
      project: +model.project,
    };

    this.props.updateUser(this.props.user.id, data);
  };

  render() {
    const { user, projects, userProject } = this.props;

    return (
      <div>
        <h3>EditUser</h3>

        <Form onValidSubmit={this.handleSubmit}>
          {formState => (
            <>
              <Form.Field
                name="email"
                label="Email"
                defaultValue={user.email}
                validations={{ isEmail: true, isRequired: true }}
              >
                <Input placeholder="john@email.com" />
              </Form.Field>

              <Form.Field
                name="firstname"
                label="First name"
                defaultValue={user.firstname}
                validations={{ isRequired: true }}
              >
                <Input placeholder="John" />
              </Form.Field>

              <Form.Field
                name="lastname"
                label="Last name"
                defaultValue={user.lastname}
                validations={{ isRequired: true }}
              >
                <Input placeholder="Doe" name="lastname" />
              </Form.Field>

              <Form.Field
                name="project"
                label="Assign to project"
                defaultValue={
                  (userProject[0] && userProject[0].id.toString()) || undefined
                }
                validations={{ isRequired: true }}
              >
                <Select
                  options={projects.map(project => ({
                    value: project.id,
                    label: project.name,
                  }))}
                  placeholder="Select Project"
                />
              </Form.Field>

              <Button type="submit" disabled={!formState.isValid} color="green">
                Save
              </Button>
              <BackButton>Cancel</BackButton>
            </>
          )}
        </Form>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({ projects: getProjects(state) }),
  (dispatch: any) => bindActionCreators({ updateUser }, dispatch)
)(EditUser);
