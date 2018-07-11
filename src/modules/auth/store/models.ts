import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users', {}, { idAttribute: 'id' });

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}
