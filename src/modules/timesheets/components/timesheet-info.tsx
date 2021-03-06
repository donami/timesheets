import * as React from 'react';
import { Label, List } from 'genui';
import { Link } from 'react-router-dom';

import { Box } from '../../ui';
import { TimesheetItem, TimesheetStatus } from '../store/models';
import { Translate, HasAccess, Avatar } from '../../common';
import { Project } from '../../projects/store/models';
import { parseDate } from '../../../utils/helpers';
import styled from '../../../styled/styled-components';
import { User, UserRole } from '../../users/store/models';

export interface TimesheetInfoProps {
  timesheet: TimesheetItem;
  project: Project;
  owner: User;
}

const labelProps = (status: TimesheetStatus) => {
  if (status === TimesheetStatus.Approved) {
    return { color: 'green' };
  }
  if (status === TimesheetStatus.WaitingForApproval) {
    return { color: 'orange' };
  }
  if (status === TimesheetStatus.NeedsRevisement) {
    return { color: 'red' };
  }
  return {};
};

const TimesheetInfo: React.SFC<TimesheetInfoProps> = ({
  timesheet,
  project,
  owner,
}) => (
  <Box
    title={() => (
      <>
        <BoxStatus>
          <Label {...labelProps(timesheet.status)}>
            <Translate text={`timesheet.status.${timesheet.status}`} />
          </Label>
        </BoxStatus>
        {`Hourly timesheet for ${(project && project.name) || ''}`}
      </>
    )}
  >
    <div style={{ display: 'flex' }}>
      <HasAccess roles={[UserRole.Manager, UserRole.Admin]}>
        <UserInfo
          style={{
            marginRight: '40px',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Avatar user={owner as any} view="lg" />
          <Link
            to={`/user/${owner.id}`}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            {`${owner.firstName} ${owner.lastName}`}
          </Link>
        </UserInfo>
      </HasAccess>
      <div>
        <List>
          <List.Item>
            <strong>Timesheet Period:</strong>{' '}
            {parseDate(timesheet.periodStart, 'MMMM, YYYY')}
          </List.Item>
          <List.Item>
            <strong>Status: </strong>
            <Label {...labelProps(timesheet.status)}>
              <Translate text={`timesheet.status.${timesheet.status}`} />
            </Label>
          </List.Item>
          {timesheet.dateApproved && (
            <List.Item>
              <strong>Approval Date:</strong> {timesheet.dateApproved}
            </List.Item>
          )}
        </List>
      </div>
    </div>
  </Box>
);

export default TimesheetInfo;

const BoxStatus = styled.div`
  float: right;
`;

const UserInfo = styled.div`
  .avatar {
    align-self: center;
  }
`;
