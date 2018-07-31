import { User, UserRole } from '../../users/store/models';
import { TimesheetItem } from '../../timesheets/store/models';
import { Group } from '../../groups/store/models';

export interface ProjectMember {
  user: User | number;
  role: UserRole;
}

export interface Project {
  id: number;
  name: string;
  members: ProjectMember[];
  timesheets: TimesheetItem[] | number[];
  groups: Group[];
}
