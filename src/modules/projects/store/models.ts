import { schema } from 'normalizr';
import { User, UserRole } from '../../users/store/models';
import { TimesheetItem, timesheetSchema } from '../../timesheets/store/models';
import { userSchema } from '../../auth/store/models';

export interface ProjectMember {
  user: User | number;
  role: UserRole;
}

export interface Project {
  id: number;
  name: string;
  members: ProjectMember[];
  timesheets: TimesheetItem[] | number[];
}

export const projectSchema = new schema.Entity(
  'projects',
  {
    timesheets: [timesheetSchema],
    // tslint:disable-next-line:prefer-array-literal
    members: new schema.Array({
      user: userSchema,
    }),
  },
  { idAttribute: 'id' }
);
