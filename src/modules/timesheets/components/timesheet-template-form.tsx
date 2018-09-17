import React from 'react';
import { Field, Input, Button } from 'genui';
import * as moment from 'moment';

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
    inTime: string;
    outTime: string;
    break: number;
    totalHours: number;
    holiday: boolean;
  }[];
  reportType: ReportType;
  shiftStartTime: string;
  shiftEndTime: string;
  workHoursPerDay: number;
}>;

class TimesheetTemplateForm extends React.Component<Props, State> {
  readonly state: State = {
    name: '',
    hoursDays: [
      {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: false,
      },
      {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: true,
      },
      {
        inTime: '09:00',
        outTime: '17:00',
        break: 60,
        totalHours: 7,
        holiday: true,
      },
    ],
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

    const map = {
      monday: 0,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 4,
      saturday: 5,
      sunday: 6,
    };

    const dayIndex = map[day];

    const inTime =
      property === 'inTime' ? value : this.state.hoursDays[dayIndex].inTime;
    const outTime =
      property === 'outTime' ? value : this.state.hoursDays[dayIndex].outTime;
    const breakInMinutes =
      property === 'break' ? +value : this.state.hoursDays[dayIndex].break;

    const totalHours = this.calcTotalHoursPerDay(
      inTime,
      outTime,
      breakInMinutes
    );

    if (property === 'holiday') {
      this.setState({
        ...this.state,
        hoursDays: [
          ...this.state.hoursDays.slice(0, dayIndex),
          { ...this.state.hoursDays[dayIndex], holiday: checked },
          ...this.state.hoursDays.slice(dayIndex + 1),
        ],
      });
    } else {
      this.setState({
        ...this.state,
        hoursDays: [
          ...this.state.hoursDays.slice(0, dayIndex),
          {
            ...this.state.hoursDays[dayIndex],
            totalHours,
            [property]: property === 'break' ? +value : value,
          },
          ...this.state.hoursDays.slice(dayIndex + 1),
        ],
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

        {hoursDays.map((day, index) => {
          const date = moment()
            .isoWeekday(index + 1)
            .format('dddd')
            .toLowerCase();

          return (
            <DayField key={index} className="day-field">
              <label>{capitalize(date)} *</label>

              <DayFieldInputs>
                <div>
                  <label>IN Time</label>
                  <Input
                    placeholder="8"
                    type="time"
                    name={`${date}.inTime`}
                    value={hoursDays[index].inTime}
                    disabled={hoursDays[index].holiday}
                    onChange={this.handleNewHoursDayChange}
                  />
                </div>
                <div>
                  <label>OUT Time</label>
                  <Input
                    placeholder="8"
                    type="time"
                    name={`${date}.outTime`}
                    value={hoursDays[index].outTime}
                    disabled={hoursDays[index].holiday}
                    onChange={this.handleNewHoursDayChange}
                  />
                </div>
                <div>
                  <label>Break (mins)</label>
                  <Input
                    placeholder="8"
                    type="number"
                    name={`${date}.break`}
                    value={hoursDays[index].break}
                    disabled={hoursDays[index].holiday}
                    onChange={this.handleNewHoursDayChange}
                  />
                </div>
                <div style={{ alignSelf: 'center' }}>
                  Holiday{' '}
                  <input
                    type="checkbox"
                    name={`${date}.holiday`}
                    checked={hoursDays[index].holiday}
                    onChange={this.handleNewHoursDayChange}
                  />
                </div>
              </DayFieldInputs>
            </DayField>
          );
        })}

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
