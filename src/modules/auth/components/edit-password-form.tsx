import React, { Component } from 'react';
import { Input, Button } from 'genui';

import { Form } from '../../common';
import { User } from '../../users/store/models';

type Props = {
  initialValues: User;
  onUpdateProfile(data: any): any;
};

class EditPasswordForm extends Component<Props> {
  handleSubmit = (model: any) => {
    const data = {
      ...model,
      id: this.props.initialValues.id,
    };

    delete data.confirmPassword;

    this.props.onUpdateProfile(data);
  };

  render() {
    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="password"
              label="Password"
              type="password"
              validations={{ isRequired: true }}
            >
              <Input placeholder="Your password" />
            </Form.Field>

            <Form.Field
              name="confirmPassword"
              label="Confirm password"
              type="password"
              validations={{ isRequired: true, equalsField: 'password' }}
            >
              <Input placeholder="Enter password again" />
            </Form.Field>

            <Button type="submit" color="green" disabled={!formState.isValid}>
              Save
            </Button>
          </>
        )}
      </Form>
    );
  }
}

export default EditPasswordForm;
