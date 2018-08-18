import React from 'react';
import { Field, Input, Button } from 'genui';

import { Project } from '../../projects/store/models';
import { TimesheetTemplateItem } from '../../timesheets/store/models';
import { Form, Select } from '../../common';

type Props = {
  onSubmit: (
    data: {
      name: string;
      project: number;
      timesheetTemplate: TimesheetTemplateItem;
    },
    projectId: number
  ) => any;
  projects: Project[];
  templates: TimesheetTemplateItem[];
};

class GroupForm extends React.Component<Props> {
  handleSubmit = (model: any) => {
    const data = {
      ...model,
      project: +model.project,
      timesheetTemplate:
        this.props.templates.find(
          item => item.id === +model.timesheetTemplate
        ) || null,
    };

    if (data.project === null) {
      throw new Error('You need to select a project.');
    }

    this.props.onSubmit(data, data.project);
  };

  render() {
    const { projects, templates } = this.props;

    return (
      <Form onValidSubmit={this.handleSubmit}>
        {formState => (
          <>
            <Form.Field
              name="name"
              label="Name"
              validations={{ isRequired: true }}
            >
              <Input placeholder="Name of the the group" />
            </Form.Field>

            <Form.Field
              name="project"
              label="Select Project"
              validations={{ isRequired: true }}
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
            >
              <Select
                options={templates.map(template => ({
                  value: template.id,
                  label: template.name,
                }))}
                placeholder="Select Template"
              />
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

export default GroupForm;
