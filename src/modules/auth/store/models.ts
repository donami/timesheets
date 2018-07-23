import { schema } from 'normalizr';
import { timesheetSchema } from '../../timesheets/store/models';

export const userSchema = new schema.Entity(
  'users',
  { timesheets: [timesheetSchema] },
  { idAttribute: 'id' }
);

export enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  User = 'USER',
}
