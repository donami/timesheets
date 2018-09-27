import React from 'react';
import styled, { withProps, css } from '../../../../styled/styled-components';
import { Icon, Input, Field, Button } from 'genui';
import { parseDate } from '../../../../utils/helpers';
import { Modal } from '../../../common';
import { toDuration, timeDiff } from '../../../../utils/calendar';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { ADD_REPORTED_TO_DATE } from '../../store/mutations';
import { TimesheetStatus } from '../../store/models';
import CalendarDay from './calendar-day';

type Props = {
  dates: any;
  editable: boolean;
  isAdmin: boolean;
  startOfMonth: string;
  onSubmit?: Function;
  onSaveDraft?: Function;
  onApprove(): any;
  onDecline(): any;
};
type DataProps = { addReportedToDate(options: any): any };
type EnhancedProps = Props & DataProps;

type State = Readonly<{
  dates: any[];
}>;

const initialState: State = {
  dates: [],
};

class Calendar extends React.Component<EnhancedProps, State> {
  readonly state = initialState;

  componentWillMount() {
    if (this.props.dates) {
      this.initializeDates(this.props.dates);
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.dates) {
      this.initializeDates(nextProps.dates);
    }
  }

  initializeDates = (dates: any) => {
    this.setState({ dates });
  };

  handleSaveAsDraft = () => {
    this.props.onSaveDraft && this.props.onSaveDraft(this.state.dates);
  };

  handleSubmit = () => {
    this.props.onSubmit && this.props.onSubmit(this.state.dates);
  };

  handleReportDay = (e: any, weekIndex: number, dayIndex: number) => {
    e.preventDefault();

    const { inTime, outTime, breakInMinutes, message } = e.target;

    const data = {
      inTime: inTime.value,
      outTime: outTime.value,
      break: +breakInMinutes.value,
      message: message.value,
    };

    const breakInHours = toDuration(data.break, 'minutes', 'hours');
    const workHours = timeDiff(data.inTime, data.outTime, 'HH:mm', 'hours');

    const dates = [...this.state.dates];
    const date = { ...this.state.dates[weekIndex][dayIndex] };
    date.hours = workHours - breakInHours;
    date.reported = {
      ...data,
      totalHours: date.hours,
    };
    dates[weekIndex][dayIndex] = date;

    const selectedDate = dates[weekIndex][dayIndex];

    this.props.addReportedToDate({
      variables: {
        id: selectedDate.id,
        break: selectedDate.reported.break,
        inTime: selectedDate.reported.inTime,
        outTime: selectedDate.reported.outTime,
        holiday: selectedDate.reported.holiday,
        totalHours: selectedDate.hours,
      },
    });

    this.setState({ dates });
  };

  render() {
    const { dates, editable, isAdmin, startOfMonth } = this.props;

    return (
      <>
        <Container className="calendar-container">
          <Title className="calendar-title">
            {parseDate(startOfMonth, 'MMMM, YYYY')}
          </Title>
          <Headers className="calendar-headers">
            <DayHeader className="calendar-header">Mon</DayHeader>
            <DayHeader className="calendar-header">Tue</DayHeader>
            <DayHeader className="calendar-header">Wed</DayHeader>
            <DayHeader className="calendar-header">Thu</DayHeader>
            <DayHeader className="calendar-header">Fri</DayHeader>
            <DayHeader className="calendar-header">Sat</DayHeader>
            <DayHeader className="calendar-header">Sun</DayHeader>
          </Headers>

          <Content className="calendar-content">
            {dates.map((week: any, index: number) => (
              <Week key={index} className="calendar-week">
                {week.map((day: any, dayIndex: number) => (
                  <CalendarDay
                    key={dayIndex}
                    submitted={day.reported}
                    day={day}
                    editable={editable}
                    isAdmin={isAdmin}
                    onReportDay={this.handleReportDay}
                    weekIndex={index}
                    dayIndex={dayIndex}
                  />
                ))}
              </Week>
            ))}
          </Content>
        </Container>
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
          {!isAdmin &&
            status !== TimesheetStatus.Approved && (
              <React.Fragment>
                <Button
                  color="purple"
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
      </>
    );
  }
}

const enhance = compose<any, any>(
  graphql(ADD_REPORTED_TO_DATE, { name: 'addReportedToDate' })
);

export default enhance(Calendar);

const Container = styled.div`
  background: #fff;
  margin-bottom: 20px;
  border: #eee 1px solid;
  border-radius: 3px;
`;

const Title = styled.div`
  text-align: center;
  padding: 10px;
  text-transform: uppercase;
  font-weight: 300;
`;

const Headers = styled.div`
  text-transform: uppercase;
  background: #f9fafc;
  border-top: #eee 1px solid;
  display: flex;
`;

const DayHeader = styled.div`
  padding: 10px;
  text-align: center;
  flex: 1;
  border-right: #eee 1px solid;

  &:last-of-type {
    border-right: none;
  }
`;

const Content = styled.div`
  background: #fff;
`;

const Week = styled.div`
  border-bottom: #eee 1px solid;
  border-top: #eee 1px solid;
  display: flex;

  &:last-of-type {
    border-bottom: none;
  }
`;
