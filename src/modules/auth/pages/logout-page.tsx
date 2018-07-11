import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../store/actions';
import { getIsAuthed } from '../store/selectors';

export interface LogoutPageProps {
  logout: () => any;
  authed: boolean;
}

class LogoutPage extends React.Component<LogoutPageProps> {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: any) => ({
  authed: getIsAuthed(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      logout,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutPage);
