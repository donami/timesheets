import React from 'react';
import { Field, Input, Button, Select } from 'genui';
import { toastr } from 'react-redux-toastr';

import { Project } from '../../projects/store/models';

const toSelectItem = (projects: Project[]): SelectItem[] => {
  return projects.map(project => {
    return {
      label: project.name,
      value: project.id,
    };
  });
};

type SelectItem = {
  label: string;
  value: number;
};

type Props = {
  onSubmit: (data: State) => any;
  projects: Project[];
};

type State = Readonly<{
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  projects: number[];
}>;

class UserForm extends React.Component<Props, State> {
  readonly state: State = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    projects: [],
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    }: { name: keyof State; value: string } = e.target as any;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    const { firstname, lastname, email, password, projects } = this.state;

    if (!projects.length) {
      // You need to assign the user to at least one project.
      toastr.error(
        'Oops..',
        'You need to assign the user to at least one project.'
      );
      return;
    }

    if (
      !firstname.length ||
      !lastname.length ||
      !email.length ||
      !password.length
    ) {
      toastr.error('Oops..', 'You need to fill in all the mandatory fields.');
      return;
    }

    this.props.onSubmit(this.state);
  };

  handleSelectChange = (selected: SelectItem[]) => {
    this.setState({ projects: selected.map(item => item.value) });
  };

  render() {
    const { email, firstname, lastname, password } = this.state;
    const { projects } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Field>
          <label>Email *</label>
          <Input
            placeholder="john@email.com"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          <label>First name *</label>
          <Input
            placeholder="John"
            name="firstname"
            value={firstname}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          <label>Lastname *</label>
          <Input
            placeholder="Doe"
            name="lastname"
            value={lastname}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          <label>Password *</label>
          <Input
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </Field>

        <Select
          name="user-project-select"
          id="user-project-select"
          placeholder="Projects"
          items={toSelectItem(projects)}
          onChange={this.handleSelectChange}
        />

        <Button type="submit" color="green">
          Add
        </Button>
      </form>
    );
  }
}

export default UserForm;
