// import * as React from 'react';
// import { Link } from 'react-router-dom';
// import { TableList, StatusColor, Label } from 'genui';
// import { compose, defaultProps } from 'recompose';

// import { withPagination } from '../../common/components/pagination';
// import { TimesheetItem, TimesheetStatus } from '../store/models';
// import { dateFormat, monthIsInPast } from '../../../utils/calendar';
// import { Translate } from '../../common';
// import {
//   sortByDate,
//   filterOutFutureTimesheets,
//   getStatusColor,
// } from '../utils';
// import { User } from '../../users/store/models';
// import { WithPaginationProps } from '../../common/components/pagination/with-pagination';

// type Props = {
//   items: TimesheetItem[];
//   noTimesheetsText?: string;
//   disableFilter?: boolean;
//   sortFunction?(item: TimesheetItem, other: TimesheetItem): number;
//   includeUser?: boolean;
//   users?: { [key: number]: User };
//   indicateDueDate?: boolean;
//   limit?: number;
// };

// class TimesheetList extends React.Component<Props> {
//   getUserLink(timesheet: any) {
//     const { users } = this.props;

//     if (!users || !timesheet.owner) {
//       return null;
//     }

//     const user = users[timesheet.owner];

//     if (!user) {
//       return null;
//     }

//     return <Link to={`/user/${user.id}`}>{user.fullName}</Link>;
//   }

//   renderPastDueDate(date: string, status: TimesheetStatus) {
//     if (!this.props.indicateDueDate) {
//       return null;
//     }

//     if (
//       monthIsInPast(date) &&
//       [TimesheetStatus.InProgress, TimesheetStatus.InProgressSaved].indexOf(
//         status
//       ) > -1
//     ) {
//       return (
//         <Label color="red" style={{ float: 'right' }}>
//           Past due date
//         </Label>
//       );
//     }
//     return null;
//   }

//   render() {
//     const {
//       items,
//       noTimesheetsText,
//       disableFilter,
//       includeUser,
//       users,
//       sortFunction,
//       limit,
//     } = this.props;

//     if (!items.length) {
//       return (
//         <div>
//           {noTimesheetsText || (
//             <Translate text="timesheet.labels.NO_TIMESHEETS" />
//           )}
//         </div>
//       );
//     }

//     // If disableFilter is true, there should be
//     // no filtering of future timesheets
//     const filter = disableFilter ? () => true : filterOutFutureTimesheets;

//     const tableItems = items
//       .filter(filter)
//       .sort(sortFunction)
//       .slice(0, limit)
//       .map(timesheet => ({
//         id: <Link to={`/timesheet/${timesheet.id}`}>{timesheet.id}</Link>,
//         period: dateFormat(timesheet.periodStart, 'MMMM, YYYY'),
//         status: (
//           <>
//             <StatusColor
//               style={{ marginRight: 5 }}
//               {...getStatusColor(timesheet.status)}
//             />
//             <Translate text={`timesheet.status.${timesheet.status}`} />
//             {this.renderPastDueDate(timesheet.periodStart, timesheet.status)}
//           </>
//         ),
//         user: includeUser ? this.getUserLink(timesheet) : null,
//       }));

//     const headings = ['ID', 'Period', 'Status'];

//     if (includeUser && users && Object.keys(users).length > 0) {
//       headings.push('User');
//     }

//     return (
//       <div>
//         <TableList headings={headings} items={tableItems} />
//       </div>
//     );
//   }
// }

// const withDefaultProps = defaultProps({
//   disableFilter: false,
//   includeUser: false,
//   indicateDueDate: false,
//   sortFunction: sortByDate,
//   limit: 99999,
// });

// export const TimesheetListWithPagination = compose<
//   any,
//   Props & WithPaginationProps
// >(
//   withDefaultProps,
//   withPagination
// )(TimesheetList);

// export default compose<any, Props>(withDefaultProps)(TimesheetList);
