import React, { Component } from 'react';
import { Input, Button } from 'genui';

import { Form } from '../../common';
import { User } from '../../users/store/models';

type Props = {
  initialValues: User;
  onUpdateProfile(data: any): any;
};

class EditAvatarForm extends Component<Props> {
  handleSubmit = (model: any) => {
    const data = {
      ...model,
      id: this.props.initialValues.id,
    };

    this.props.onUpdateProfile(data);
  };

  render() {
    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="image"
              label="Image URL"
              validations={{ isRequired: true }}
            >
              <Input placeholder="http://" />
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

export default EditAvatarForm;
