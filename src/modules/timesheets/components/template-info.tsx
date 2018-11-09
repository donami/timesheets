import * as React from 'react';
import { List } from 'genui';

import { Box, Column, Row } from '../../ui';
import { TimesheetTemplateItem } from '../store/models';
import { capitalize } from '../../../utils/helpers';

type Props = {
  template: TimesheetTemplateItem;
};

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const TemplateInfo: React.SFC<Props> = ({ template }) => (
  <Row>
    <Column xs={12} sm={6}>
      <Box title="Basic Information">
        <List>
          <List.Item>
            <strong>Name:</strong> {template.name}
          </List.Item>
        </List>
      </Box>
    </Column>
    <Column xs={12} sm={6}>
      <Box title="Work Hours">
        <List divided>
          {Object.keys(template.hoursDays).map(day => (
            <List.Item key={day}>
              {' '}
              <strong>{days[day]}:</strong> {template.hoursDays[day].totalHours}{' '}
              hour
              {template.hoursDays[day].totalHours > 1 && 's'}
            </List.Item>
          ))}
        </List>
      </Box>
    </Column>
  </Row>
);

export default TemplateInfo;
