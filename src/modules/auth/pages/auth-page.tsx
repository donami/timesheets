import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { auth } from '../store/actions';
import { AuthForm } from '../components';
import { getIsAuthed } from '../store/selectors';
import { Redirect, Switch, Route } from 'react-router';
import ForgottenPasswordPage from './forgotten-password-page';
import { Link } from 'react-router-dom';
import RecoverPasswordPage from './recover-password-page';

type Props = {
  auth: (email: string, password: string) => any;
  authed: boolean;
};

class AuthPage extends React.Component<Props> {
  handleAuth = (email: string, password: string): void => {
    this.props.auth(email, password);
  };

  render() {
    if (this.props.authed) {
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

                    <AuthForm onSubmit={this.handleAuth} />

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
  // margin: 30px 0;
  text-transform: uppercase;
`;

const mapStateToProps = (state: any) => ({
  authed: getIsAuthed(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      auth,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
