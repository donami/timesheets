import * as React from 'react';
import { Input, Button, Field } from 'genui';
import styled from '../../../styled/styled-components';
import { Link } from 'react-router-dom';

type Props = {
  onSubmit: (email: string, password: string) => any;
};
type State = Readonly<{
  email: string;
  password: string;
}>;

class AuthForm extends React.Component<Props, State> {
  readonly state: State = {
    email: '',
    password: '',
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.props.onSubmit(this.state.email, this.state.password);
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

  render() {
    const { email, password } = this.state;

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <Field>
          <label>Email</label>
          <Input
            placeholder="your@email.com"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </Field>
        <Field>
          <label>Password</label>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </Field>

        <Buttons>
          <Button type="submit" color="green">
            Sign in
          </Button>
        </Buttons>

        <Link to="/">Forgotten password?</Link>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  width: 50%;
  margin: 0 auto;
  text-align: left;
`;

const Buttons = styled.div`
  margin-bottom: 30px;
`;

export default AuthForm;
