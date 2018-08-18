import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { LayoutDefault, HasAccess } from '../components';
import { getIsAuthed } from '../../auth/store/selectors';
import { UserRole } from '../../users/store/models';
import { getIsInitialized, getAppIsLoading } from '../store/selectors';
import { Loader } from '../../ui';

export interface ProtectedRouteProps {
  component: any;
  appIsLoading: boolean;
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
  appIsLoading,
  ...rest
}) => {
  if (!initialized) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? (
          <LayoutDefault>
            {roles ? (
              <HasAccess roles={roles}>
                <Component isLoading={appIsLoading} {...props} />
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
  appIsLoading: getAppIsLoading(state),
});

export default connect(mapStateToProps)(ProtectedRoute);
