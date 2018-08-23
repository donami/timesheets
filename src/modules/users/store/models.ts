import { TimesheetItem } from '../../timesheets/store/models';
import { Group } from '../../groups/store/models';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRole;
  image: string;
  timesheets: TimesheetItem[];
  fullName: string;
  gender: string;
  group: Group;
  createdAt: string;
  updatedAt: string;
  disabled: boolean;
  notifications: number[];
}

// TODO: UserRole also exists in auth module
export enum UserRole {
  User = 'USER',
  Manager = 'MANAGER',
  Admin = 'ADMIN',
}
