import React from 'react';
import { connect } from 'react-redux';

import { getAuthedUserRole } from '../../auth/store/selectors';
import { UserRole } from '../../users/store/models';
import DashboardManagerPage from './dashboard-manager-page';
import DashboardUserPage from './dashboard-user-page';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';
import { LOGGED_IN_USER } from '../../auth/store/queries';

export interface DashboardPageProps {
  userRole: UserRole;
}

class DashboardPage extends React.Component<EnhancedProps> {
  render() {
    // const { userRole } = this.props;

    // if (userRole === UserRole.Admin || userRole === UserRole.Manager) {
    //   return <DashboardManagerPage />;
    // }
    // return <DashboardUserPage />;
    return null;
  }
}

// const mapStateToProps = (state: any) => ({
//   userRole: getAuthedUserRole(state),
// });

// export default connect(mapStateToProps)(DashboardPage);

type Props = {};
type DataProps = { userRole: UserRole; loading: boolean };
type EnhancedProps = Props & DataProps;

const enhance = compose<EnhancedProps, Props>(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      userRole: (data.loggedInUser && data.loggedInUser.role) || null,
      loading: data.loading,
    }),
  }),
  branch<EnhancedProps>(props => props.loading, renderNothing),
  branch<EnhancedProps>(
    ({ userRole }) =>
      userRole === UserRole.Admin || userRole === UserRole.Manager,
    renderComponent(DashboardManagerPage),
    renderComponent(DashboardUserPage)
  )
);

export default enhance(DashboardPage);
