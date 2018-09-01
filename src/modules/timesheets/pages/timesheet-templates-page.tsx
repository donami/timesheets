import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import { TimesheetTemplateList } from '../components';
import {
  fetchTimesheetTemplatesIfNeeded,
  removeTimesheetTemplate,
} from '../store/actions';
import { timesheetSelectors } from '../store';
import { PageHeader, Translate } from '../../common';

export interface TimesheetTemplatesPageProps {
  templates: any;
  fetchTimesheetTemplatesIfNeeded(): any;
  removeTimesheetTemplate(templateId: number): any;
}

class TimesheetTemplatesPage extends React.Component<
  TimesheetTemplatesPageProps
> {
  componentWillMount() {
    this.props.fetchTimesheetTemplatesIfNeeded();
  }

  handleRemove = (templateId: number) => {
    this.props.removeTimesheetTemplate(templateId);
  };

  render() {
    const { templates } = this.props;

    return (
      <div>
        <PageHeader
          options={() => (
            <Button to="/timesheet-templates/create" color="purple">
              <Translate text="timesheetTemplates.labels.NEW_TIMESHEET_TEMPLATE" />
            </Button>
          )}
        >
          <Translate text="timesheetTemplates.labels.TIMESHEET_TEMPLATES" />
        </PageHeader>
        <TimesheetTemplateList
          templates={templates}
          onRemoveTemplate={this.handleRemove}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  templates: timesheetSelectors.getTimesheetTemplates(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchTimesheetTemplatesIfNeeded,
      removeTimesheetTemplate,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetTemplatesPage);
