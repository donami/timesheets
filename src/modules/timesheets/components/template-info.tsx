import * as React from 'react';

import { Box } from '../../ui';
import { TimesheetTemplateItem } from '../store/models';

export interface TemplateInfoProps {
  template: TimesheetTemplateItem;
}

const TemplateInfo: React.StatelessComponent<TemplateInfoProps> = ({
  template,
}) => (
  <Box title="View Template">
    <strong>Name:</strong> {template.name} <br />
  </Box>
);

export default TemplateInfo;
