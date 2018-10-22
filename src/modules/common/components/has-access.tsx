import React from 'react';
import { graphql } from 'react-apollo';
import { compose, branch, renderNothing } from 'recompose';

import { UserRole } from '../../users/store/models';
import { LOGGED_IN_USER } from '../../auth/store/queries';

const isAllowed = (userRole: UserRole, allowedRoles: UserRole[]) => {
  return allowedRoles.indexOf(userRole) > -1;
};

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
      userRole: (data.user && data.user.role) || null,
    }),
  }),
  branch<EnhancedProps>(
    ({ userRole, roles }) => !isAllowed(userRole, roles) || !userRole,
    renderNothing
  )
);

export default enhance(HasAccess);
