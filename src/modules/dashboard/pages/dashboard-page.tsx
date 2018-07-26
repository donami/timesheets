import React from 'react';
import { connect } from 'react-redux';

import { getAuthedUserRole } from '../../auth/store/selectors';
import { UserRole } from '../../users/store/models';
import DashboardManagerPage from './dashboard-manager-page';
import DashboardUserPage from './dashboard-user-page';

export interface DashboardPageProps {
  userRole: UserRole;
}

class DashboardPage extends React.Component<DashboardPageProps> {
  render() {
    const { userRole } = this.props;

    if (userRole === UserRole.Admin || userRole === UserRole.Manager) {
      return <DashboardManagerPage />;
    }
    return <DashboardUserPage />;
  }
}

const mapStateToProps = (state: any) => ({
  userRole: getAuthedUserRole(state),
});

export default connect(mapStateToProps)(DashboardPage);
