import React from 'react';
import { Select, Input, Button } from 'genui';

import { Project } from '../../projects/store/models';
import { TimesheetTemplateItem } from '../../timesheets/store/models';
import { Form, BackButton } from '../../common';
import { Group } from '../store/models';

type Props = {
  onSubmit: (
    data: {
      name: string;
      project: number;
      timesheetTemplate: TimesheetTemplateItem;
    }
  ) => any;
  companyId?: string;
  projects: Project[];
  templates: TimesheetTemplateItem[];
  initialValues?: any;
  loading?: boolean;
};

class GroupForm extends React.Component<Props> {
  handleSubmit = (model: any) => {
    const data = {
      ...model,
      id:
        (this.props.initialValues && this.props.initialValues.id) || undefined,
    };

    if (data.project === null) {
      throw new Error('You need to select a project.');
    }

    this.props.onSubmit(data);
  };

  render() {
    const { projects, templates, initialValues, loading } = this.props;

    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="name"
              label="Name"
              validations={{ isRequired: true }}
              defaultValue={(initialValues && initialValues.name) || ''}
            >
              <Input placeholder="Name of the the group" />
            </Form.Field>

            <Form.Field
              name="project"
              label="Select Project"
              validations={{ isRequired: true }}
              defaultValue={
                initialValues &&
                initialValues.project &&
                initialValues.project.id
              }
            >
              <Select
                options={projects.map(project => ({
                  value: project.id,
                  label: project.name,
                }))}
                placeholder="Select Project"
              />
            </Form.Field>

            <Form.Field
              name="timesheetTemplate"
              label="Timesheet Template"
              validations={{ isRequired: true }}
              defaultValue={
                initialValues &&
                initialValues.template &&
                initialValues.template.id
              }
            >
              <Select
                options={templates.map(template => ({
                  value: template.id,
                  label: template.name,
                }))}
                placeholder="Select Template"
              />
            </Form.Field>

            <Button
              type="submit"
              color="green"
              loading={loading}
              disabled={!formState.isValid}
            >
              {initialValues && initialValues.id ? 'Save' : 'Add'}
            </Button>
            <BackButton disabled={loading}>Cancel</BackButton>
          </>
        )}
      </Form>
    );
  }
}

export default GroupForm;
