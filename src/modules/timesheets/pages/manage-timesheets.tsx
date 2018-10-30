import React from 'react';
import { StatusColor, Table, TableBuilder, Icon, ActionProps } from 'genui';
import { graphql, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

import { Translate, PageHeader } from '../../common';
import { TimesheetItem, TimesheetStatus } from '../store/models';
import { parseDate } from '../../../utils/helpers';
import { getStatusColor } from '../utils';
import { GET_TIMESHEETS } from '../store/queries';
import { DELETE_TIMESHEET } from '../store/mutations';
import { PageLoader } from 'src/modules/ui';
import { CompanyContext } from '../../common/components/routing';

type Props = {};
type DataProps = {
  loading: boolean;
  deleteTimesheet(options: any): any;
};
type HandlerProps = { onDeleteTimesheet: any };
type EnhancedProps = Props & DataProps & HandlerProps;

const getUniqueMonths = (timesheets: TimesheetItem[]) => {
  const months = timesheets.map(timesheet => timesheet.periodStart);

  return [...new Set(months)];
};

const ManageTimesheets: React.SFC<EnhancedProps> = ({ onDeleteTimesheet }) => {
  return (
    <div>
      <PageHeader>
        <Translate text="timesheet.labels.MANAGE_TIMESHEETS" />
      </PageHeader>

      <CompanyContext.Consumer>
        {(companyContext: any) => (
          <Query
            query={GET_TIMESHEETS}
            variables={{ companyId: companyContext.company.id }}
          >
            {({ data, loading }) => {
              if (loading) {
                return <PageLoader />;
              }

              const uniqueMonths = getUniqueMonths(data.allTimesheets);

              return (
                <TableBuilder
                  selectable
                  items={data.allTimesheets}
                  itemsOptions={(item: any) => [
                    {
                      label: 'View timesheet',
                      icon: 'fas fa-eye',
                      to: `/timesheet/${item.id}`,
                    },
                  ]}
                  filters={[
                    {
                      label: 'Status',
                      placeholder: 'Filter by status',
                      property: 'status',
                      filterAs: (item: any, filterState: any) => {
                        return item.status === filterState.status;
                      },
                      options: [
                        { label: 'Approved', value: TimesheetStatus.Approved },
                        {
                          label: 'In Progress (Saved)',
                          value: TimesheetStatus.InProgressSaved,
                        },
                        {
                          label: 'Needs Revisement',
                          value: TimesheetStatus.NeedsRevisement,
                        },
                        {
                          label: 'In Progress',
                          value: TimesheetStatus.InProgress,
                        },
                        {
                          label: 'Waiting for Approval',
                          value: TimesheetStatus.WaitingForApproval,
                        },
                      ],
                    },
                    {
                      label: 'Month',
                      placeholder: 'Filter by month',
                      property: 'month',
                      filterAs: (item: any, filterState: any) => {
                        return item.periodStart === filterState.month;
                      },
                      options: uniqueMonths.map(month => {
                        return {
                          label: parseDate(month, 'MMM, YYYY'),
                          value: month,
                        };
                      }),
                    },
                  ]}
                  renderHeaders={
                    <>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell sortableBy="status">
                        Status
                      </Table.HeaderCell>
                      <Table.HeaderCell>Month</Table.HeaderCell>
                      <Table.HeaderCell>User</Table.HeaderCell>
                      <Table.HeaderCell length="5%" />
                      <Table.HeaderCell length="5%" />
                      <Table.HeaderCell length="5%" />
                    </>
                  }
                  renderItem={(item: any) => (
                    <>
                      <Table.Cell>
                        <Link to={`/timesheet/${item.id}`}>#{item.id}</Link>
                      </Table.Cell>
                      <Table.Cell>
                        <StatusColor
                          style={{ marginRight: 5 }}
                          {...getStatusColor(item.status)}
                        />
                        <Translate text={`timesheet.status.${item.status}`} />
                      </Table.Cell>
                      <Table.Cell>
                        {parseDate(item.periodStart, 'MMM, YYYY')}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/user/${item.owner.id}`}>
                          {`${item.owner.firstName} ${item.owner.lastName}`}
                        </Link>
                      </Table.Cell>
                      <Table.Cell
                        option={{
                          icon: 'fas fa-pencil-alt',
                          to: `/timesheet/${item.id}`,
                        }}
                      />
                      <Table.Cell
                        option={{
                          confirm: {
                            trigger: (
                              <Icon name="fas fa-trash" title="Remove" />
                            ),
                            content: `Do you really want to remove this timesheet?`,
                            onActionClick: (
                              e: React.MouseEvent<HTMLElement>,
                              actionProps: ActionProps
                            ) => {
                              if (actionProps.positive) {
                                onDeleteTimesheet(item.id);
                              }
                            },
                          },
                        }}
                      />
                    </>
                  )}
                />
              );
            }}
          </Query>
        )}
      </CompanyContext.Consumer>
    </div>
  );
};

const enhance = compose<EnhancedProps, Props>(
  graphql(DELETE_TIMESHEET, {
    name: 'deleteTimesheet',
    options: {
      update: (proxy, { data: { deleteTimesheet } }: { data: any }) => {
        const { allTimesheets }: any = proxy.readQuery({
          query: GET_TIMESHEETS,
        });

        proxy.writeQuery({
          query: GET_TIMESHEETS,
          data: {
            allTimesheets: allTimesheets.filter(
              (timesheet: any) => timesheet.id !== deleteTimesheet.id
            ),
          },
        });
      },
    },
  }),
  withHandlers<EnhancedProps, HandlerProps>({
    onDeleteTimesheet: props => (id: string) => {
      props.deleteTimesheet({ variables: { id } });
    },
  })
);

export default enhance(ManageTimesheets);
