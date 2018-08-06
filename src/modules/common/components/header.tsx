import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'genui';

import LanguageSelector from './language-selector';
import { getAuthedUser } from '../../auth/store/selectors';
import { User } from '../../users/store/models';
import Avatar from './avatar';

export interface HeaderProps {
  containerHeight: number;
  user: User;
}

type DropdownItem = {
  label: string;
  icon: string;
  to: string;
};

const items: DropdownItem[] = [
  {
    label: 'Profile',
    icon: 'fas fa-user',
    to: '/profile',
  },
  {
    label: 'Sign out',
    icon: 'fas fa-sign-out-alt',
    to: '/logout',
  },
];

class Header extends React.Component<HeaderProps> {
  render() {
    const { containerHeight, user } = this.props;

    return (
      <Container>
        <RightNode className="right-node" containerHeight={containerHeight}>
          {/* <LanguageSelector /> */}

          <StyledDropdown
            className="dropdown"
            items={items}
            renderItem={(item: DropdownItem) => (
              <Link to={item.to}>
                <i className={item.icon} />
                {item.label}
              </Link>
            )}
          >
            <Avatar avatar={user.image} />
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

const StyledDropdown = styled(Dropdown)`
  line-height: normal;
  align-self: center;

  i {
    margin-right: 0.5em;
  }

  img {
    max-height: 3em;
    height: 3em;
  }

  .g-dropdown-menu {
    left: -30px;
    top: 120%;
  }
`;

interface RightNodeProps {
  containerHeight: number;
}

const RightNode = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: space-between;

  ${(props: RightNodeProps) => `line-height: ${props.containerHeight}px;`};
  ${(props: RightNodeProps) => `height: ${props.containerHeight}px;`};

  > div {
    margin: 0 20px;
  }
`;

const mapStateToProps = (state: any) => ({
  user: getAuthedUser(state),
});

export default connect(mapStateToProps)(Header);
