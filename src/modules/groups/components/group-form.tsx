import React from 'react';
import { Field, Input, Button } from 'genui';

import { Project } from '../../projects/store/models';
import { TimesheetTemplateItem } from '../../timesheets/store/models';

type Props = {
  onSubmit: (data: State, projectId: number) => any;
  projects: Project[];
  templates: TimesheetTemplateItem[];
};

type State = Readonly<{
  name: string;
  project: number | null;
  timesheetTemplate: TimesheetTemplateItem | null;
}>;

class GroupForm extends React.Component<Props, State> {
  readonly state: State = {
    name: '',
    project: null,
    timesheetTemplate: null,
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    }: { name: keyof State; value: string } = e.target as any;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleProjectChange = (e: any) => {
    const { value }: { value: string } = e.target as any;

    this.setState({
      project: +value,
    });
  };

  handleTemplateChange = (e: any) => {
    const { value }: { value: string } = e.target as any;

    const template = this.props.templates.find(item => item.id === +value);

    this.setState({
      timesheetTemplate: template || null,
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (this.state.project === null) {
      // TODO: should not throw error
      throw new Error('You need to select a project.');
    }

    this.props.onSubmit(this.state, this.state.project);
  };

  render() {
    const { projects, templates } = this.props;
    const { name } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Field>
          <label>Name *</label>
          <Input
            placeholder="Name of the group"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          <label>Project *</label>
          <select name="project" onChange={this.handleProjectChange}>
            <option value="0">Select Project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          <label>Timesheet Template *</label>
          <select name="timesheetTemplate" onChange={this.handleTemplateChange}>
            <option value="0">Select Template</option>
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </Field>

        <Button type="submit" color="green">
          Add
        </Button>
      </form>
    );
  }
}

export default GroupForm;
