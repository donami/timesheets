import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Message } from 'genui';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

import { verifyRecoverCode, recoverPasswordChange } from '../store/actions';
import { Redirect } from 'react-router';
import { getPasswordRecoveryState } from '../store/selectors';
import styled from '../../../styled/styled-components';
import { RecoverPassword } from '../components';

type Props = {
  verifyRecoverCode(userID: number, code: string): any;
  recoverPasswordChange(data: any, code: string): any;
  passwordRecovery: any;
  match: any;
};
type DataProps = {
  updateUserPassword(options: any): any;
};

type State = Readonly<{
  submitted: boolean;
}>;

const initialState: State = {
  submitted: false,
};

class RecoverPasswordPage extends Component<Props, State> {
  readonly state = initialState;

  handleSubmit = (model: any) => {
    console.log('model', model);
    const data = {
      ...model,
      id: +this.props.passwordRecovery.userId,
    };
    // delete data.passwordConfirm;

    // TODO: update password mutation
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

    return (
      <Container>
        <h3>Recover Password</h3>

        {passwordRecovery.error && (
          <Message negative className="password-recover-message">
            {passwordRecovery.error}
          </Message>
        )}

        <Query
          query={VERIFY_CODE}
          variables={{ code: params.code, userId: params.userId }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return null;
            }

            if (!data.allRecoverCodes.length) {
              return <p>Invalid or expired recovery code.</p>;
            }

            return (
              <RecoverPassword
                onSubmit={this.handleSubmit}
                userId={data.allRecoverCodes[0].user.id}
              />
            );
          }}
        </Query>
      </Container>
    );
  }
}

const VERIFY_CODE = gql`
  query($code: String!, $userId: ID!) {
    allRecoverCodes(filter: { code: $code, user: { id: $userId } }) {
      user {
        id
      }
    }
  }
`;

const UPDATE_USER_PASSWORD = gql`
  mutation($userId: ID!) {
    updateUser(id: $userId) {
      __typename
      id
    }
  }
`;

const enhance = compose(
  connect(
    (state: any) => ({
      passwordRecovery: getPasswordRecoveryState(state),
    }),
    (dispatch: any) =>
      bindActionCreators({ verifyRecoverCode, recoverPasswordChange }, dispatch)
  ),
  graphql(UPDATE_USER_PASSWORD, { name: 'updateUserPassword' })
);

export default enhance(RecoverPasswordPage);

const Container = styled.div`
  .password-recover-message {
    margin-bottom: 40px;
  }
`;
