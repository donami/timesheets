import React from 'react';
import { connect } from 'react-redux';
import { UserRole } from '../../auth/store/models';
import { getAuthedUser } from '../../auth/store/selectors';

type Props = {
  user: any;
  roles: UserRole[];
};

const isAllowed = (userRole: UserRole, allowedRoles: UserRole[]) => {
  return allowedRoles.concat(UserRole.User).indexOf(userRole) > -1;
};

class HasAccess extends React.Component<Props> {
  render() {
    if (!isAllowed(this.props.user.role, this.props.roles)) {
      console.warn('Trying to view content that user has not access to.');
      return null;
    }

    return <>{this.props.children}</>;
  }
}

const mapStateToProps = (state: any) => ({
  user: getAuthedUser(state),
});

export default connect(mapStateToProps)(HasAccess);
