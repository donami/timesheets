import * as React from 'react';
import { Input, Button, Field } from 'genui';

import styled from '../../../styled/styled-components';
import { History } from 'history';
import { Spinner } from '@blueprintjs/core';

type Props = {
  mutate(options: any): void;
  addToast: any;
  loading: boolean;
  history: History;
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

  handleSubmit = async (e: any) => {
    e.preventDefault();

    const { mutate, addToast, history } = this.props;
    try {
      const res: any = await mutate({
        variables: {
          email: this.state.email,
          password: this.state.password,
        },
      });

      if (res.data.authenticateUser && res.data.authenticateUser.token) {
        localStorage.setItem('token', res.data.authenticateUser.token);
        history.replace('/');
      }
    } catch (error) {
      addToast(
        'Invalid credentials',
        'No user with that email and password exists.',
        'negative'
      );
    }
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

    if (this.props.loading) {
      return (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      );
    }

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

const SpinnerContainer = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default AuthForm;
