import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Button } from 'genui';

import { getAuthedUser } from '../store/selectors';
import { User, UserRole } from '../../users/store/models';
import { Box } from '../../ui';
import { TimesheetItem } from '../../timesheets/store/models';
import { getTimesheetsForAuthedUser } from '../../common/store/selectors';
import { TimesheetList } from '../../timesheets';
import { PageHeader } from '../../common';
import { fetchProjects } from '../../projects/store/actions';
import { Switch, Route } from 'react-router';
import { updateProfile } from '../store/actions';
import {
  EditPasswordForm,
  EditProfileForm,
  EditAvatarForm,
} from '../components';

type Props = {
  user: User;
  timesheets: TimesheetItem[];
  match: any;
  fetchProjects(): any;
  updateProfile(data: any): any;
};

class ProfilePage extends React.Component<Props> {
  componentWillMount() {
    this.props.fetchProjects();
  }

  handleUpdateProfile = (data: any) => {
    this.props.updateProfile(data);
  };

  render() {
    const {
      user,
      timesheets,
      match: { params },
    } = this.props;

    return (
      <div>
        <PageHeader
          options={() => {
            if (params.page && params.page === 'edit') {
              return <Button to="/profile">Cancel</Button>;
            }
            return <Button to="/profile/edit" icon="fas fa-cog" />;
          }}
        >
          Your Profile
        </PageHeader>

        <Switch>
          <Route
            path={`/profile/edit`}
            render={props => (
              <>
                <Box title="Profile settings">
                  <EditProfileForm
                    initialValues={user}
                    onUpdateProfile={this.handleUpdateProfile}
                  />
                </Box>

                <Box title="Change password">
                  <EditPasswordForm
                    initialValues={user}
                    onUpdateProfile={this.handleUpdateProfile}
                  />
                </Box>

                <Box title="Change profile image">
                  <EditAvatarForm
                    initialValues={user}
                    onUpdateProfile={this.handleUpdateProfile}
                  />
                </Box>
              </>
            )}
          />
          <Route
            path={`/profile`}
            render={props => (
              <>
                <Box title="Profile">
                  <List divided>
                    <List.Item>
                      Name: {`${user.firstname} ${user.lastname}`}
                    </List.Item>
                    <List.Item>Role: {user.role}</List.Item>
                  </List>
                </Box>

                {user.role === UserRole.User && (
                  <Box title="Your Timesheets">
                    <TimesheetList timesheets={timesheets} />
                  </Box>
                )}
              </>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: getAuthedUser(state),
  timesheets: getTimesheetsForAuthedUser(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchProjects,
      updateProfile,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
