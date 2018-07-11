import React from 'react';
import { connect } from 'react-redux';
import { UserRole } from '../../auth/store/models';
import { getAuthedUserRole } from '../../auth/store/selectors';

type Props = {
  userRole: UserRole;
  roles: UserRole[];
};

const isAllowed = (userRole: UserRole, allowedRoles: UserRole[]) => {
  return allowedRoles.indexOf(userRole) > -1;
};

class HasAccess extends React.Component<Props> {
  render() {
    if (!isAllowed(this.props.userRole, this.props.roles)) {
      return null;
    }

    return <>{this.props.children}</>;
  }
}

const mapStateToProps = (state: any) => ({
  userRole: getAuthedUserRole(state),
});

export default connect(mapStateToProps)(HasAccess);
