import React from 'react';
import { Field, Input, Button } from 'genui';

import { ReportType } from '../store/models';
import { capitalize } from '../../../utils/helpers';
import styled from '../../../styled/styled-components';
import { toDuration, timeDiff } from '../../../utils/calendar';

type Props = {
  onSubmit: (data: State) => any;
};

type State = Readonly<{
  name: string;
  hoursDays: {
    [key: string]: {
      inTime: string;
      outTime: string;
      break: number;
      totalHours: number;
    };
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
      monday: {
        inTime: '9:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
      },
      tuesday: {
        inTime: '9:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
      },
      wednesday: {
        inTime: '9:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
      },
      thursday: {
        inTime: '9:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
      },
      friday: {
        inTime: '9:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
      },
      saturday: {
        inTime: '9:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
      },
      sunday: {
        inTime: '9:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
      },
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

  handleNewHoursDayChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    }: { name: keyof State; value: string; type: string } = e.target as any;

    const [day, property] = name.split('.');

    const inTime =
      property === 'inTime' ? value : this.state.hoursDays[day].inTime;
    const outTime =
      property === 'outTime' ? value : this.state.hoursDays[day].outTime;
    const breakInMinutes =
      property === 'break' ? +value : this.state.hoursDays[day].break;

    const totalHours = this.calcTotalHoursPerDay(
      inTime,
      outTime,
      breakInMinutes
    );

    this.setState({
      ...this.state,
      hoursDays: {
        ...this.state.hoursDays,
        [day]: {
          ...this.state.hoursDays[day],
          totalHours,
          [property]: property === 'break' ? +value : value,
        },
      },
    });
  };

  calcTotalHoursPerDay = (
    inTimeString: string,
    outTimeString: string,
    breakInMinutes: number
  ) => {
    const breakInHours = toDuration(breakInMinutes, 'minutes', 'hours');
    const diff = timeDiff(inTimeString, outTimeString, 'H:mm', 'hours');

    return diff - breakInHours;
  };

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    const { name, workHoursPerDay, hoursDays } = this.state;

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

        <h3>Work hours per individual day</h3>

        {Object.keys(hoursDays).map(day => (
          <DayField key={day} className="day-field">
            <label>{capitalize(day)} *</label>

            <div style={{ display: 'flex' }}>
              <div>
                <label>IN Time</label>
                <Input
                  placeholder="8"
                  name={`${day}.inTime`}
                  value={hoursDays[day].inTime}
                  onChange={this.handleNewHoursDayChange}
                />
              </div>
              <div>
                <label>OUT Time</label>
                <Input
                  placeholder="8"
                  name={`${day}.outTime`}
                  value={hoursDays[day].outTime}
                  onChange={this.handleNewHoursDayChange}
                />
              </div>
              <div>
                <label>Break (mins)</label>
                <Input
                  placeholder="8"
                  type="number"
                  name={`${day}.break`}
                  value={hoursDays[day].break}
                  onChange={this.handleNewHoursDayChange}
                />
              </div>
            </div>
          </DayField>
        ))}

        <Button type="submit" color="green">
          Add
        </Button>
      </form>
    );
  }
}

export default TimesheetTemplateForm;

const DayField = styled.div`
  margin-bottom: 20px;
  display: flex;

  > div,
  > label {
    flex: 1;
  }

  > label {
    align-self: center;
  }
`;
