import React from 'react';

import { TimesheetsReadyForReview } from '../components';
import { HasAccess } from '../../common';
import { UserRole } from '../../auth/store/models';

class ManageTimesheets extends React.Component {
  render() {
    return (
      <HasAccess roles={[UserRole.Manager, UserRole.Admin]}>
        <div>
          <h2>manage timesheets</h2>
          <TimesheetsReadyForReview />
        </div>
      </HasAccess>
    );
  }
}

export default ManageTimesheets;
