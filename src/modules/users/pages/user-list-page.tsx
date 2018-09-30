import * as React from 'react';
import { Button, StatusColor, TableBuilder, Table } from 'genui';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { compose, withHandlers, branch, renderNothing } from 'recompose';

import { PageHeader, Translate, Avatar } from '../../common';
import styled from '../../../styled/styled-components';
import { GET_USERS } from '../store/queries';
import { DELETE_USER, DISABLE_USER, ENABLE_USER } from '../store/mutations';

type Props = {};
type DataProps = {
  users: any[];
  disableUser(options: any): any;
  enableUser(options: any): any;
  deleteUser(options: any): any;
};
type HandlerProps = {
  onRemove(userId: string): any;
  onDisableUser(userId: string, disable: boolean): any;
};
type EnhancedProps = Props & DataProps & HandlerProps;

const UserListPage: React.SFC<EnhancedProps> = ({ users, onDisableUser }) => (
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
              <Link to={`/user/${item.id}`}>{`${item.firstName} ${
                item.lastName
              }`}</Link>
              {item.group && <span>{item.group.name}</span>}
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
              icon: item.disabled ? 'fas fa-toggle-off' : 'fas fa-toggle-on',
              onClick: () => onDisableUser(item.id, !item.disabled),
            }}
          />
        </>
      )}
    />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_USERS, {
    props: ({ data }: any) => ({
      users: data.allUsers,
      loading: data.loading,
    }),
  }),
  graphql(DELETE_USER, {
    name: 'deleteUser',
    options: {
      update: (proxy, { data: { deleteUser } }: { data: any }) => {
        const { allUsers }: any = proxy.readQuery({
          query: GET_USERS,
        });

        proxy.writeQuery({
          query: GET_USERS,
          data: {
            allUsers: allUsers.filter((user: any) => user.id !== deleteUser.id),
          },
        });
      },
    },
  }),
  graphql(DISABLE_USER, {
    name: 'disableUser',
  }),
  graphql(ENABLE_USER, {
    name: 'enableUser',
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onRemove: ({ deleteUser }) => (userId: string) => {
      deleteUser({ variables: { id: userId } });
    },
    onDisableUser: ({ disableUser, enableUser }) => (
      userId: string,
      disable: boolean
    ) => {
      if (disable) {
        disableUser({
          variables: { id: userId },
          optimisticResponse: {
            updateUser: {
              disabled: true,
              id: userId,
              __typename: 'User',
            },
          },
        });
      } else {
        enableUser({
          variables: { id: userId },
          optimisticResponse: {
            updateUser: {
              disabled: false,
              id: userId,
              __typename: 'User',
            },
          },
        });
      }
    },
  }),
  branch(({ loading }) => loading, renderNothing)
);

export default enhance(UserListPage);

const UserCell = styled(Table.Cell)`
  display: flex;

  a {
    display: block;
  }

  .avatar {
    margin-right: 10px;
  }
`;
