import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, StatusColor, TableBuilder, Table } from 'genui';

import { getUsers } from '../store/selectors';
import { fetchUsersIfNeeded, disableUser, enableUser } from '../store/actions';
import { User } from '../store/models';
import { PageHeader, Translate, Avatar } from '../../common';
import { Link } from 'react-router-dom';
import styled from '../../../styled/styled-components';
import { getGroupEntities } from '../../groups/store/selectors';

export interface UserListPageProps {
  fetchUsersIfNeeded: () => any;
  disableUser: (userId: number) => any;
  enableUser: (userId: number) => any;
  users: User[];
  groupsById: any;
}

class UserListPage extends React.Component<UserListPageProps> {
  componentWillMount() {
    this.props.fetchUsersIfNeeded();
  }

  handleDisableUser = (user: User) => {
    if (user.disabled) {
      this.props.enableUser(user.id);
    } else {
      this.props.disableUser(user.id);
    }
  };

  render() {
    const { users, groupsById } = this.props;

    return (
      <div>
        <PageHeader
          options={() => (
            <Button to="/users/add" color="purple">
              <Translate text="users.labels.NEW_USER" />
            </Button>
          )}
        >
          <Translate text="users.labels.USERS" />
        </PageHeader>

        <TableBuilder
          selectable
          items={users}
          filters={[
            {
              label: 'Status',
              placeholder: 'Filter by status',
              property: 'disabled',
              filterAs: (item: any, filterState: any) => {
                return item.disabled === filterState.disabled;
              },
              options: [
                {
                  label: 'Disabled',
                  value: true,
                },
                {
                  label: 'Active',
                  value: false,
                },
              ],
            },
            {
              label: 'Name',
              placeholder: 'Filter by name',
              inputType: 'text',
              property: 'fullName',
              filterAs: (item: any, filterState: any) => {
                const regex = new RegExp(filterState.fullName, 'i');
                return item.fullName.match(regex);
              },
              options: [
                {
                  label: 'Disabled',
                  value: true,
                },
                {
                  label: 'Active',
                  value: false,
                },
              ],
            },
          ]}
          itemsOptions={(item: any) => [
            {
              label: 'View user',
              icon: 'fas fa-eye',
              to: `/user/${item.id}`,
            },
          ]}
          renderHeaders={
            <>
              <Table.HeaderCell sortableBy="id">ID</Table.HeaderCell>
              <Table.HeaderCell sortableBy="fullName">User</Table.HeaderCell>
              <Table.HeaderCell sortableBy="disabled">Status</Table.HeaderCell>
              <Table.HeaderCell length="5%" />
              <Table.HeaderCell length="5%" />
              <Table.HeaderCell length="5%" />
            </>
          }
          renderItem={(item: any) => (
            <>
              <Table.Cell>
                <Link to={`/user/${item.id}`}>#{item.id}</Link>
              </Table.Cell>
              <UserCell>
                <Avatar view="sm" avatar={item.image} gender={item.gender} />
                <div>
                  <Link to={`/user/${item.id}`}>{item.fullName}</Link>
                  {item.group && <span>{groupsById[item.group].name}</span>}
                  {!item.group && <em>No group</em>}
                </div>
              </UserCell>
              <Table.Cell>
                <StatusColor
                  style={{ marginRight: 5 }}
                  positive={!item.disabled}
                  negative={item.disabled}
                />
              </Table.Cell>
              <Table.Cell
                option={{
                  icon: 'fas fa-pencil-alt',
                  to: `/user/${item.id}/edit`,
                }}
              />
              <Table.Cell
                option={{
                  icon: item.disabled
                    ? 'fas fa-toggle-off'
                    : 'fas fa-toggle-on',
                  onClick: () => this.handleDisableUser(item),
                }}
              />
            </>
          )}
        />

        {/* <UserList users={users} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: getUsers(state),
  groupsById: getGroupEntities(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchUsersIfNeeded,
      disableUser,
      enableUser,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListPage);

const UserCell = styled(Table.Cell)`
  display: flex;

  a {
    display: block;
  }

  .avatar {
    margin-right: 10px;
  }
`;
