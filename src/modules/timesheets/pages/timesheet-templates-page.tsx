import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TimesheetTemplateList } from '../components';
import { fetchTimesheetTemplates } from '../store/actions';
import { timesheetSelectors } from '../store';
import { HasAccess } from '../../common/components';
import { UserRole } from '../../auth/store/models';

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
      <HasAccess roles={[UserRole.Admin, UserRole.Manager]}>
        <div>
          <TimesheetTemplateList templates={templates} />
        </div>
      </HasAccess>
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
