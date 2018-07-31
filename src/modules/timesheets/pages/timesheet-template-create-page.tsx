import React, { Component } from 'react';

import { TimesheetTemplateForm } from '../components';
import { PageHeader } from '../../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTimesheetTemplate } from '../store/actions';

type Props = {
  createTimesheetTemplate: (template: any) => any;
};

class TimesheetTemplateCreatePage extends Component<Props> {
  handleSubmit = (data: any) => {
    this.props.createTimesheetTemplate(data);
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

export default connect(
  undefined,
  (dispatch: any) =>
    bindActionCreators(
      {
        createTimesheetTemplate,
      },
      dispatch
    )
)(TimesheetTemplateCreatePage);
