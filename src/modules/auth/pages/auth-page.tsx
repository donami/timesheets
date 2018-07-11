import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { auth } from '../store/actions';
import { AuthForm } from '../components';
import { getIsAuthed } from '../store/selectors';
import { Redirect } from 'react-router';

export interface AuthPageProps {
  auth: (email: string, password: string) => any;
  authed: boolean;
}

class AuthPage extends React.Component<AuthPageProps> {
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
          <Content className="content">
            <Logo className="logo">
              <img src="/logo.png" alt="Logo" />
            </Logo>

            <Title>Sign in to Timesheets</Title>

            <AuthForm onSubmit={this.handleAuth} />
          </Content>
        </Container>
      </Page>
    );
  }
}

const Page = styled.div`
  background: #c36e4d;
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
`;

const Logo = styled.div`
  text-align: center;
`;

const Title = styled.h3`
  margin: 30px 0;
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
