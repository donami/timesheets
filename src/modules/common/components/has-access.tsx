import React from 'react';
import { connect } from 'react-redux';
import { getAuthedUserRole } from '../../auth/store/selectors';
import { UserRole } from '../../users/store/models';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import { LOGGED_IN_USER } from '../../auth/store/queries';

// type Props = {
//   userRole: UserRole;
//   roles: UserRole[];
// };

const isAllowed = (userRole: UserRole, allowedRoles: UserRole[]) => {
  return allowedRoles.indexOf(userRole) > -1;
};

// class HasAccess extends React.Component<Props> {
//   render() {
// if (!isAllowed(this.props.userRole, this.props.roles)) {
//   return null;
// }

//     return <>{this.props.children}</>;
//   }
// }

// const mapStateToProps = (state: any) => ({
//   userRole: getAuthedUserRole(state),
// });

// export default connect(mapStateToProps)(HasAccess);

type Props = {
  roles: UserRole[];
};

type DataProps = {
  userRole: UserRole;
};

type EnhancedProps = Props & DataProps;

const HasAccess: React.SFC<EnhancedProps> = ({ children }) => {
  return <>{children}</>;
};

const enhance = compose<EnhancedProps, Props>(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      userRole: (data.loggedInUser && data.loggedInUser.role) || null,
    }),
  }),
  branch<EnhancedProps>(
    ({ userRole, roles }) => !isAllowed(userRole, roles) || !userRole,
    renderNothing
  )
);

export default enhance(HasAccess);
