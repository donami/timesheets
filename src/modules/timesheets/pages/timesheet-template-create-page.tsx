import React, { Component } from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { TimesheetTemplateForm } from '../components';
import { PageHeader } from '../../common';
import { CREATE_TEMPLATE } from '../store/mutations';

type Props = {
  history: any;
};
type DataProps = {
  createTemplate(options: any): any;
};
type EnhancedProps = Props & DataProps;

class TimesheetTemplateCreatePage extends Component<EnhancedProps> {
  handleSubmit = (data: any) => {
    const days = [
      data.hoursDays.monday,
      data.hoursDays.tuesday,
      data.hoursDays.wednesday,
      data.hoursDays.thursday,
      data.hoursDays.friday,
      data.hoursDays.saturday,
      data.hoursDays.sunday,
    ];

    this.props
      .createTemplate({
        variables: {
          hoursDays: days,
          name: data.name,
          shiftEndTime: data.shiftEndTime,
          shiftStartTime: data.shiftStartTime,
          workHoursPerDay: data.workHoursPerDay,
        },
      })
      .then(() => {
        this.props.history.goBack();
      });
  };

  render() {
    return (
      <div>
        <PageHeader>Create Timesheet Template</PageHeader>

        <TimesheetTemplateForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const enhance = compose<EnhancedProps, Props>(
  graphql(CREATE_TEMPLATE, { name: 'createTemplate' })
);

export default enhance(TimesheetTemplateCreatePage);
