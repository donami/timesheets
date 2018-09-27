import React from 'react';
import { Field, Input, Button } from 'genui';

import { parseDate } from '../../../../utils/helpers';
import { Modal } from '../../../common';

const CalendarModal: React.SFC<{
  date: any;
  editable: boolean;
  isAdmin: boolean;
  trigger: any;
  onSubmit: any;
  weekIndex: number;
  dayIndex: number;
}> = ({ date, editable, isAdmin, trigger, onSubmit, weekIndex, dayIndex }) => {
  return (
    <Modal trigger={trigger}>
      <Modal.Header>
        Time Report for {parseDate(date.date, 'DD, MMM YYYY')}
      </Modal.Header>
      <Modal.Content>
        <form onSubmit={e => onSubmit(e, weekIndex, dayIndex)}>
          <Field>
            <label>Start Time</label>
            <Input
              disabled={!editable}
              type="time"
              defaultValue={
                date.reported ? date.reported.inTime : date.expected.inTime
              }
              name="inTime"
            />
          </Field>
          <Field>
            <label>End Time:</label>
            <Input
              disabled={!editable}
              type="time"
              defaultValue={
                date.reported ? date.reported.outTime : date.expected.outTime
              }
              name="outTime"
            />
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
};

export default CalendarModal;
