import * as React from 'react';
import { List } from 'genui';

import { Box, Column, Row } from '../../ui';
import { TimesheetTemplateItem } from '../store/models';
import { capitalize } from '../../../utils/helpers';

type Props = {
  template: TimesheetTemplateItem;
};

const TemplateInfo: React.SFC<Props> = ({ template }) => (
  <Row>
    <Column sm={6}>
      <Box title="Basic Information">
        <strong>Name:</strong> {template.name} <br />
      </Box>
    </Column>
    <Column sm={6}>
      <Box title="Work Hours">
        <List divided>
          {Object.keys(template.hoursDays).map(day => (
            <List.Item key={day}>
              {' '}
              <strong>{capitalize(day)}:</strong> {template.hoursDays[day]} hour
              {template.hoursDays[day] > 1 && 's'}
            </List.Item>
          ))}
        </List>
      </Box>
    </Column>
  </Row>
);

export default TemplateInfo;
