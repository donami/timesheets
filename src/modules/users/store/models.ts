export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}

// import { schema } from 'normalizr';

// export const timesheetSchema = new schema.Entity(
//   'timesheets',
//   {},
//   { idAttribute: 'id' }
// );
