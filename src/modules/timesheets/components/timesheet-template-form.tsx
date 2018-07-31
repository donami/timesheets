import React from 'react';
import { Field, Input, Button } from 'genui';
import { ReportType } from '../store/models';

type Props = {
  onSubmit: (data: State) => any;
};

type State = Readonly<{
  name: string;
  hoursDays: {
    [key: string]: number;
  };
  reportType: ReportType;
  shiftStartTime: string;
  shiftEndTime: string;
  workHoursPerDay: number;
}>;

class TimesheetTemplateForm extends React.Component<Props, State> {
  readonly state: State = {
    name: '',
    hoursDays: {
      monday: 8,
      tuesday: 8,
      wednesday: 8,
      thursday: 8,
      friday: 8,
      saturday: 8,
      sunday: 8,
    },
    reportType: ReportType.StartEnd,
    shiftStartTime: '8:00',
    shiftEndTime: '17:00',
    workHoursPerDay: 8,
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
    }: { name: keyof State; value: string; type: string } = e.target as any;

    this.setState({
      ...this.state,
      [name]: type === 'number' ? +value : value,
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    const { name, workHoursPerDay } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Field>
          <label>Name *</label>
          <Input
            placeholder="Name of the template"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          <label>Work hours per day *</label>
          <Input
            placeholder="8"
            type="number"
            name="workHoursPerDay"
            value={workHoursPerDay}
            onChange={this.handleChange}
          />
        </Field>

        <Button type="submit" color="green">
          Add
        </Button>
      </form>
    );
  }
}

export default TimesheetTemplateForm;
