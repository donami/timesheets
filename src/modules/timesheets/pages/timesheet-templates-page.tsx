import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'genui';

import { TimesheetTemplateList } from '../components';
import { fetchTimesheetTemplates } from '../store/actions';
import { timesheetSelectors } from '../store';
import { PageHeader, Translate } from '../../common';

export interface TimesheetTemplatesPageProps {
  templates: any;
  fetchTimesheetTemplates: () => any;
}

class TimesheetTemplatesPage extends React.Component<
  TimesheetTemplatesPageProps
> {
  componentWillMount() {
    this.props.fetchTimesheetTemplates();
  }

  render() {
    const { templates } = this.props;

    return (
      <div>
        <PageHeader
          options={() => (
            <Button to="/timesheet-templates/create" color="blue">
              <Translate text="timesheetTemplates.labels.NEW_TIMESHEET_TEMPLATE" />
            </Button>
          )}
        >
          <Translate text="timesheetTemplates.labels.TIMESHEET_TEMPLATES" />
        </PageHeader>
        <TimesheetTemplateList templates={templates} />
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
      fetchTimesheetTemplates,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetTemplatesPage);
