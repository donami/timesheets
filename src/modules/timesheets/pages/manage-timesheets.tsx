import React from 'react';
import { Heading } from 'genui';

import { TimesheetsReadyForReview } from '../components';
import { Translate } from '../../common';

class ManageTimesheets extends React.Component {
  render() {
    return (
      <div>
        <Heading as="h1" dividing="true">
          <Translate text="timesheet.labels.MANAGE_TIMESHEETS" />
        </Heading>

        <h2>
          <Translate text="timesheet.labels.TIMESHEETS_WAITING_FOR_APPROVAL" />
        </h2>
        <TimesheetsReadyForReview />
      </div>
    );
  }
}

export default ManageTimesheets;
