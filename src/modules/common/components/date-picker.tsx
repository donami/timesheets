import React, { Component } from 'react';
import moment from 'moment';
import { default as ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styled from '../../../styled/styled-components';
import { Button } from 'genui';

type Props = {
  initialDate?: string;
  onValueChange?(value: string): any;
  onChange?: any;
  name: string;
  timeSelect?: boolean;
};

type State = Readonly<{
  startDate: any;
}>;

const initialState: State = {
  startDate: undefined,
};

class CustomInput extends React.Component<any> {
  render() {
    return (
      <Button color="blue" type="button" onClick={this.props.onClick}>
        {this.props.value}
      </Button>
    );
  }
}

class DatePicker extends Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    if (!this.props.initialDate) {
      this.setState({
        startDate: moment(),
      });
      return;
    }

    if (this.props.timeSelect) {
      this.setState({
        startDate: moment(this.props.initialDate, 'HH:mm'),
      });

      return;
    }
    this.setState({
      startDate: moment(this.props.initialDate, 'YYYY-MM-DD'),
    });
  }

  handleChange = (date: any) => {
    this.setState({
      startDate: date,
    });

    const value = this.props.timeSelect
      ? date.format('HH:mm')
      : date.format('YYYY-MM-DD');

    this.props.onValueChange && this.props.onValueChange(value);
    this.props.onChange &&
      this.props.onChange({
        target: { value, name: this.props.name },
      });
  };

  render() {
    if (this.props.timeSelect) {
      return (
        <Container>
          <ReactDatePicker
            customInput={<CustomInput />}
            selected={this.state.startDate}
            locale="en-gb"
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            timeCaption="Time"
            onChange={this.handleChange}
          />
        </Container>
      );
    }
    return (
      <Container>
        <ReactDatePicker
          customInput={<CustomInput />}
          locale="en-gb"
          dateFormat="YYYY-MM-DD"
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  .react-datepicker__time-container {
    width: 200px;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box {
    width: 100%;
  }
  input {
    border: none !important;
    cursor: pointer !important;
    outline: none !important;
  }
`;

export default DatePicker;
