import React, { Component } from 'react';
import moment from 'moment';
import { default as ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import styled from '../../../styled/styled-components';

type Props = {
  initialDate?: string;
  onValueChange?(value: string): any;
  onChange?: any;
  name: string;
};

type State = Readonly<{
  startDate: any;
}>;

const initialState: State = {
  startDate: undefined,
};

class DatePicker extends Component<Props, State> {
  readonly state = initialState;

  componentWillMount() {
    this.setState({
      startDate: moment(),
    });
  }

  handleChange = (date: any) => {
    this.setState({
      startDate: date,
    });

    this.props.onValueChange && this.props.onValueChange(date);
    this.props.onChange &&
      this.props.onChange({
        target: { value: date.format('YYYY-MM-DD'), name: this.props.name },
      });
  };

  render() {
    return (
      <Container>
        <ReactDatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  input {
    border: none !important;
    cursor: pointer !important;
    outline: none !important;
  }
`;

export default DatePicker;
