import React from 'react';
import { Heading } from 'genui';

import { TimesheetsReadyForReview } from '../components';

class ManageTimesheets extends React.Component {
  render() {
    return (
      <div>
        <Heading as="h1" dividing="true">
          Manage Timesheets
        </Heading>

        <h2>Timesheets waiting for approval</h2>
        <TimesheetsReadyForReview />
      </div>
    );
  }
}

export default ManageTimesheets;
