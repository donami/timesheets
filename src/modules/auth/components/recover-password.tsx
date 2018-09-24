import React from 'react';
import { Form } from '../../common';
import { Input, Button } from 'genui';

type Props = {
  userId: string;
  onSubmit: any;
};
type EnhancedProps = Props;

const RecoverPassword: React.SFC<EnhancedProps> = ({ userId, onSubmit }) => {
  return (
    <div>
      <Form onValidSubmit={(model: any) => onSubmit({ id: userId, ...model })}>
        {formState => (
          <>
            <Form.Field
              name="password"
              label="Password"
              type="password"
              validations={{ isRequired: true }}
            >
              <Input placeholder="New password" />
            </Form.Field>

            <Form.Field
              name="passwordConfirm"
              label="Confirm password"
              type="password"
              validations={{
                isRequired: true,
                equalsField: 'password',
              }}
            >
              <Input placeholder="Enter password again" />
            </Form.Field>

            <Button type="submit" disabled={!formState.isValid} color="green">
              Change password
            </Button>
            {/* <BackButton>Cancel</BackButton> */}
          </>
        )}
      </Form>
    </div>
  );
};

export default RecoverPassword;
