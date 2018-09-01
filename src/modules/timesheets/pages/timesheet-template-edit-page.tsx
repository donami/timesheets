import React, { Component } from 'react';

import { TimesheetTemplateForm } from '../components';
import { PageHeader } from '../../common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateTimesheetTemplate,
  selectTemplate,
  fetchTemplateById,
} from '../store/actions';
import { getSelectedTemplate } from '../store/selectors';
import { TimesheetTemplateItem } from '../store/models';

type Props = {
  updateTimesheetTemplate: (templateId: number, template: any) => any;
  match: any;
  template: TimesheetTemplateItem;
  selectTemplate: (templateId: number) => any;
  fetchTemplateById: (templateId: number) => any;
};

class TimesheetTemplateEditPage extends Component<Props> {
  componentWillMount() {
    const { match, selectTemplate, fetchTemplateById } = this.props;

    if (match && match.params.id) {
      selectTemplate(+match.params.id);
      fetchTemplateById(+match.params.id);
    }
  }

  handleSubmit = (data: any) => {
    this.props.updateTimesheetTemplate(data.id, data);
  };

  render() {
    if (!this.props.template) {
      return null;
    }

    return (
      <div>
        <PageHeader>Edit Timesheet Template</PageHeader>

        <TimesheetTemplateForm
          initialValues={this.props.template}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    template: getSelectedTemplate(state),
  }),
  (dispatch: any) =>
    bindActionCreators(
      {
        updateTimesheetTemplate,
        selectTemplate,
        fetchTemplateById,
      },
      dispatch
    )
)(TimesheetTemplateEditPage);
