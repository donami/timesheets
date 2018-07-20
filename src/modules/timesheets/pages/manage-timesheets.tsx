import React from 'react';

import { TimesheetsReadyForReview } from '../components';

class ManageTimesheets extends React.Component {
  render() {
    return (
      <div>
        <h2>manage timesheets</h2>
        <TimesheetsReadyForReview />
      </div>
    );
  }
}

export default ManageTimesheets;
