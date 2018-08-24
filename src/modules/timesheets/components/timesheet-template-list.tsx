import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList } from 'genui';

import { TimesheetTemplateItem } from '../store/models';

export interface TimesheetTemplateListProps {
  templates: TimesheetTemplateItem[];
  noTemplatesText?: string;
}

class TimesheetTemplateList extends React.Component<
  TimesheetTemplateListProps
> {
  render() {
    const { templates, noTemplatesText } = this.props;

    if (!templates.length) {
      return <div>{noTemplatesText || 'No templates'}</div>;
    }

    const tableItems = templates.map(template => ({
      id: <Link to={`/timesheet-template/${template.id}`}>{template.id}</Link>,
      name: template.name,
    }));

    return (
      <div>
        <TableList headings={['ID', 'Name']} items={tableItems} />
      </div>
    );
  }
}

export default TimesheetTemplateList;
