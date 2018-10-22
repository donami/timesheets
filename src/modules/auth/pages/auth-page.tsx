import * as React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { graphql, Mutation } from 'react-apollo';

import { AuthForm } from '../components';
import { Redirect, Switch, Route } from 'react-router';
import ForgottenPasswordPage from './forgotten-password-page';
import RecoverPasswordPage from './recover-password-page';
import { WithToastrProps, withToastr } from '../../common/components/toastr';

type Props = {
  auth: (email: string, password: string) => any;
  data: any;
  authenticateUser: any;
  authed: boolean;
  history: any;
  user: any;
};
type EnhancedProps = Props & WithToastrProps;

class AuthPage extends React.Component<EnhancedProps> {
  render() {
    // redirect if user is logged in
    if (this.props.user && this.props.user.id) {
      return <Redirect to="/" />;
    }

    return (
      <Page className="page">
        <Container className="container">
          <LogoContainer className="logo-container">
            <img src="/logo.png" alt="Logo" style={{ maxWidth: 200 }} />
          </LogoContainer>

          <Content className="content">
            <Switch>
              <Route
                path={`/auth/forgotten-password/:userId/:code`}
                render={props => <RecoverPasswordPage {...props} />}
              />
              <Route
                path={`/auth/forgotten-password`}
                render={props => <ForgottenPasswordPage {...props} />}
              />
              <Route
                path="*"
                render={props => (
                  <>
                    <Title>Sign in to Timefly</Title>

                    <Mutation mutation={AUTHENTICATE_USER}>
                      {(mutate, { loading }) => {
                        return (
                          <AuthForm
                            mutate={mutate}
                            loading={loading}
                            addToast={this.props.addToast}
                            history={this.props.history}
                          />
                        );
                      }}
                    </Mutation>

                    <Link to="/auth/forgotten-password">
                      Forgotten password?
                    </Link>
                  </>
                )}
              />
            </Switch>
          </Content>
        </Container>
      </Page>
    );
  }
}

const Page = styled.div`
  background: rgba(167, 112, 255, 1);
  background: -moz-linear-gradient(
    top,
    rgba(167, 112, 255, 1) 0%,
    rgba(133, 71, 255, 1) 50%,
    rgba(117, 62, 254, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(167, 112, 255, 1)),
    color-stop(50%, rgba(133, 71, 255, 1)),
    color-stop(100%, rgba(117, 62, 254, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(167, 112, 255, 1) 0%,
    rgba(133, 71, 255, 1) 50%,
    rgba(117, 62, 254, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(167, 112, 255, 1) 0%,
    rgba(133, 71, 255, 1) 50%,
    rgba(117, 62, 254, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(167, 112, 255, 1) 0%,
    rgba(133, 71, 255, 1) 50%,
    rgba(117, 62, 254, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(167, 112, 255, 1) 0%,
    rgba(133, 71, 255, 1) 50%,
    rgba(117, 62, 254, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a770ff', endColorstr='#753efe', GradientType=0 );
  height: 100%;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 500px;
  padding: 30px 0;
`;

const Content = styled.div`
  background: #fff;
  padding: 60px;
  text-align: center;

  a {
    text-decoration: none;
  }
`;

const LogoContainer = styled.div`
  text-align: center;
`;

const Title = styled.h3`
  /* margin: 30px 0; */
  text-transform: uppercase;
`;

export const AUTHENTICATE_USER = gql`
  mutation authenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export const LOGGED_IN_USER = gql`
  query user {
    user {
      id
      firstName
      lastName
      image {
        id
        url
      }
    }
  }
`;

const enhance = compose(
  withToastr,
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      user: data.user || null,
    }),
    options: { fetchPolicy: 'network-only' },
  })
);

export default enhance(AuthPage);
