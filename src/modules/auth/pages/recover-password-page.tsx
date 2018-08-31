import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Button, Message } from 'genui';

import { Form } from '../../common';
import { verifyRecoverCode, recoverPasswordChange } from '../store/actions';
import { Redirect } from 'react-router';
import { getPasswordRecoveryState } from '../store/selectors';
import styled from '../../../styled/styled-components';

type Props = {
  verifyRecoverCode(userID: number, code: string): any;
  recoverPasswordChange(data: any, code: string): any;
  passwordRecovery: any;
  match: any;
};

type State = Readonly<{
  submitted: boolean;
}>;

const initialState: State = {
  submitted: false,
};

class RecoverPasswordPage extends Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    const {
      match: { params },
    } = this.props;

    if (params.userId && params.code) {
      this.props.verifyRecoverCode(params.userId, params.code);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      match: { params },
    } = this.props;

    if (
      params.userId !== nextProps.match.params.userId ||
      params.code !== nextProps.match.params.code
    ) {
      this.props.verifyRecoverCode(
        nextProps.match.params.userId,
        nextProps.match.params.code
      );
    }
  }

  handleSubmit = (model: any) => {
    const data = {
      ...model,
      id: +this.props.passwordRecovery.userId,
    };

    delete data.passwordConfirm;

    this.props.recoverPasswordChange(data, this.props.passwordRecovery.code);
    this.setState({ submitted: true });
  };

  render() {
    const {
      match: { params },
      passwordRecovery,
    } = this.props;

    if (!params.userId || !params.code) {
      return <Redirect to="/auth/forgotten-password" />;
    }

    const verified =
      passwordRecovery &&
      passwordRecovery.verified &&
      passwordRecovery.userId === params.userId &&
      passwordRecovery.code === params.code;

    return (
      <Container>
        <h3>Recover Password</h3>

        {passwordRecovery.error && (
          <Message negative className="password-recover-message">
            {passwordRecovery.error}
          </Message>
        )}

        {verified && (
          <div>
            <Form onValidSubmit={this.handleSubmit}>
              {formState => (
                <>
                  <Form.Field
                    name="password"
                    label="Password"
                    type="password"
                    validations={{ isRequired: true }}
                  >
                    <Input placeholder="New password" />
                  </Form.Field>

                  <Form.Field
                    name="passwordConfirm"
                    label="Confirm password"
                    type="password"
                    validations={{
                      isRequired: true,
                      equalsField: 'password',
                    }}
                  >
                    <Input placeholder="Enter password again" />
                  </Form.Field>

                  <Button
                    type="submit"
                    disabled={!formState.isValid}
                    color="green"
                  >
                    Change password
                  </Button>
                  {/* <BackButton>Cancel</BackButton> */}
                </>
              )}
            </Form>
          </div>
        )}
      </Container>
    );
  }
}

export default connect(
  (state: any) => ({
    passwordRecovery: getPasswordRecoveryState(state),
  }),
  (dispatch: any) =>
    bindActionCreators({ verifyRecoverCode, recoverPasswordChange }, dispatch)
)(RecoverPasswordPage);

const Container = styled.div`
  .password-recover-message {
    margin-bottom: 40px;
  }
`;
