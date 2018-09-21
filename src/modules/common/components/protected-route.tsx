import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

import { LayoutDefault, HasAccess } from '../components';
import { UserRole } from '../../users/store/models';
import { compose, renderNothing, branch } from 'recompose';
import { LOGGED_IN_USER } from '../../auth/store/queries';

type Props = {
  component: any;
  exact?: boolean;
  path: string;
  roles?: UserRole[];
  user: { id: string } | null;
  loading: boolean;
};

const ProtectedRoute: React.SFC<Props> = ({
  component: Component,
  roles,
  user,
  loading,
  ...rest
}) => {
  if (!user) {
    <Redirect to="/auth" />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
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

const enhance = compose<any, any>(
  graphql(LOGGED_IN_USER, {
    props: ({ data }: any) => ({
      user: data.user || null,
      loading: data.loading,
    }),
    options: { fetchPolicy: 'network-only' },
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(ProtectedRoute);
