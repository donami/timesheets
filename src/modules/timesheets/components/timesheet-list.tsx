import React from 'react';
import { compose, mapProps, defaultProps } from 'recompose';
import { Link } from 'react-router-dom';

import styled from '../../../styled/styled-components';
import { TimesheetStatus, TimesheetItem } from '../store/models';
import { monthIsInPast, dateFormat } from '../../../utils/calendar';
import { Label, StatusColor } from 'genui';
import {
  getStatusColor,
  displayTimesheetStatus,
  filterOutFutureTimesheets,
} from '../utils';
import { User } from '../../users/store/models';
import { ListProps } from '../../common/components/list/list';
import List from '../../common/components/list';

const getUserLink = (timesheet: any) => {
  if (!timesheet.owner) {
    return null;
  }

  const user = timesheet.owner;

  if (!user) {
    return null;
  }

  return (
    <Link to={`/user/${user.id}`}>{`${user.firstName} ${user.lastName}`}</Link>
  );
};

const renderPastDueDate = (
  date: string,
  status: TimesheetStatus,
  indicateDueDate: boolean
) => {
  if (!indicateDueDate) {
    return null;
  }

  if (
    monthIsInPast(date) &&
    [TimesheetStatus.InProgress, TimesheetStatus.InProgressSaved].indexOf(
      status
    ) > -1
  ) {
    return (
      <Label color="red" style={{ float: 'right' }}>
        Past due date
      </Label>
    );
  }
  return null;
};

type Props = {
  items: TimesheetItem[];
  noTimesheetsText?: string;
  disableFilter?: boolean;
  includeUser?: boolean;
  users?: { [key: number]: User };
  paginated?: boolean;
  noItemsText?: string;
  pageSize?: number;
  limit?: number;
  indicateDueDate?: boolean;
  sortFunction?(item: TimesheetItem, other: TimesheetItem): number;
};

type EnhancedProps = Props & ListProps;

const TimesheetList: React.SFC<EnhancedProps> = ({
  items,
  includeUser,
  pageSize,
  renderItem,
  paginated,
  noItemsText,
  filter,
  limit,
}) => {
  return (
    <Container className="timesheet-list">
      <StyledList
        items={items}
        pageSize={pageSize}
        limit={limit}
        paginated={paginated}
        noItemsText={noItemsText}
        filter={filter}
        renderItem={renderItem}
        header={
          <Headings className="timesheet-list-headings">
            <div>ID</div>
            <div>Period</div>
            {includeUser && <div>User</div>}
            <div>Status</div>
          </Headings>
        }
        className="timesheet-list-content"
      />
    </Container>
  );
};

export default compose<EnhancedProps, Props>(
  defaultProps({
    noTimesheetsText: 'No timesheets',
    disableFilter: false,
    includeUser: false,
    indicateDueDate: false,
    paginated: false,
    pageSize: 10,
  }),
  mapProps<any, Props>(props => {
    const newProps = {
      ...props,
      // If disableFilter is true, there should be
      // no filtering of future timesheets
      items: props.disableFilter
        ? props.items.filter(filterOutFutureTimesheets)
        : props.items,
      renderItem: (item: TimesheetItem, index: number) => {
        const newItem: any = {
          id: <Link to={`/timesheet/${item.id}`}>{item.id}</Link>,
          period: dateFormat(item.periodStart, 'MMMM, YYYY'),
          status: (
            <>
              <StatusColor
                style={{ marginRight: 5 }}
                {...getStatusColor(item.status)}
              />
              <span>{displayTimesheetStatus(item.status)}</span>
              {renderPastDueDate(
                item.periodStart,
                item.status,
                props.indicateDueDate || false
              )}
            </>
          ),
        };

        if (props.includeUser) {
          newItem.user = getUserLink(item);
        }

        return (
          <Row key={index} className="timesheet-list-row">
            <div>{newItem.id}</div>
            <div>{newItem.period}</div>
            {newItem.user && <div>{newItem.user}</div>}
            <div>{newItem.status}</div>
          </Row>
        );
      },
    };

    return newProps;
  })
)(TimesheetList);

const StyledList = styled(List)`
  border-bottom: #ccc 1px solid;
  border-left: #ccc 1px solid;
  border-right: #ccc 1px solid;
  margin-bottom: 20px;
`;

const Container = styled.div`
  a {
    text-decoration: none;
  }
`;

const Row = styled.div`
  display: flex;

  > div {
    flex: 1;
    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Headings = styled(Row)`
  border: #ccc 1px solid;
  font-weight: 700;
`;
