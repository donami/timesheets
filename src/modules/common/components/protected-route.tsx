import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { LayoutDefault, HasAccess } from '../components';
import { getIsAuthed } from '../../auth/store/selectors';
import { UserRole } from '../../users/store/models';

export interface ProtectedRouteProps {
  component: any;
  isAuthed: boolean;
  exact?: boolean;
  path: string;
  roles?: UserRole[];
}

const ProtectedRoute: React.SFC<ProtectedRouteProps> = ({
  component: Component,
  roles,
  isAuthed,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthed ? (
        <LayoutDefault>
          {roles ? (
            <HasAccess roles={roles}>
              <Component {...props} />
            </HasAccess>
          ) : (
            <Component {...props} />
          )}
        </LayoutDefault>
      ) : (
        <Redirect to="/auth" />
      )
    }
  />
);

const mapStateToProps = (state: any) => ({
  isAuthed: getIsAuthed(state),
});

export default connect(mapStateToProps)(ProtectedRoute);
