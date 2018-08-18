import React from 'react';
import { Input, Button } from 'genui';
import { Form } from '../../common';

type Props = {
  onSubmit: (data: { name: string }) => any;
};

class ProjectForm extends React.Component<Props> {
  handleSubmit = (model: any) => {
    this.props.onSubmit(model);
  };

  render() {
    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="name"
              label="Name"
              validations={{ isRequired: true }}
            >
              <Input placeholder="Name of the project" />
            </Form.Field>

            <Button type="submit" color="green" disabled={!formState.isValid}>
              Add
            </Button>
          </>
        )}
      </Form>
    );
  }
}

export default ProjectForm;
