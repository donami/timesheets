import React from 'react';

import { TimesheetsReadyForReview } from '../components';
import { Translate, PageHeader } from '../../common';

class ManageTimesheets extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>
          <Translate text="timesheet.labels.MANAGE_TIMESHEETS" />
        </PageHeader>

        <h2>
          <Translate text="timesheet.labels.TIMESHEETS_WAITING_FOR_APPROVAL" />
        </h2>
        <TimesheetsReadyForReview />
      </div>
    );
  }
}

export default ManageTimesheets;
