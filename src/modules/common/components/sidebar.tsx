import * as React from 'react';
import styled from 'styled-components';
import { UserRole } from '../../auth/store/models';
import SidebarLink from './sidebar-link';

class Sidebar extends React.Component {
  render() {
    return (
      <Container>
        <ul>
          <SidebarLink to="/" icon="fas fa-chalkboard" label="Dashboard" />

          <SidebarLink
            to="/timesheets"
            icon="fas fa-clock"
            label="Timesheets"
          />

          <SidebarLink
            roles={[UserRole.Manager, UserRole.Admin]}
            to="/manage-timesheets"
            icon="fas fa-clock"
            label="Manage Timesheets"
          />

          <SidebarLink
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
            label="Timesheet Templates"
          />
        </ul>
      </Container>
    );
  }
}

const Container = styled.div`
  background: #0273af;
  height: 100%;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    text-align: center;
  }

  a {
    display: block;
    color: #fff;
    font-size: 1.1em;
    text-decoration: none;
    padding: 20px 0;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }

    i {
      font-size: 1.6em;
      display: block;
      margin-bottom: 10px;
    }
  }
`;

export default Sidebar;
