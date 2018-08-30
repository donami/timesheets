import React, { Component } from 'react';
import { Input, Field } from 'genui';

type State = Readonly<{
  form: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}>;

type Props = {
  initialValues?: any;
  onInputChange: (e: any, step: number) => any;
};

const initialState: State = {
  form: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

class WizardStepOne extends Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    const { initialValues } = this.props;

    if (initialValues) {
      this.setState({ form: initialValues });
    }
  }

  render() {
    const { onInputChange } = this.props;

    return (
      <div>
        <Field>
          <label>Firstname</label>
          <Input
            name="firstname"
            placeholder="John"
            defaultValue={this.state.form.firstname}
            onChange={(e: any) => onInputChange(e, 1)}
          />
        </Field>

        <Field>
          <label>Lastname</label>
          <Input
            name="lastname"
            placeholder="Doe"
            defaultValue={this.state.form.lastname}
            onChange={(e: any) => onInputChange(e, 1)}
          />
        </Field>

        <Field>
          <label>Email</label>
          <Input
            name="email"
            placeholder="john@email.com"
            defaultValue={this.state.form.email}
            onChange={(e: any) => onInputChange(e, 1)}
          />
        </Field>

        <Field>
          <label>Password</label>
          <Input
            name="password"
            type="password"
            placeholder="Secret"
            defaultValue={this.state.form.password}
            onChange={(e: any) => onInputChange(e, 1)}
          />
        </Field>

        <Field>
          <label>Confirm Password</label>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            defaultValue={this.state.form.confirmPassword}
            onChange={(e: any) => onInputChange(e, 1)}
          />
        </Field>
      </div>
    );
  }
}

export default WizardStepOne;
