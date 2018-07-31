import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { LayoutDefault, HasAccess } from '../components';
import { getIsAuthed } from '../../auth/store/selectors';
import { UserRole } from '../../users/store/models';
import { getIsInitialized } from '../store/selectors';

export interface ProtectedRouteProps {
  component: any;
  isAuthed: boolean;
  exact?: boolean;
  initialized: boolean;
  path: string;
  roles?: UserRole[];
}

const ProtectedRoute: React.SFC<ProtectedRouteProps> = ({
  component: Component,
  roles,
  isAuthed,
  initialized,
  ...rest
}) => {
  if (!initialized) {
    // TODO: return spinning loader
    return <div>Loading</div>;
  }
  return (
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
};

const mapStateToProps = (state: any) => ({
  isAuthed: getIsAuthed(state),
  initialized: getIsInitialized(state),
});

export default connect(mapStateToProps)(ProtectedRoute);
