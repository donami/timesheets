import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TimesheetTemplateList } from '../components';
import { fetchTimesheetTemplates } from '../store/actions';
import { timesheetSelectors } from '../store';

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
