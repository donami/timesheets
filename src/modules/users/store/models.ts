import { TimesheetItem } from '../../timesheets/store/models';

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
}

// TODO: UserRole also exists in auth module
export enum UserRole {
  User = 'USER',
  Manager = 'MANAGER',
  Admin = 'ADMIN',
}
