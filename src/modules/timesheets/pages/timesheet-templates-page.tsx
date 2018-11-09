import * as React from 'react';
import { Button, TableBuilder, Table } from 'genui';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { Alert, Intent } from '@blueprintjs/core';

import { PageHeader, Translate } from '../../common';
import { GET_TEMPLATES } from '../store/queries';
import { DELETE_TEMPLATE } from '../store/mutations';
import { PageLoader } from 'src/modules/ui';
import { CompanyContext } from '../../common/components/routing';

type Props = {};

type DataProps = {
  deleteTemplate(options: any): any;
  setAwaitingDeleteTemplate: any;
};

type StateProps = {
  awaitingDeleteTemplate: string | boolean;
};

type HandlerProps = {};

type EnhancedProps = Props & DataProps & StateProps & HandlerProps;

const TimesheetTemplatesPage: React.SFC<EnhancedProps> = ({
  setAwaitingDeleteTemplate,
  awaitingDeleteTemplate,
}) => (
  <div>
    <PageHeader
      options={() => (
        <Button to="/timesheet-templates/create" color="purple">
          <Translate text="timesheetTemplates.labels.NEW_TIMESHEET_TEMPLATE" />
        </Button>
      )}
    >
      <Translate text="timesheetTemplates.labels.TIMESHEET_TEMPLATES" />
    </PageHeader>
    <CompanyContext.Consumer>
      {({ company }: any) => (
        <>
          <Mutation
            mutation={DELETE_TEMPLATE}
            update={(proxy, { data: { deleteTemplate } }: { data: any }) => {
              const { allTemplates }: any = proxy.readQuery({
                query: GET_TEMPLATES,
                variables: {
                  companyId: company.id,
                },
              });

              proxy.writeQuery({
                query: GET_TEMPLATES,
                variables: {
                  companyId: company.id,
                },
                data: {
                  allTemplates: allTemplates.filter(
                    (template: any) => template.id !== deleteTemplate.id
                  ),
                },
              });
            }}
            optimisticResponse={{
              deleteTemplate: {
                id: awaitingDeleteTemplate,
                __typename: 'Template',
              },
            }}
          >
            {mutate => (
              <Alert
                cancelButtonText="Cancel"
                confirmButtonText="Are you sure?"
                icon="trash"
                intent={Intent.DANGER}
                isOpen={awaitingDeleteTemplate !== false}
                onCancel={() => setAwaitingDeleteTemplate(false)}
                onConfirm={() => {
                  if (awaitingDeleteTemplate !== false) {
                    mutate({
                      variables: {
                        id: awaitingDeleteTemplate,
                      },
                    });
                  }
                  setAwaitingDeleteTemplate(false);
                }}
              >
                <p>Do you really want to remove this template?</p>
              </Alert>
            )}
          </Mutation>
          <Query
            query={GET_TEMPLATES}
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
                  items={data.allTemplates}
                  itemsOptions={(item: any) => [
                    {
                      label: 'View template',
                      icon: 'fas fa-eye',
                      to: `/timesheet-template/${item.id}`,
                    },
                  ]}
                  renderHeaders={
                    <>
                      <Table.HeaderCell sortableBy="id">ID</Table.HeaderCell>
                      <Table.HeaderCell sortableBy="name">
                        Name
                      </Table.HeaderCell>
                      <Table.HeaderCell length="5%" />
                      <Table.HeaderCell length="5%" />
                      <Table.HeaderCell length="5%" />
                    </>
                  }
                  renderItem={(item: any) => (
                    <>
                      <Table.Cell>
                        <Link to={`/timesheet-template/${item.id}`}>
                          #{item.id}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{item.name}</Table.Cell>

                      <Table.Cell
                        option={{
                          icon: 'fas fa-pencil-alt',
                          to: `/timesheet-template/${item.id}/edit`,
                        }}
                      />
                      <Table.Cell
                        option={{
                          icon: 'fas fa-trash',
                          onClick: () => setAwaitingDeleteTemplate(item.id),
                        }}
                      />
                    </>
                  )}
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
  withState('awaitingDeleteTemplate', 'setAwaitingDeleteTemplate', false)
);

export default enhance(TimesheetTemplatesPage);
