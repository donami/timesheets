import { TimesheetTemplateItem } from '../../timesheets/store/models';

export interface Group {
  id: number;
  name: string;
  timesheetTemplate: TimesheetTemplateItem | null;
}
