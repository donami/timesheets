import * as React from 'react';
import { graphql } from 'react-apollo';
import { compose, branch, renderNothing, withHandlers } from 'recompose';
import { Button, TableBuilder, Table, Icon, ActionProps } from 'genui';

import {
  getGroups,
  getGroupListPageState,
  getTotalCount,
} from '../store/selectors';
import { PageHeader, Translate } from '../../common';
import { Link } from 'react-router-dom';
import { GET_GROUPS } from '../store/queries';
import { DELETE_GROUP } from '../store/mutations';
import {
  withToastr,
  WithToastrProps,
} from '../../common/components/toastr/toastr';

type Props = {};
type HandlerProps = {
  onRemoveGroup(groupId: string): void;
};
type DataProps = {
  groups: any[];
  deleteGroup(options: any): any;
  loading: boolean;
};
type EnhancedProps = Props & HandlerProps & DataProps & WithToastrProps;

const GroupListPage: React.SFC<EnhancedProps> = ({ groups, onRemoveGroup }) => (
  <div>
    <PageHeader
      options={() => (
        <Button to="/groups/add" color="purple">
          <Translate text="groups.labels.NEW_GROUP" />
        </Button>
      )}
    >
      <Translate text="groups.labels.GROUPS" />
    </PageHeader>

    <TableBuilder
      selectable
      items={groups}
      itemsOptions={(item: any) => [
        {
          label: 'View group',
          icon: 'fas fa-eye',
          to: `/group/${item.id}`,
        },
      ]}
      renderHeaders={
        <>
          <Table.HeaderCell sortableBy="id">ID</Table.HeaderCell>
          <Table.HeaderCell sortableBy="name">Name</Table.HeaderCell>
          <Table.HeaderCell sortableBy="project">Project</Table.HeaderCell>
          <Table.HeaderCell length="5%" />
          <Table.HeaderCell length="5%" />
          <Table.HeaderCell length="5%" />
        </>
      }
      renderItem={(item: any) => {
        return (
          <>
            <Table.Cell>
              <Link to={`/group/${item.id}`}>#{item.id}</Link>
            </Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>
              {(item.project && item.project.name) || 'No project'}
            </Table.Cell>

            <Table.Cell
              option={{
                icon: 'fas fa-pencil-alt',
                to: `/group/${item.id}/edit`,
              }}
            />
            <Table.Cell
              option={{
                confirm: {
                  trigger: <Icon name="fas fa-trash" title="Remove" />,
                  content: `Do you really want to remove "${item.name}"?`,
                  onActionClick: (
                    e: React.MouseEvent<HTMLElement>,
                    actionProps: ActionProps
                  ) => {
                    if (actionProps.positive) {
                      onRemoveGroup(item.id);
                    }
                  },
                },
              }}
            />
          </>
        );
      }}
    />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  withToastr,
  graphql(GET_GROUPS, {
    props: ({ data }: any) => ({
      groups: data.allGroups,
      loading: data.loading,
    }),
  }),
  graphql(DELETE_GROUP, {
    name: 'deleteGroup',
    options: {
      update: (proxy, { data: { deleteGroup } }: { data: any }) => {
        const { allGroups }: any = proxy.readQuery({
          query: GET_GROUPS,
        });

        proxy.writeQuery({
          query: GET_GROUPS,
          data: {
            allGroups: allGroups.filter(
              (group: any) => group.id !== deleteGroup.id
            ),
          },
        });
      },
    },
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onRemoveGroup: ({ deleteGroup, addToast }) => async (id: string) => {
      await deleteGroup({ variables: { id } });
      await addToast(
        'Group was removed',
        'Group was successfully removed',
        'positive'
      );
    },
  }),
  branch<EnhancedProps>(({ loading }) => loading, renderNothing)
);

export default enhance(GroupListPage);
