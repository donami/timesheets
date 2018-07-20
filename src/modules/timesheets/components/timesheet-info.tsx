import * as React from 'react';

import { Box } from '../../ui';
import { TimesheetItem } from '../store/models';
import { asMonth } from '../../../utils/calendar';
import { Translate } from '../../common';

export interface TimesheetInfoProps {
  timesheet: TimesheetItem;
}

const TimesheetInfo: React.StatelessComponent<TimesheetInfoProps> = ({
  timesheet,
}) => (
  <Box title="Hourly timesheet for ___Humany - Karlskrona___">
    <strong>Timesheet Period:</strong> {asMonth(timesheet.periodStart)} <br />
    <strong>Status: </strong>
    <Translate text={`timesheet.status.${timesheet.status}`} /> <br />
    {timesheet.dateApproved && (
      <React.Fragment>
        <strong>Approval Date:</strong> {timesheet.dateApproved} <br />
      </React.Fragment>
    )}
  </Box>
);

export default TimesheetInfo;
