import * as React from 'react';
import { Button, TableBuilder, Table, Icon, ActionProps } from 'genui';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { compose, withHandlers, branch, renderNothing } from 'recompose';

import { PageHeader, Translate } from '../../common';
import { GET_TEMPLATES } from '../store/queries';
import { DELETE_TEMPLATE } from '../store/mutations';

type Props = {};

type DataProps = {
  templates: any[];
  loading: boolean;
  deleteTemplate(options: any): any;
};

type HandlerProps = {
  onRemoveTemplate(templateId: string): void;
};

type EnhancedProps = Props & DataProps & HandlerProps;

const TimesheetTemplatesPage: React.SFC<EnhancedProps> = ({
  templates,
  onRemoveTemplate,
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

    <TableBuilder
      selectable
      items={templates}
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
          <Table.HeaderCell sortableBy="name">Name</Table.HeaderCell>
          <Table.HeaderCell length="5%" />
          <Table.HeaderCell length="5%" />
          <Table.HeaderCell length="5%" />
        </>
      }
      renderItem={(item: any) => (
        <>
          <Table.Cell>
            <Link to={`/timesheet-template/${item.id}`}>#{item.id}</Link>
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
              confirm: {
                trigger: <Icon name="fas fa-trash" title="Remove" />,
                content: `Do you really want to remove "${item.name}"?`,
                onActionClick: (
                  e: React.MouseEvent<HTMLElement>,
                  actionProps: ActionProps
                ) => {
                  if (actionProps.positive) {
                    onRemoveTemplate(item.id);
                  }
                },
              },
            }}
          />
        </>
      )}
    />
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(GET_TEMPLATES, {
    props: ({ data }: any) => ({
      templates: data.allTemplates,
      loading: data.loading,
    }),
  }),
  graphql(DELETE_TEMPLATE, {
    name: 'deleteTemplate',
    options: {
      update: (proxy, { data: { deleteTemplate } }: { data: any }) => {
        const { allTemplates }: any = proxy.readQuery({
          query: GET_TEMPLATES,
        });

        proxy.writeQuery({
          query: GET_TEMPLATES,
          data: {
            allTemplates: allTemplates.filter(
              (template: any) => template.id !== deleteTemplate.id
            ),
          },
        });
      },
    },
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onRemoveTemplate: ({ deleteTemplate }) => (id: string) => {
      deleteTemplate({ variables: { id } });
    },
  }),
  branch<EnhancedProps>(({ loading }) => loading, renderNothing)
);

export default enhance(TimesheetTemplatesPage);
