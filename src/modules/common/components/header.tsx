import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LanguageSelector from './language-selector';
import { getAuthedUser } from '../../auth/store/selectors';
import { User } from '../../users/store/models';

export interface HeaderProps {
  containerHeight: number;
  user: User;
}

class Header extends React.Component<HeaderProps> {
  render() {
    const { containerHeight, user } = this.props;

    return (
      <Container>
        <LogoContainer>
          <Logo
            src="https://staticeu.zerochaos.com/StaticContent/assets/images/ZeroChaosLogoHorizontal.svg"
            alt="Logo"
          />
        </LogoContainer>

        <RightNode className="right-node" containerHeight={containerHeight}>
          <div>{`${user.firstname} ${user.lastname}`}</div>
          <LanguageSelector />
          <div>
            <Link to="/logout">Sign out</Link>
          </div>
        </RightNode>
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  height: 100%;
  border-bottom: #ccc 1px solid;
`;

const LogoContainer = styled.div``;

interface RightNodeProps {
  containerHeight: number;
}

const RightNode = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  justify-content: space-between;

  ${(props: RightNodeProps) => `line-height: ${props.containerHeight}px;`};

  div {
    margin: 0 20px;
  }
`;

const Logo = styled.img`
  height: 50px;
  position: absolute;
  top: 50%;
  left: 20px;
  margin-top: -25px;
`;

const mapStateToProps = (state: any) => ({
  user: getAuthedUser(state),
});

export default connect(mapStateToProps)(Header);
