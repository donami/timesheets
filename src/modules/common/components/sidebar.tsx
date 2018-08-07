import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { UserRole } from '../../users/store/models';
import SidebarLink from './sidebar-link';

class Sidebar extends React.Component {
  render() {
    return (
      <Container>
        <LogoContainer>
          <Link to="/">
            <img src="/logo_sidebar.png" alt="" />
          </Link>
        </LogoContainer>
        <ul>
          <SidebarLink to="/" icon="fas fa-chalkboard" label="Dashboard" />

          <SidebarLink
            roles={[UserRole.User]}
            to="/timesheets"
            icon="fas fa-clock"
            label="Timesheets"
          />

          <SidebarLink
            roles={[UserRole.Manager, UserRole.Admin]}
            to="/manage-timesheets"
            icon="fas fa-clock"
            label="Timesheets"
          />

          <SidebarLink
            roles={[UserRole.User]}
            to="/expense-reports"
            icon="far fa-credit-card"
            label="Expenses"
          />

          <SidebarLink
            roles={[UserRole.Manager, UserRole.Admin]}
            to="/projects"
            icon="fas fa-briefcase"
            label="Projects"
          />

          <SidebarLink
            roles={[UserRole.Manager, UserRole.Admin]}
            to="/users"
            icon="fas fa-users"
            label="Users"
          />

          <SidebarLink
            roles={[UserRole.Manager, UserRole.Admin]}
            to="/groups"
            icon="fas fa-users"
            label="Groups"
          />

          <SidebarLink
            roles={[UserRole.Manager, UserRole.Admin]}
            to="/timesheet-templates"
            icon="fas fa-users"
            label="Templates"
          />

          <SidebarLink
            to="/help"
            icon="fas fa-question-circle"
            label="Support"
          />
        </ul>
      </Container>
    );
  }
}

const Container = styled.div`
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

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    a {
      display: block;
      color: #fff;
      font-size: 1.1em;
      text-decoration: none;
      padding: 20px;
      opacity: 0.5;
      position: relative;
      border-left: 3px solid transparent;

      &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.2);
        border-color: #fff;
      }

      span {
        position: absolute;
        margin-top: -1px;
      }

      i {
        width: 30px;
        text-align: center;
        margin-right: 10px;
        font-size: 1.2em;
      }
    }
  }
`;

const LogoContainer = styled.div`
  img {
    margin-top: 20px;
    max-width: 100%;
    border-bottom: #9d5cfe 1px solid;
  }
`;

export default Sidebar;
