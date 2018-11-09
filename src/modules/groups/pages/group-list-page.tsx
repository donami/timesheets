import * as React from 'react';
import { graphql, Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { compose, withHandlers, withState } from 'recompose';
import { Button, TableBuilder, Table } from 'genui';
import { Alert, Intent } from '@blueprintjs/core';

import { PageHeader, Translate } from '../../common';
import { GET_GROUPS } from '../store/queries';
import { DELETE_GROUP } from '../store/mutations';
import {
  withToastr,
  WithToastrProps,
} from '../../common/components/toastr/toastr';
import { PageLoader } from 'src/modules/ui';
import { CompanyContext } from '../../common/components/routing';

type Props = {};
type HandlerProps = {
  onRemoveGroup(groupId: string): void;
};
type StateProps = {
  awaitingDeleteGroup: string | boolean;
};
type DataProps = {
  setAwaitingDeleteGroup: any;
  deleteGroup(options: any): any;
};
type EnhancedProps = Props &
  HandlerProps &
  DataProps &
  StateProps &
  WithToastrProps;

const GroupListPage: React.SFC<EnhancedProps> = ({
  setAwaitingDeleteGroup,
  awaitingDeleteGroup,
  addToast,
}) => (
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
    <CompanyContext.Consumer>
      {({ company }: any) => (
        <>
          <Mutation
            mutation={DELETE_GROUP}
            update={(proxy, { data: { deleteGroup } }: { data: any }) => {
              const { allGroups }: any = proxy.readQuery({
                query: GET_GROUPS,
                variables: {
                  companyId: company.id,
                },
              });

              proxy.writeQuery({
                query: GET_GROUPS,
                variables: {
                  companyId: company.id,
                },
                data: {
                  allGroups: allGroups.filter(
                    (group: any) => group.id !== deleteGroup.id
                  ),
                },
              });
            }}
            optimisticResponse={{
              deleteGroup: {
                id: awaitingDeleteGroup,
                __typename: 'Group',
              },
            }}
          >
            {mutate => (
              <Alert
                cancelButtonText="Cancel"
                confirmButtonText="Are you sure?"
                icon="trash"
                intent={Intent.DANGER}
                isOpen={awaitingDeleteGroup !== false}
                onCancel={() => setAwaitingDeleteGroup(false)}
                onConfirm={() => {
                  if (awaitingDeleteGroup !== false) {
                    mutate({
                      variables: {
                        id: awaitingDeleteGroup,
                      },
                    });
                    addToast(
                      'Group was removed',
                      'Group was successfully removed',
                      'positive'
                    );
                  }
                  setAwaitingDeleteGroup(false);
                }}
              >
                <p>Do you really want to remove this group?</p>
              </Alert>
            )}
          </Mutation>

          <Query
            query={GET_GROUPS}
            variables={{
              companyId: company.id,
            }}
          >
            {({ data, loading }) => {
              if (loading) {
                return <PageLoader />;
              }

              return (
                <TableBuilder
                  selectable
                  items={data.allGroups}
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
                      <Table.HeaderCell sortableBy="name">
                        Name
                      </Table.HeaderCell>
                      <Table.HeaderCell sortableBy="project">
                        Project
                      </Table.HeaderCell>
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
                            icon: 'fas fa-trash',
                            onClick: () => setAwaitingDeleteGroup(item.id),
                          }}
                        />
                      </>
                    );
                  }}
                />
              );
            }}
          </Query>
        </>
      )}
    </CompanyContext.Consumer>
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  withToastr,
  withState('awaitingDeleteGroup', 'setAwaitingDeleteGroup', false)
);

export default enhance(GroupListPage);
