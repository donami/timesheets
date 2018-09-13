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
import { List } from '../../common';

const getUserLink = (timesheet: any, users?: any) => {
  if (!users || !timesheet.owner) {
    return null;
  }

  const user = users[timesheet.owner];

  if (!user) {
    return null;
  }

  return <Link to={`/user/${user.id}`}>{user.fullName}</Link>;
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

type Props = ListProps & {
  items: TimesheetItem[];
  noTimesheetsText?: string;
  disableFilter?: boolean;
  includeUser?: boolean;
  users?: { [key: number]: User };
  indicateDueDate?: boolean;
  sortFunction?(item: TimesheetItem, other: TimesheetItem): number;
  itemRenderer?(item: TimesheetItem, index: number): JSX.Element;
};

const TimesheetList: React.SFC<Props> = ({
  items,
  includeUser,
  pageSize,
  itemRenderer,
  paginated,
  filter,
  limit,
}) => {
  return (
    <Container className="timesheet-list">
      <Headings className="timesheet-list-headings">
        <div>ID</div>
        <div>Period</div>
        {includeUser && <div>User</div>}
        <div>Status</div>
      </Headings>
      <StyledList
        items={items}
        pageSize={pageSize}
        limit={limit}
        paginated={paginated}
        filter={filter}
        renderItem={itemRenderer}
        className="timesheet-list-content"
      />
    </Container>
  );
};

export default compose<Props, Props>(
  defaultProps({
    noTimesheetsText: 'No timesheets',
    disableFilter: false,
    includeUser: false,
    indicateDueDate: false,
    paginated: false,
    pageSize: 10,
  }),
  mapProps((props: Props) => {
    const newProps = {
      ...props,
      // If disableFilter is true, there should be
      // no filtering of future timesheets
      items: props.disableFilter
        ? props.items.filter(filterOutFutureTimesheets)
        : props.items,
      itemRenderer: (item: TimesheetItem, index: number) => {
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
          newItem.user = getUserLink(item, props.users);
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
  }
`;

const Headings = styled(Row)`
  border: #ccc 1px solid;
  font-weight: 700;
`;
