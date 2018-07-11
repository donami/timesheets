import { schema } from 'normalizr';
import { User } from '../../users/store/models';
import { userSchema } from '../../auth/store/models';
import {
  TimesheetTemplateItem,
  timesheetTemplateSchema,
} from '../../timesheets/store/models';

export interface Group {
  id: number;
  name: string;
  members: User[];
  timesheetTemplate: TimesheetTemplateItem | null;
}

export const groupSchema = new schema.Entity(
  'groups',
  {
    members: [userSchema],
    timesheetTemplate: timesheetTemplateSchema,
  },
  { idAttribute: 'id' }
);
