import { schema } from 'normalizr';

const userSchema = new schema.Entity('users', {}, { idAttribute: 'id' });

export const timesheetTemplateSchema = new schema.Entity(
  'timesheetTemplates',
  {},
  { idAttribute: 'id' }
);

export const groupSchema = new schema.Entity(
  'groups',
  {
    members: [userSchema],
    timesheetTemplate: timesheetTemplateSchema,
  },
  { idAttribute: 'id' }
);

export const timesheetSchema: any = new schema.Entity(
  'timesheets',
  {
    owner: userSchema,
  },
  { idAttribute: 'id' }
);

export const projectSchema = new schema.Entity(
  'projects',
  {
    timesheets: [timesheetSchema],
    // tslint:disable-next-line:prefer-array-literal
    members: new schema.Array({
      user: userSchema,
    }),
    groups: [groupSchema],
  },
  { idAttribute: 'id' }
);

export const expenseSchema = new schema.Entity(
  'expenses',
  {},
  { idAttribute: 'id' }
);

userSchema.define({ timesheets: [timesheetSchema] });

export { userSchema };
