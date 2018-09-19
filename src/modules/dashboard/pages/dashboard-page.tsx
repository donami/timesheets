import React from 'react';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';

import { UserRole } from '../../users/store/models';
import DashboardManagerPage from './dashboard-manager-page';
import DashboardUserPage from './dashboard-user-page';
import { LOGGED_IN_USER } from '../../auth/store/queries';

class DashboardPage extends React.Component<EnhancedProps> {
  render() {
    return null;
  }
}

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
