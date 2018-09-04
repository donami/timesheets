import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList, Icon } from 'genui';

import { TimesheetTemplateItem } from '../store/models';
import styled from '../../../styled/styled-components';

export interface TimesheetTemplateListProps {
  templates: TimesheetTemplateItem[];
  noTemplatesText?: string;
  onRemoveTemplate(templateId: number): any;
}

class TimesheetTemplateList extends React.Component<
  TimesheetTemplateListProps
> {
  render() {
    const { templates, noTemplatesText } = this.props;

    if (!templates.length) {
      return <NoTemplates>{noTemplatesText || 'No templates'}</NoTemplates>;
    }

    const tableItems = templates.map(template => ({
      id: <Link to={`/timesheet-template/${template.id}`}>{template.id}</Link>,
      name: template.name,
      options: (
        <Options>
          <Link to={`/timesheet-template/${template.id}/edit`}>
            <Icon name="fas fa-edit" />
          </Link>
          <Icon
            name="fas fa-trash"
            onClick={() => this.props.onRemoveTemplate(template.id)}
          />
        </Options>
      ),
    }));

    return (
      <div>
        <TableList headings={['ID', 'Name', 'Options']} items={tableItems} />
      </div>
    );
  }
}

export default TimesheetTemplateList;

const NoTemplates = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  -moz-box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
  box-shadow: 0px 7px 41px -21px rgba(125, 125, 125, 1);
`;

const Options = styled.div`
  a,
  i {
    margin-right: 5px;
    cursor: pointer;
    color: ${props => props.theme.primaryColor};
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`;
