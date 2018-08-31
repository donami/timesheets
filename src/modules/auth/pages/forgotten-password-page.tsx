import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Button } from 'genui';

import { Form, BackButton } from '../../common';
import { recoverPassword } from '../store/actions';

type Props = {
  recoverPassword(email: string): any;
};

type State = Readonly<{
  submitted: boolean;
}>;

const initialState: State = {
  submitted: false,
};

class ForgottenPasswordPage extends Component<Props, State> {
  readonly state = initialState;

  handleSubmit = (model: any) => {
    this.props.recoverPassword(model.email);

    this.setState({ submitted: true });
  };

  render() {
    const { submitted } = this.state;

    return (
      <div>
        <h3>Recover Password</h3>

        {submitted ? (
          <>
            <p>
              An email with a verification link and information on how to reset
              your password has been sent to your email.
            </p>
            <Button to="/" color="green">
              Go Back
            </Button>
          </>
        ) : (
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

                <Button
                  type="submit"
                  disabled={!formState.isValid}
                  color="green"
                >
                  Recover
                </Button>
                <BackButton>Cancel</BackButton>
              </>
            )}
          </Form>
        )}
      </div>
    );
  }
}

export default connect(
  undefined,
  (dispatch: any) => bindActionCreators({ recoverPassword }, dispatch)
)(ForgottenPasswordPage);
