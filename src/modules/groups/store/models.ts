import { User } from '../../users/store/models';
import { TimesheetTemplateItem } from '../../timesheets/store/models';

export interface Group {
  id: number;
  name: string;
  members: User[];
  timesheetTemplate: TimesheetTemplateItem | null;
}
