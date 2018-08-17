import React from 'react';
import { Input, Button, Select } from 'genui';
import { toastr } from 'react-redux-toastr';

import { Project } from '../../projects/store/models';
import { Form } from '../../common/components/form';

// const toSelectItem = (projects: Project[]): SelectItem[] => {
//   return projects.map(project => {
//     return {
//       label: project.name,
//       value: project.id,
//     };
//   });
// };

// type SelectItem = {
//   label: string;
//   value: number;
// };

type Props = {
  onSubmit: (data: any) => any;
  projects: Project[];
};

class UserForm extends React.Component<Props> {
  handleSubmit = (model: any) => {
    const data = {
      ...model,
      projects: [+model.project],
    };

    if (
      !data.projects.length ||
      model.project === '0' ||
      model.project === ''
    ) {
      // You need to assign the user to at least one project.
      toastr.error(
        'Oops..',
        'You need to assign the user to at least one project.'
      );
      return;
    }

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

  // handleSelectChange = (selected: SelectItem[]) => {
  //   this.setState({ projects: selected.map(item => item.value) });
  // };

  render() {
    const { projects } = this.props;

    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="email"
              label="Email"
              validations={{ isEmail: true }}
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

            <Form.Field name="project" label="Assign to project">
              <select>
                <option value="0">Select project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>

              {/* <Select
                name="user-project-select"
                id="user-project-select"
                placeholder="Projects"
                items={toSelectItem(projects)}
                onChange={this.handleSelectChange}
              /> */}
            </Form.Field>

            <Button type="submit" disabled={!formState.isValid} color="green">
              Add
            </Button>
          </>
        )}
      </Form>
    );
  }
}

export default UserForm;
