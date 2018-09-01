import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList, Icon } from 'genui';

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
      edit: (
        <Link to={`/timesheet-template/${template.id}/edit`}>
          <Icon name="fas fa-edit" />
        </Link>
      ),
      remove: (
        <Link to={`/timesheet-template/${template.id}/edit`}>
          <Icon name="fas fa-trash" />
        </Link>
      ),
    }));

    return (
      <div>
        <TableList
          headings={['ID', 'Name', 'Edit', 'Remove']}
          items={tableItems}
        />
      </div>
    );
  }
}

export default TimesheetTemplateList;
