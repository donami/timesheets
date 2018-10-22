import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { compose } from 'recompose';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

import styled from '../../../styled/styled-components';
import { RecoverPassword } from '../components';
import { withToastr, WithToastrProps } from '../../common/components/toastr';

type Props = {
  match: any;
};
type DataProps = {
  changePassword(options: any): any;
};
type EnhancedProps = Props & DataProps & WithToastrProps;

type State = Readonly<{
  submitted: boolean;
}>;

const initialState: State = {
  submitted: false,
};

class RecoverPasswordPage extends Component<EnhancedProps, State> {
  readonly state = initialState;

  handleSubmit = async (model: any) => {
    const {
      match: { params },
    } = this.props;

    await this.props.changePassword({
      variables: {
        password: model.password,
        code: params.code,
      },
    });
    this.props.addToast(
      'Password changed!',
      'You can now login using your new password',
      'positive'
    );

    this.setState({ submitted: true });
  };

  render() {
    const {
      match: { params },
    } = this.props;

    if (!params.userId || !params.code) {
      return <Redirect to="/auth/forgotten-password" />;
    }

    return (
      <Container>
        <h3>Recover Password</h3>

        <Query
          query={VERIFY_CODE}
          variables={{ code: params.code, userId: params.userId }}
        >
          {({ loading, data }) => {
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
  mutation($password: String!, $code: String!) {
    resetPassword(password: $password, code: $code) {
      id
    }
  }
`;

const enhance = compose(
  withToastr,
  graphql(UPDATE_USER_PASSWORD, { name: 'changePassword' })
);

export default enhance(RecoverPasswordPage);

const Container = styled.div`
  .password-recover-message {
    margin-bottom: 40px;
  }
`;
