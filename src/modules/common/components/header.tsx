import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Icon } from 'genui';

import LanguageSelector from './language-selector';
import {
  getAuthedUser,
  getUnreadNotifications,
} from '../../auth/store/selectors';
import { User } from '../../users/store/models';
import Avatar from './avatar';
import Popup from './popup';
import Notifications from './notifications';
import { bindActionCreators } from 'redux';
import { clearNotifications } from '../../auth/store/actions';
import { Notification } from '../../auth/store/models';
import Attention from './attention';

type Props = {
  containerHeight: number;
  user: User;
  unreadNotifications: Notification[];
  clearNotifications: () => any;
};

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
    label: 'Edit Profile',
    icon: 'fas fa-cog',
    to: '/profile/edit',
  },
  {
    label: 'Sign out',
    icon: 'fas fa-power-off',
    to: '/logout',
  },
];

class Header extends React.Component<Props> {
  handleNotificationsClick = () => {
    if (this.props.unreadNotifications.length > 0) {
      this.props.clearNotifications();
    }
  };

  render() {
    const { containerHeight, user, unreadNotifications } = this.props;

    return (
      <Container>
        <RightNode className="right-node" containerHeight={containerHeight}>
          {/* <LanguageSelector /> */}

          <HeaderAction>
            <Popup
              trigger={
                <TriggerAction onClick={this.handleNotificationsClick}>
                  {unreadNotifications.length > 0 && <Attention />}
                  <Icon name="far fa-bell" />
                </TriggerAction>
              }
              content={<Notifications />}
            />
          </HeaderAction>

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
            <Avatar view="sm" avatar={user.image} />
          </StyledDropdown>
        </RightNode>
      </Container>
    );
  }
}
const Container = styled.div`
  position: relative;
  height: 100%;
  border-bottom: #edeef3 1px solid;
`;

const HeaderAction = styled.div`
  border-right: 1px solid #edeef3;
  border-left: 1px solid #edeef3;
  padding: 0 20px;
`;

const TriggerAction = styled.div`
  position: relative;

  i {
    font-size: 1.4em;
    color: #dbdeed;
    line-height: 60px;
    cursor: pointer;
  }

  &:hover {
    i {
      color: #59efb0;
    }
  }
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
    left: -80px;
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
  unreadNotifications: getUnreadNotifications(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      clearNotifications,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
