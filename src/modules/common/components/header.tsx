import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LanguageSelector from './language-selector';

export interface HeaderProps {
  containerHeight: number;
}

class Header extends React.Component<HeaderProps> {
  render() {
    const { containerHeight } = this.props;

    return (
      <Container>
        <LogoContainer>
          <Logo
            src="https://staticeu.zerochaos.com/StaticContent/assets/images/ZeroChaosLogoHorizontal.svg"
            alt="Logo"
          />
        </LogoContainer>

        <RightNode className="right-node" containerHeight={containerHeight}>
          <div>Markus Hederström</div>
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

export default Header;
