import React from 'react';
import { Input, Button } from 'genui';

import { Form, BackButton } from '../../common';
import { Project } from '../store/models';
import { PageLoader } from 'src/modules/ui';

type Props = {
  onSubmit: (data: { name: string }) => any;
  initialValues?: Project;
  loading?: boolean;
  submitting?: boolean;
};

class ProjectForm extends React.Component<Props> {
  handleSubmit = (model: any) => {
    const { initialValues, submitting } = this.props;
    if (submitting) {
      return;
    }

    const data = { ...model };

    if (initialValues && initialValues.id) {
      data.id = initialValues.id;
    }

    this.props.onSubmit(data);
  };

  render() {
    const { initialValues, loading, submitting } = this.props;

    if (loading) {
      return <PageLoader />;
    }

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

            <Button
              type="submit"
              color="green"
              disabled={!formState.isValid || submitting}
              loading={submitting}
            >
              {initialValues && initialValues.id ? 'Save' : 'Add'}
            </Button>
            <BackButton disabled={submitting}>Cancel</BackButton>
          </>
        )}
      </Form>
    );
  }
}

export default ProjectForm;
