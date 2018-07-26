import React from 'react';
import { Field, Input, Button } from 'genui';

type Props = {
  onSubmit: (data: State) => any;
};

type State = Readonly<{
  name: string;
}>;

class UserForm extends React.Component<Props, State> {
  readonly state: State = {
    name: '',
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

    this.props.onSubmit(this.state);
  };

  render() {
    const { name } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Field>
          <label>Name *</label>
          <Input
            placeholder="Name of the project"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </Field>

        <Button type="submit" color="green">
          Add
        </Button>
      </form>
    );
  }
}

export default UserForm;
