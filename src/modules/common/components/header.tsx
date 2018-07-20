import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'genui';

import LanguageSelector from './language-selector';
import { getAuthedUser } from '../../auth/store/selectors';
import { User } from '../../users/store/models';

export interface HeaderProps {
  containerHeight: number;
  user: User;
}

const items = [
  {
    label: 'Profile',
    icon: 'profile.png',
    to: '/profile',
  },
  {
    label: 'Sign out',
    icon: 'logout.png',
    to: '/logout',
  },
];

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
          <LanguageSelector />

          <StyledDropdown
            className="dropdown"
            items={items}
            renderItem={(item: any) => (
              <Link to={item.to}>
                <img
                  src="https://semantic-ui.com/images/avatar/small/jenny.jpg"
                  alt=""
                />
                {item.label}
              </Link>
            )}
          >
            <img
              src="https://semantic-ui.com/images/avatar/small/jenny.jpg"
              alt=""
            />
            {`${user.firstname} ${user.lastname}`}
          </StyledDropdown>
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

const StyledDropdown = styled(Dropdown)`
  line-height: normal;
  align-self: center;
`;

interface RightNodeProps {
  containerHeight: number;
}

const RightNode = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  justify-content: space-between;

  ${(props: RightNodeProps) => `line-height: ${props.containerHeight}px;`};
  ${(props: RightNodeProps) => `height: ${props.containerHeight}px;`};

  > div {
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
