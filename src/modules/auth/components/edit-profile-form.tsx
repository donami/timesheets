import React, { Component } from 'react';
import { Input, Button, Select } from 'genui';

import { Form } from '../../common';
import { User } from '../../users/store/models';

type Props = {
  initialValues: User;
  onUpdateProfile(data: any): any;
};

class EditProfileForm extends Component<Props> {
  handleSubmit = (model: any) => {
    const data = {
      ...model,
      id: this.props.initialValues.id,
    };

    this.props.onUpdateProfile(data);
  };

  render() {
    const { initialValues } = this.props;

    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <h3>Personal Info</h3>

            <Form.Field
              name="firstName"
              label="Firstname"
              defaultValue={initialValues.firstName}
              validations={{ isRequired: true }}
            >
              <Input placeholder="John" />
            </Form.Field>

            <Form.Field
              name="lastName"
              label="Lastname"
              defaultValue={initialValues.lastName}
              validations={{ isRequired: true }}
            >
              <Input placeholder="Doe" />
            </Form.Field>

            <Form.Field
              name="gender"
              label="Gender"
              validations={{ isRequired: true }}
              defaultValue={initialValues.gender}
            >
              <Select
                options={[
                  { value: 'unknown', label: 'Unknown' },
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
                placeholder="Select Gender"
              />
            </Form.Field>

            <h3>Contact Info</h3>
            <Form.Field
              name="email"
              label="Email"
              defaultValue={initialValues.email}
              validations={{ isRequired: true, isEmail: true }}
            >
              <Input placeholder="your@email.com" />
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

export default EditProfileForm;
