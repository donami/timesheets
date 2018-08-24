import React from 'react';
import { connect } from 'react-redux';
import { Icon, StatusColor } from 'genui';

import { Translate, PageHeader, Select } from '../../common';
import { Table } from '../../ui';
import { TimesheetItem, TimesheetStatus } from '../store/models';
import { getTimesheets } from '../store/selectors';
import { Link } from 'react-router-dom';
import { parseDate } from '../../../utils/helpers';
import TableBuilder from '../../ui/components/table/table-builder';
import { getUserEntities } from '../../users/store/selectors';
import { User } from '../../users/store/models';
import { getStatusColor } from '../utils';
import { bindActionCreators } from 'redux';
import { removeTimesheet } from '../store/actions';

type Props = {
  timesheets: TimesheetItem[];
  removeTimesheet(timesheetId: number): any;
  usersById: { [key: number]: User };
};

type State = Readonly<{}>;

const initialState: State = {};

const getUniqueMonths = (timesheets: TimesheetItem[]) => {
  const months = timesheets.map(timesheet => timesheet.periodStart);

  return [...new Set(months)];
};

class ManageTimesheets extends React.Component<Props> {
  readonly state = initialState;

  handleRemoveTimesheet = (timesheetId: number) => {
    this.props.removeTimesheet(timesheetId);
  };

  render() {
    const { usersById, timesheets } = this.props;
    const uniqueMonths = getUniqueMonths(this.props.timesheets);

    return (
      <div>
        <PageHeader>
          <Translate text="timesheet.labels.MANAGE_TIMESHEETS" />
        </PageHeader>

        <TableBuilder
          selectable
          items={timesheets}
          filters={[
            {
              label: 'Status',
              placeholder: 'Filter by status',
              property: 'status',
              filterAs: (item: any, filterState: any) => {
                return item.status === filterState.status;
              },
              options: [
                {
                  label: TimesheetStatus.Approved,
                  value: TimesheetStatus.Approved,
                },
                {
                  label: TimesheetStatus.InProgressSaved,
                  value: TimesheetStatus.InProgressSaved,
                },
                {
                  label: TimesheetStatus.NeedsRevisement,
                  value: TimesheetStatus.NeedsRevisement,
                },
                {
                  label: TimesheetStatus.InProgress,
                  value: TimesheetStatus.InProgress,
                },
                {
                  label: TimesheetStatus.WaitingForApproval,
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
          itemsOptions={(item: any) => [
            {
              label: 'View timesheet',
              icon: 'fas fa-eye',
              to: `/timesheet/${item.id}`,
            },
          ]}
          renderHeaders={
            <>
              <Table.HeaderCell sortableBy="id">ID</Table.HeaderCell>
              <Table.HeaderCell sortableBy="status">Status</Table.HeaderCell>
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
                <Link to={`/user/${item.owner}`}>
                  {(usersById[item.owner] && usersById[item.owner].fullName) ||
                    item.owner}
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
                  icon: 'fa fa-trash-alt',
                  onClick: () => {
                    this.handleRemoveTimesheet(item.id);
                  },
                }}
              />
            </>
          )}
        />
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    timesheets: getTimesheets(state),
    usersById: getUserEntities(state),
  }),
  (dispatch: any) => bindActionCreators({ removeTimesheet }, dispatch)
)(ManageTimesheets);
