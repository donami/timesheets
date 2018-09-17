import React from 'react';
import { Button, Select } from 'genui';

import { User, UserRole } from '../store/models';
import { Form, BackButton } from '../../common';
import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import { UPDATE_USER } from '../store/mutations';

type Props = { user: User };
type HandlerProps = { onSubmit(model: any): any };
type DataProps = { updateUser(options: any): any };
type EnhancedProps = Props & HandlerProps & DataProps;

const EditUserStatus: React.SFC<EnhancedProps> = ({ user, onSubmit }) => (
  <div>
    <Form onValidSubmit={onSubmit}>
      {formState => (
        <>
          <Form.Field
            name="role"
            label="User type"
            defaultValue={user.role}
            validations={{ isRequired: true }}
          >
            <Select
              options={[
                { value: UserRole.User, label: 'User' },
                { value: UserRole.Manager, label: 'Manager' },
                { value: UserRole.Admin, label: 'Admin' },
              ]}
              placeholder="User Type"
            />
          </Form.Field>

          <Button type="submit" disabled={!formState.isValid} color="green">
            Save
          </Button>
          <BackButton>Cancel</BackButton>
        </>
      )}
    </Form>
  </div>
);

const enhance = compose<EnhancedProps, Props>(
  graphql(UPDATE_USER, { name: 'updateUser' }),
  withHandlers<EnhancedProps, HandlerProps>({
    onSubmit: ({ updateUser, user }) => model => {
      updateUser({ variables: { id: user.id, role: model.role } });
    },
  })
);

export default enhance(EditUserStatus);
