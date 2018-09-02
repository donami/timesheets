import React from 'react';
import { Input, Button, Select } from 'genui';

import { Project } from '../../projects/store/models';
import { Form } from '../../common/components/form';
import { BackButton } from '../../common';
import { Group } from '../../groups/store/models';

type Props = {
  onSubmit: (data: any) => any;
  projects: Project[];
  groups: Group[];
};

class UserForm extends React.Component<Props> {
  handleSubmit = (model: any) => {
    const data = {
      ...model,
      projects: [+model.project],
      group: +model.group,
    };

    // if (
    //   !data.projects.length ||
    //   model.project === '0' ||
    //   model.project === ''
    // ) {
    //   // You need to assign the user to at least one project.
    //   toastr.error(
    //     'Oops..',
    //     'You need to assign the user to at least one project.'
    //   );
    //   return;
    // }

    // if (
    //   !firstname.length ||
    //   !lastname.length ||
    //   !email.length ||
    //   !password.length
    // ) {
    //   toastr.error('Oops..', 'You need to fill in all the mandatory fields.');
    //   return;
    // }

    delete data.project;
    delete data.confirmPassword;

    this.props.onSubmit(data);
  };

  render() {
    const { projects, groups } = this.props;

    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="email"
              label="Email"
              validations={{ isEmail: true, isRequired: true }}
            >
              <Input placeholder="john@email.com" />
            </Form.Field>

            <Form.Field
              name="firstname"
              label="First name"
              validations={{ isRequired: true }}
            >
              <Input placeholder="John" />
            </Form.Field>

            <Form.Field
              name="lastname"
              label="Last name"
              validations={{ isRequired: true }}
            >
              <Input placeholder="Doe" name="lastname" />
            </Form.Field>

            <Form.Field
              name="password"
              label="Password"
              validations={{ isRequired: true }}
            >
              <Input placeholder="Password" type="password" />
            </Form.Field>

            <Form.Field
              name="confirmPassword"
              label="Confirm password"
              validations={{ isRequired: true, equalsField: 'password' }}
            >
              <Input placeholder="Password again..." type="password" />
            </Form.Field>

            <Form.Field
              name="project"
              label="Assign to project"
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

            <Form.Field
              name="group"
              label="Assign to group"
              validations={{ isRequired: true }}
            >
              <Select
                options={groups.map(group => ({
                  value: group.id,
                  label: group.name,
                }))}
                placeholder="Select Group"
              />
            </Form.Field>

            <Button type="submit" disabled={!formState.isValid} color="green">
              Add
            </Button>
            <BackButton>Cancel</BackButton>
          </>
        )}
      </Form>
    );
  }
}

export default UserForm;
