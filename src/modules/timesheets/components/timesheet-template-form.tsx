import React from 'react';
import { Field, Input, Button } from 'genui';

import { ReportType, TimesheetTemplateItem } from '../store/models';
import { capitalize } from '../../../utils/helpers';
import styled from '../../../styled/styled-components';
import { toDuration, timeDiff } from '../../../utils/calendar';
import { BackButton } from '../../common';

type Props = {
  onSubmit: (data: State) => any;
  initialValues?: TimesheetTemplateItem;
};

type State = Readonly<{
  id?: number;
  name: string;
  hoursDays: {
    [key: string]: {
      inTime: string;
      outTime: string;
      break: number;
      totalHours: number;
      holiday: boolean;
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
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      tuesday: {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      wednesday: {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      thursday: {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      friday: {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      saturday: {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: true,
      },
      sunday: {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: true,
      },
    },
    reportType: ReportType.StartEnd,
    shiftStartTime: '08:00',
    shiftEndTime: '17:00',
    workHoursPerDay: 8,
  };

  componentWillMount() {
    if (this.props.initialValues) {
      this.assignInitialValues(this.props.initialValues);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.initialValues) {
      if (
        !this.props.initialValues ||
        (this.props.initialValues &&
          this.props.initialValues.id !== nextProps.initialValues.id)
      ) {
        this.assignInitialValues(nextProps.initialValues);
      }
    }
  }

  assignInitialValues(initialValues: any) {
    const {
      id,
      name,
      hoursDays,
      reportType,
      shiftStartTime,
      shiftEndTime,
      workHoursPerDay,
    } = initialValues;

    this.setState({
      id,
      name,
      hoursDays,
      reportType,
      shiftStartTime,
      shiftEndTime,
      workHoursPerDay,
    });
  }

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
      checked,
    }: {
      name: keyof State;
      value: string;
      type: string;
      checked: boolean;
    } = e.target as any;

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

    if (property === 'holiday') {
      this.setState({
        ...this.state,
        hoursDays: {
          ...this.state.hoursDays,
          [day]: {
            ...this.state.hoursDays[day],
            holiday: checked,
          },
        },
      });
    } else {
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
    }
  };

  calcTotalHoursPerDay = (
    inTimeString: string,
    outTimeString: string,
    breakInMinutes: number
  ) => {
    const breakInHours = toDuration(breakInMinutes, 'minutes', 'hours');
    const diff = timeDiff(inTimeString, outTimeString, 'HH:mm', 'hours');

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

        <FieldLabels>Work hours per individual day</FieldLabels>

        {Object.keys(hoursDays).map(day => (
          <DayField key={day} className="day-field">
            <label>{capitalize(day)} *</label>

            <DayFieldInputs>
              <div>
                <label>IN Time</label>
                <Input
                  placeholder="8"
                  type="time"
                  name={`${day}.inTime`}
                  value={hoursDays[day].inTime}
                  disabled={hoursDays[day].holiday}
                  onChange={this.handleNewHoursDayChange}
                />
              </div>
              <div>
                <label>OUT Time</label>
                <Input
                  placeholder="8"
                  type="time"
                  name={`${day}.outTime`}
                  value={hoursDays[day].outTime}
                  disabled={hoursDays[day].holiday}
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
                  disabled={hoursDays[day].holiday}
                  onChange={this.handleNewHoursDayChange}
                />
              </div>
              <div style={{ alignSelf: 'center' }}>
                Holiday{' '}
                <input
                  type="checkbox"
                  name={`${day}.holiday`}
                  checked={hoursDays[day].holiday}
                  onChange={this.handleNewHoursDayChange}
                />
              </div>
            </DayFieldInputs>
          </DayField>
        ))}

        <Button type="submit" color="green">
          {this.state.id ? 'Save' : 'Add'}
        </Button>
        <BackButton>Cancel</BackButton>
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

const DayFieldInputs = styled.div`
  display: flex;
  label {
    display: block;
  }

  > div {
    margin: 0 10px;
  }
`;
const FieldLabels = styled.h3`
  text-transform: uppercase;
  font-weight: 300;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: #eee 1px solid;
`;
