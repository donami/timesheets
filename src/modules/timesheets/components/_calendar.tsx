// import * as React from 'react';
// import styled from 'styled-components';
// import { Button, Input, Field, Icon } from 'genui';

// import { isSameMonthAs, toDuration, timeDiff } from '../../../utils/calendar';
// import { TimesheetStatus } from '../store/models';
// import { parseDate } from '../../../utils/helpers';
// import { Modal } from '../../common';
// import { withProps, css } from '../../../styled/styled-components';
// import { compose } from 'recompose';
// import { graphql } from 'react-apollo';
// import { ADD_REPORTED_TO_DATE } from '../store/mutations';

// type Props = {
//   onSubmit?: Function;
//   onSaveDraft?: Function;
//   onApprove: () => any;
//   onDecline: () => any;
//   dates?: any[];
//   editable: boolean;
//   startOfMonth: string;
//   isAdmin: boolean;
//   status: TimesheetStatus;
// };

// type DataProps = {
//   addReportedToDate(options: any): any;
// };
// type EnhancedProps = Props & DataProps;

// type State = Readonly<{
//   dates: any[];
// }>;

// const initialState: State = {
//   dates: [],
// };

// class Calendar extends React.Component<EnhancedProps, State> {
//   readonly state = initialState;

//   static defaultProps = {
//     onSubmit: (dates: any) => {},
//     onSaveDraft: (dates: any) => {},
//   };

//   componentWillMount() {
//     if (this.props.dates) {
//       this.initializeDates(this.props.dates);
//     }
//   }

//   componentWillReceiveProps(nextProps: any) {
//     if (nextProps.dates) {
//       this.initializeDates(nextProps.dates);
//     }
//   }

//   initializeDates = (dates: any) => {
//     this.setState({ dates });
//   };

//   calcWeeklyHours(dates: any[]): number {
//     return dates.reduce((acc, date) => {
//       return acc + date.hours;
//     }, 0);
//   }

//   calcWeeklyExpectedHours(dates: any[]): number {
//     return dates.reduce((acc, date) => {
//       if (!date.expected || !(date.expected && date.expected.totalHours)) {
//         return acc;
//       }
//       // if (!date.expected.totalHours) {
//       //   return acc;
//       // }
//       return acc + date.expected.totalHours;
//     }, 0);
//   }

//   calcMonthlyHours(dates: any[]): number {
//     return dates.reduce((acc, date) => {
//       return acc + this.calcWeeklyHours(date);
//     }, 0);
//   }

//   handleSaveAsDraft = () => {
//     this.props.onSaveDraft && this.props.onSaveDraft(this.state.dates);
//   };

//   handleSubmit = () => {
//     this.props.onSubmit && this.props.onSubmit(this.state.dates);
//   };

//   handleReportDay = (e: any, weekIndex: number, dayIndex: number) => {
//     e.preventDefault();

//     const { inTime, outTime, breakInMinutes, message } = e.target;

//     const data = {
//       inTime: inTime.value,
//       outTime: outTime.value,
//       break: +breakInMinutes.value,
//       message: message.value,
//     };

//     const breakInHours = toDuration(data.break, 'minutes', 'hours');
//     const workHours = timeDiff(data.inTime, data.outTime, 'HH:mm', 'hours');

//     const dates = [...this.state.dates];
//     const date = { ...this.state.dates[weekIndex][dayIndex] };
//     date.hours = workHours - breakInHours;
//     date.reported = data;
//     dates[weekIndex][dayIndex] = date;

//     const selectedDate = dates[weekIndex][dayIndex];

//     this.props.addReportedToDate({
//       variables: {
//         id: selectedDate.id,
//         break: selectedDate.reported.break,
//         inTime: selectedDate.reported.inTime,
//         outTime: selectedDate.reported.outTime,
//         holiday: selectedDate.reported.holiday,
//         totalHours: selectedDate.hours,
//       },
//     });

//     this.setState({ dates });
//   };

//   getDisplayDates = (date: any) => {
//     const data: {
//       inTime: string;
//       outTime: string;
//       break: number;
//       totalHours: number;
//       holiday: boolean;
//     } = date.reported || date.expected;

//     // If holiday and no reported hours, simply display string
//     if (data.holiday && !(date.reported && date.reported.totalHours)) {
//       return <div>Holiday</div>;
//     }

//     return (
//       <div>
//         {data.inTime} - {data.outTime} <br />
//         {data.break || '0'}m break <br />
//         {data.totalHours || '0'}h
//       </div>
//     );
//   };

//   renderWeek(dates: any[], weekIndex: number) {
//     const weeklyTotalHours = this.calcWeeklyHours(dates);
//     const weeklyExpectedHours = this.calcWeeklyExpectedHours(dates);
//     const { editable } = this.props;

//     return (
//       <WeekItem>
//         {dates.map((date, index) => (
//           <DateItem key={index}>
//             {isSameMonthAs(date.date, this.props.startOfMonth) && (
//               <React.Fragment>
//                 <DateItemTop className="date-item-top">
//                   {date.reported ? (
//                     <StatusDayIcon
//                       name="fas fa-check-square"
//                       title="Reported"
//                       reported={true}
//                     />
//                   ) : (
//                     <StatusDayIcon
//                       name="fas fa-hourglass-half"
//                       title="Not reported yet"
//                       reported={false}
//                     />
//                   )}

//                   <Modal
//                     trigger={
//                       <EditDayTrigger>
//                         {parseDate(date.date, 'D')}
//                       </EditDayTrigger>
//                     }
//                   >
//                     <Modal.Header>
//                       Time Report for {parseDate(date.date, 'DD, MMM YYYY')}
//                     </Modal.Header>
//                     <Modal.Content>
//                       <form
//                         onSubmit={e =>
//                           this.handleReportDay(e, weekIndex, index)
//                         }
//                       >
//                         <Field>
//                           <label>Start Time</label>
//                           <Input
//                             disabled={!editable}
//                             type="time"
//                             defaultValue={
//                               date.reported
//                                 ? date.reported.inTime
//                                 : date.expected.inTime
//                             }
//                             name="inTime"
//                           />
//                         </Field>
//                         <Field>
//                           <label>End Time:</label>
//                           <Input
//                             disabled={!editable}
//                             type="time"
//                             defaultValue={
//                               date.reported
//                                 ? date.reported.outTime
//                                 : date.expected.outTime
//                             }
//                             name="outTime"
//                           />
//                         </Field>
//                         <Field>
//                           <label>Break (minutes):</label>
//                           <Input
//                             disabled={!editable}
//                             defaultValue={
//                               date.reported
//                                 ? date.reported.break
//                                 : date.expected.break
//                             }
//                             name="breakInMinutes"
//                           />
//                         </Field>
//                         <Field>
//                           <label>Message:</label>
//                           <Input
//                             disabled={!editable}
//                             name="message"
//                             defaultValue={
//                               date.reported ? date.reported.message : ''
//                             }
//                           />
//                         </Field>

//                         <Modal.Actions>
//                           {this.props.isAdmin || !editable ? (
//                             <Button type="button">Close</Button>
//                           ) : (
//                             [
//                               <Button type="submit" color="green" key="submit">
//                                 Save
//                               </Button>,
//                               <Button type="button" key="cancel">
//                                 Cancel
//                               </Button>,
//                             ]
//                           )}
//                         </Modal.Actions>
//                       </form>
//                     </Modal.Content>
//                   </Modal>
//                 </DateItemTop>

//                 <DateItemContent
//                   className="date-item-content"
//                   holiday={date.expected.holiday}
//                 >
//                   {this.getDisplayDates(date)}
//                 </DateItemContent>
//               </React.Fragment>
//             )}
//           </DateItem>
//         ))}
//         <DateItem>
//           <DateItemTop style={{ alignSelf: 'stretch' }}>
//             <div style={{ margin: '0 auto', fontWeight: 700 }}>
//               Worked Hours:
//             </div>
//           </DateItemTop>
//           <DateItemContent>
//             <div>
//               {weeklyTotalHours} / {weeklyExpectedHours} hours
//             </div>
//           </DateItemContent>
//         </DateItem>
//       </WeekItem>
//     );
//   }

//   render() {
//     const { dates } = this.state;
//     const { editable, isAdmin, status } = this.props;

//     const monthlyTotalHours = this.calcMonthlyHours(dates);

//     return (
//       <div>
//         <WeekItem style={{ border: '#ccc 1px solid' }}>
//           {[
//             'Monday',
//             'Tuesday',
//             'Wednesday',
//             'Thursday',
//             'Friday',
//             'Saturday',
//             'Sunday',
//             'Hours',
//           ].map((day, index) => (
//             <HeaderItem key={index}>{day}</HeaderItem>
//           ))}
//         </WeekItem>

//         <div>
//           {dates.map((date, index) => (
//             <React.Fragment key={index}>
//               {this.renderWeek(date, index)}
//             </React.Fragment>
//           ))}
//         </div>

//         <TotalMonthlyHours>
//           <strong>Total hours:</strong> {monthlyTotalHours} hours
//         </TotalMonthlyHours>

//         <div>
//           {isAdmin && (
//             <React.Fragment>
//               <Button color="green" onClick={this.props.onApprove}>
//                 Approve
//               </Button>
//               <Button color="red" onClick={this.props.onDecline}>
//                 Decline, needs revisement
//               </Button>
//             </React.Fragment>
//           )}
//           {!isAdmin &&
//             status !== TimesheetStatus.Approved && (
//               <React.Fragment>
//                 <Button
//                   color="purple"
//                   onClick={this.handleSaveAsDraft}
//                   disabled={!editable}
//                 >
//                   Save as draft
//                 </Button>
//                 <Button
//                   color="green"
//                   onClick={this.handleSubmit}
//                   disabled={!editable}
//                 >
//                   Submit
//                 </Button>
//               </React.Fragment>
//             )}
//         </div>
//       </div>
//     );
//   }
// }

// const TotalMonthlyHours = styled.div`
//   float: right;
//   width: 100%;
//   text-align: right;
// `;

// const WeekItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 10px;
// `;

// const DateItem = styled.div`
//   width: 100%;
//   border: #ccc 1px solid;
//   height: 100px;
//   background: #fff;

//   display: flex;
//   flex-direction: column;

//   margin: 0 10px;

//   input {
//     width: 40px;
//   }
// `;

// const DateItemTop = styled.div`
//   flex: 1;
//   display: flex;
//   padding: 0 10px;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #f7f6f5;
// `;

// const DateItemContent = withProps<{ holiday?: boolean }, HTMLDivElement>(
//   styled.div
// )`
//   flex: 2;
//   display: flex;
//   justify-content: center;
//   background-color: #fff;
//   font-size: 0.9em;

//   ${({ holiday }) =>
//     holiday &&
//     css`
//       background: #ececec;
//     `}

//   div {
//     align-self: center;
//   }
// `;

// const EditDayTrigger = styled.span`
//   cursor: pointer;
//   font-weight: 700;
//   color: #333;

//   &:hover {
//     opacity: 0.5;
//   }
// `;

// const StatusDayIcon = withProps<{ reported: boolean }, HTMLElement>(
//   styled(Icon)
// )`
//   font-size: 0.8em;

//   ${({ reported }) =>
//     reported &&
//     css`
//       color: #06ec3c;
//     `}
// `;

// const HeaderItem = styled.div`
//   width: 100%;
//   padding: 10px 5px;
//   background: #fff;
//   text-align: center;
// `;

// const enhance = compose<any, any>(
//   graphql(ADD_REPORTED_TO_DATE, { name: 'addReportedToDate' })
// );

// export default enhance(Calendar);
