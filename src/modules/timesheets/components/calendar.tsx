import * as React from 'react';
import styled from 'styled-components';
import { Button } from 'genui';

import { isSameMonthAs } from '../../../utils/calendar';

export interface CalendarProps {
  onSubmit?: Function;
  onSaveDraft?: Function;
  onApprove: () => any;
  onDecline: () => any;
  dates?: any[];
  editable: boolean;
  startOfMonth: string;
  isAdmin: boolean;
}

class Calendar extends React.Component<CalendarProps> {
  state = {
    dates: [],
  };

  static defaultProps = {
    onSubmit: (dates: any) => {},
    onSaveDraft: (dates: any) => {},
  };

  componentWillMount() {
    this.setState({ dates: this.props.dates });
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.dates) {
      this.setState({ dates: nextProps.dates });
    }
  }

  calcWeeklyHours(dates: any[]): number {
    return dates.reduce((acc, date) => {
      return acc + date.hours;
    }, 0);
  }

  calcWeeklyExpectedHours(dates: any[]): number {
    return dates.reduce((acc, date) => {
      if (!date.expected) {
        return acc;
      }
      return acc + date.expected;
    }, 0);
  }

  calcMonthlyHours(dates: any[]): number {
    return dates.reduce((acc, date) => {
      return acc + this.calcWeeklyHours(date);
    }, 0);
  }

  handleHoursChange = (event: any, weekIndex: number, dayIndex: number) => {
    const dates = [...this.state.dates];
    const date = { ...this.state.dates[weekIndex][dayIndex] };
    date.hours = +event.target.value;
    dates[weekIndex][dayIndex] = date;

    this.setState({ dates });
  };

  handleSaveAsDraft = () => {
    this.props.onSaveDraft && this.props.onSaveDraft(this.state.dates);
  };

  handleSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.state.dates);
  };

  renderWeek(dates: any[], weekIndex: number) {
    const weeklyTotalHours = this.calcWeeklyHours(dates);
    const weeklyExpectedHours = this.calcWeeklyExpectedHours(dates);

    return (
      <WeekItem>
        {dates.map((date, index) => (
          <DateItem key={index}>
            {isSameMonthAs(date.date, this.props.startOfMonth) && (
              <React.Fragment>
                <div>
                  <strong>{date.date}</strong>
                </div>
                <input
                  type="number"
                  min="0"
                  max="24"
                  disabled={!this.props.editable}
                  readOnly={!this.props.editable}
                  defaultValue={date.hours}
                  onChange={event =>
                    this.handleHoursChange(event, weekIndex, index)
                  }
                />
                <span> / {date.expected}</span>
              </React.Fragment>
            )}
          </DateItem>
        ))}
        <DateItem>
          <div>
            <strong>Total Units:</strong>
          </div>
          {weeklyTotalHours} / {weeklyExpectedHours}
        </DateItem>
      </WeekItem>
    );
  }

  render() {
    const { dates } = this.state;
    const { editable, isAdmin } = this.props;

    const monthlyTotalHours = this.calcMonthlyHours(dates);

    return (
      <div>
        <div>
          {dates.map((date, index) => (
            <React.Fragment key={index}>
              {this.renderWeek(date, index)}
            </React.Fragment>
          ))}
        </div>

        <TotalMonthlyHours>
          <strong>Total hours:</strong> {monthlyTotalHours} hours
        </TotalMonthlyHours>

        <div>
          {isAdmin && (
            <React.Fragment>
              <Button color="green" onClick={this.props.onApprove}>
                Approve
              </Button>
              <Button color="red" onClick={this.props.onDecline}>
                Decline, needs revisement
              </Button>
            </React.Fragment>
          )}
          {!isAdmin && (
            <React.Fragment>
              <Button
                color="blue"
                onClick={this.handleSaveAsDraft}
                disabled={!editable}
              >
                Save as draft
              </Button>
              <Button
                color="green"
                onClick={this.handleSubmit}
                disabled={!editable}
              >
                Submit
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const TotalMonthlyHours = styled.div`
  float: right;
  width: 100%;
  text-align: right;
`;

const WeekItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border: #ccc 1px solid;
  border-right: none;
`;

const DateItem = styled.div`
  width: 100%;
  padding: 10px 5px;
  border-right: 1px solid #ccc;
  text-align: center;
  height: 50px;

  div {
    margin-bottom: 10px;
  }

  input {
    width: 40px;
  }
`;

export default Calendar;
