import React from 'react';
import { Input, Button } from 'genui';

import { Form, BackButton } from '../../common';
import { Project } from '../store/models';

type Props = {
  onSubmit: (data: { name: string }) => any;
  initialValues?: Project;
};

class ProjectForm extends React.Component<Props> {
  handleSubmit = (model: any) => {
    const { initialValues } = this.props;
    const data = { ...model };

    if (initialValues && initialValues.id) {
      data.id = initialValues.id;
    }

    this.props.onSubmit(data);
  };

  render() {
    const { initialValues } = this.props;

    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="name"
              label="Name"
              defaultValue={initialValues && initialValues.name}
              validations={{ isRequired: true }}
            >
              <Input placeholder="Name of the project" />
            </Form.Field>

            <Button type="submit" color="green" disabled={!formState.isValid}>
              {initialValues && initialValues.id ? 'Save' : 'Add'}
            </Button>
            <BackButton>Cancel</BackButton>
          </>
        )}
      </Form>
    );
  }
}

export default ProjectForm;
