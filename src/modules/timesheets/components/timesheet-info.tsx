import * as React from 'react';

import { Box } from '../../ui';
import { TimesheetItem } from '../store/models';
import { asMonth } from '../../../utils/calendar';
import { Translate } from '../../common';
import { Project } from '../../projects/store/models';

export interface TimesheetInfoProps {
  timesheet: TimesheetItem;
  project: Project;
}

const TimesheetInfo: React.StatelessComponent<TimesheetInfoProps> = ({
  timesheet,
  project,
}) => (
  <Box title={`Hourly timesheet for ${(project && project.name) || ''}`}>
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
