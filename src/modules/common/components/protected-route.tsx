import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { LayoutDefault, HasAccess } from '../components';
import { getIsAuthed } from '../../auth/store/selectors';
import { UserRole } from '../../users/store/models';
import { getIsInitialized, getAppIsLoading } from '../store/selectors';
import { Loader } from '../../ui';
import { compose } from 'recompose';
import { LOGGED_IN_USER } from '../../auth/store/queries';
import { graphql } from 'react-apollo';

export interface ProtectedRouteProps {
  component: any;
  appIsLoading: boolean;
  isAuthed: boolean;
  exact?: boolean;
  initialized: boolean;
  path: string;
  roles?: UserRole[];
  loggedInUser: { id: string } | null;
  loading: boolean;
}

const ProtectedRoute: React.SFC<ProtectedRouteProps> = ({
  component: Component,
  roles,
  isAuthed,
  initialized,
  loggedInUser,
  appIsLoading,
  loading,
  ...rest
}) => {
  if (!initialized) {
    return <Loader />;
  }

  if (!loggedInUser) {
    <Redirect to="/auth" />;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  // return (
  //   <Route {...rest} render={props => <LayoutDefault>hej</LayoutDefault>} />
  // );

  return (
    <Route
      {...rest}
      render={props =>
        loggedInUser ? (
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

// export default connect(mapStateToProps)(ProtectedRoute);

const enhance = compose<any, any>(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      loggedInUser: data.loggedInUser || null,
      loading: data.loading,
    }),
    options: { fetchPolicy: 'network-only' },
  }),
  connect(mapStateToProps)
);

export default enhance(ProtectedRoute);
