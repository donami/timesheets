import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserRole } from '../../auth/store/models';
import HasAccess from './has-access';

class Sidebar extends React.Component {
  render() {
    return (
      <Container>
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-chalkboard" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/timesheets">
              <i className="fas fa-clock" />
              Timesheets
            </Link>
          </li>
          <HasAccess roles={[UserRole.Manager, UserRole.Admin]}>
            <li>
              <Link to="/manage-timesheets">
                <i className="fas fa-clock" />
                Manage Timesheets
              </Link>
            </li>
          </HasAccess>
          <li>
            <Link to="/expense-reports">
              <i className="far fa-credit-card" />
              Expenses
            </Link>
          </li>
          <li>
            <Link to="/projects">
              <i className="fas fa-briefcase" />
              Projects
            </Link>
          </li>
          <HasAccess roles={[UserRole.Manager, UserRole.Admin]}>
            <li>
              <Link to="/users">
                <i className="fas fa-users" />
                Users
              </Link>
            </li>
          </HasAccess>
          <li>
            <Link to="/groups">
              <i className="fas fa-users" />
              Groups
            </Link>
          </li>
          <HasAccess roles={[UserRole.Manager, UserRole.Admin]}>
            <li>
              <Link to="/timesheet-templates">
                <i className="fas fa-users" />
                Timesheet Templates
              </Link>
            </li>
          </HasAccess>
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
