import React from 'react';
import { Field, Input, Button } from 'genui';

import { parseDate } from '../../../../utils/helpers';
import { Modal, DatePicker } from '../../../common';

class CalendarModal extends React.Component<{
  date: any;
  editable: boolean;
  isAdmin: boolean;
  trigger: any;
  onSubmit: any;
  weekIndex: number;
  dayIndex: number;
}> {
  inTimeNode: HTMLInputElement | null;
  outTimeNode: HTMLInputElement | null;

  render() {
    const {
      date,
      editable,
      isAdmin,
      trigger,
      onSubmit,
      weekIndex,
      dayIndex,
    } = this.props;
    return (
      <Modal trigger={trigger}>
        <Modal.Header>
          Time Report for {parseDate(date.date, 'DD, MMM YYYY')}
        </Modal.Header>
        <Modal.Content>
          <form onSubmit={e => onSubmit(e, weekIndex, dayIndex)}>
            <Field>
              <label>Start Time</label>
              <DatePicker
                name="inTimePicker"
                timeSelect
                onValueChange={(value: any) => {
                  if (this.inTimeNode) {
                    this.inTimeNode.value = value;
                  }
                }}
                initialDate={
                  date.reported ? date.reported.inTime : date.expected.inTime
                }
              />

              <input
                ref={node => {
                  this.inTimeNode = node;
                }}
                type="hidden"
                defaultValue={
                  date.reported ? date.reported.inTime : date.expected.inTime
                }
                name="inTime"
              />
              {/* <Input
                disabled={!editable}
                type="time"
                defaultValue={
                  date.reported ? date.reported.inTime : date.expected.inTime
                }
                name="inTime"
              /> */}
            </Field>
            <Field>
              <label>End Time:</label>

              <DatePicker
                name="outTimePicker"
                timeSelect
                initialDate={
                  date.reported ? date.reported.outTime : date.expected.outTime
                }
                onValueChange={(value: any) => {
                  if (this.outTimeNode) {
                    this.outTimeNode.value = value;
                  }
                }}
              />

              <input
                ref={node => {
                  this.outTimeNode = node;
                }}
                type="hidden"
                defaultValue={
                  date.reported ? date.reported.outTime : date.expected.outTime
                }
                name="outTime"
              />

              {/* <Input
                disabled={!editable}
                type="time"
                defaultValue={
                  date.reported ? date.reported.outTime : date.expected.outTime
                }
                name="outTime"
              /> */}
            </Field>
            <Field>
              <label>Break (minutes):</label>
              <Input
                disabled={!editable}
                defaultValue={
                  date.reported ? date.reported.break : date.expected.break
                }
                name="breakInMinutes"
              />
            </Field>
            <Field>
              <label>Message:</label>
              <Input
                disabled={!editable}
                name="message"
                defaultValue={date.reported ? date.reported.message : ''}
              />
            </Field>

            <Modal.Actions>
              {isAdmin || !editable ? (
                <Button type="button">Close</Button>
              ) : (
                [
                  <Button type="submit" color="green" key="submit">
                    Save
                  </Button>,
                  <Button type="button" key="cancel">
                    Cancel
                  </Button>,
                ]
              )}
            </Modal.Actions>
          </form>
        </Modal.Content>
      </Modal>
    );
  }
}
// const CalendarModal: React.SFC<{
//   date: any;
//   editable: boolean;
//   isAdmin: boolean;
//   trigger: any;
//   onSubmit: any;
//   weekIndex: number;
//   dayIndex: number;
// }> = ({ date, editable, isAdmin, trigger, onSubmit, weekIndex, dayIndex }) => {
//   return (
//     <Modal trigger={trigger}>
//       <Modal.Header>
//         Time Report for {parseDate(date.date, 'DD, MMM YYYY')}
//       </Modal.Header>
//       <Modal.Content>
//         <form onSubmit={e => onSubmit(e, weekIndex, dayIndex)}>
//           <Field>
//             <label>Start Time</label>
//             <DatePicker
//               name="test"
//               timeSelect
//               onChange={(e: any, value: any) => {
//                 console.log(e, value);
//               }}
//             />

//             <Input
//               disabled={!editable}
//               type="time"
//               defaultValue={
//                 date.reported ? date.reported.inTime : date.expected.inTime
//               }
//               name="inTime"
//             />
//           </Field>
//           <Field>
//             <label>End Time:</label>
//             <Input
//               disabled={!editable}
//               type="time"
//               defaultValue={
//                 date.reported ? date.reported.outTime : date.expected.outTime
//               }
//               name="outTime"
//             />
//           </Field>
//           <Field>
//             <label>Break (minutes):</label>
//             <Input
//               disabled={!editable}
//               defaultValue={
//                 date.reported ? date.reported.break : date.expected.break
//               }
//               name="breakInMinutes"
//             />
//           </Field>
//           <Field>
//             <label>Message:</label>
//             <Input
//               disabled={!editable}
//               name="message"
//               defaultValue={date.reported ? date.reported.message : ''}
//             />
//           </Field>

//           <Modal.Actions>
//             {isAdmin || !editable ? (
//               <Button type="button">Close</Button>
//             ) : (
//               [
//                 <Button type="submit" color="green" key="submit">
//                   Save
//                 </Button>,
//                 <Button type="button" key="cancel">
//                   Cancel
//                 </Button>,
//               ]
//             )}
//           </Modal.Actions>
//         </form>
//       </Modal.Content>
//     </Modal>
//   );
// };

export default CalendarModal;
