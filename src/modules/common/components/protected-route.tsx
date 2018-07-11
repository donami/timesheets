import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { LayoutDefault } from '../components';
import { getIsAuthed } from '../../auth/store/selectors';

export interface ProtectedRouteProps {
  component: any;
  isAuthed: boolean;
  exact?: boolean;
  path: string;
}

const ProtectedRoute: React.StatelessComponent<ProtectedRouteProps> = ({
  component: Component,
  isAuthed,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthed ? (
        <LayoutDefault>
          <Component {...props} />
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

export default connect(
  mapStateToProps,
  undefined
)(ProtectedRoute);
