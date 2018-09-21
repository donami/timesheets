import React from 'react';
import { List, Button } from 'genui';

import { UserRole } from '../../users/store/models';
import { Box, Column, Row } from '../../ui';
import { AuthedUserTimesheets } from '../../timesheets';
import { PageHeader, Avatar } from '../../common';
import { Switch, Route } from 'react-router';
import {
  EditPasswordForm,
  EditProfileForm,
  EditAvatarForm,
} from '../components';
import { Link } from 'react-router-dom';
import styled from '../../../styled/styled-components';
import { compose, branch, renderNothing } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { UPDATE_USER } from '../../users/store/mutations';
import { withToastr, WithToastrProps } from '../../common/components/toastr';

type Props = {
  user: any;
  match: any;
};
type DataProps = {
  user: any;
  loading: boolean;
  updateUser(options: any): Promise<any>;
};
type EnhancedProps = Props & DataProps & WithToastrProps;

class ProfilePage extends React.Component<EnhancedProps> {
  handleUpdateProfile = async (data: any) => {
    await this.props.updateUser({
      variables: {
        id: data.id,
        // email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
      },
    });

    this.props.addToast(
      'Profile updated',
      'Your profile was updated.',
      'positive'
    );
  };

  render() {
    const {
      user,
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

        <Row>
          <Column sm={3} md={2}>
            <UserLeftNode>
              <UserCard>
                <Avatar view="lg" avatar={user.image} gender={user.gender} />

                <h3>{user.fullName}</h3>
                <Link to="/profile/edit">Edit Profile</Link>
              </UserCard>
            </UserLeftNode>
          </Column>
          <Column sm={9} md={10}>
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

                    {/* <Box title="Change password">
                      <EditPasswordForm
                        initialValues={user}
                        onUpdateProfile={this.handleUpdateProfile}
                      />
                    </Box> */}

                    <Box title="Change profile image">
                      <EditAvatarForm initialValues={user} />
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
                          Name: {`${user.firstName} ${user.lastName}`}
                        </List.Item>
                        <List.Item>Role: {user.role}</List.Item>
                      </List>
                    </Box>

                    {user.role === UserRole.User && (
                      <Box title="Your Timesheets">
                        <AuthedUserTimesheets userId={user.id} />
                      </Box>
                    )}
                  </>
                )}
              />
            </Switch>
          </Column>
        </Row>
      </div>
    );
  }
}

const GET_PROFILE = gql`
  query user {
    user {
      id
      firstName
      lastName
      email
      image {
        __typename
        id
        name
        url
      }
      role
      gender
    }
  }
`;

const enhance = compose(
  withToastr,
  graphql(GET_PROFILE, {
    props: ({ data }: any) => ({
      user: data.user,
      loading: data.loading,
    }),
  }),
  graphql(UPDATE_USER, { name: 'updateUser' }),
  branch(({ loading, user }) => loading || !user, renderNothing)
);

export default enhance(ProfilePage);

const UserLeftNode = styled.div`
  background: #fff;

  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
`;

const UserCard = styled.div`
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 300;
  }

  img {
    max-width: 90px;
  }

  a {
    color: #9ea1a8;
    text-decoration: none;

    &:hover {
      color: ${props => props.theme.primaryColor};
    }
  }

  margin-bottom: 20px;
`;
