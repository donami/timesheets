import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList } from 'genui';

import { ExpenseReport } from '../store/models';
import { Translate } from '../../common';

export interface ExpenseReportListProps {
  expenseReports: ExpenseReport[];
}

class ExpenseReportList extends React.Component<ExpenseReportListProps> {
  render() {
    const { expenseReports } = this.props;

    const tableItems = expenseReports.map(report => ({
      id: <Link to={`/expense-report/${report.id}`}>{report.id}</Link>,
      status: <Translate text={`expenses.status.${report.status}`} />,
      submitted: report.dateSubmitted,
    }));

    return (
      <div>
        <TableList
          headings={['ID', 'Submitted', 'Status']}
          items={tableItems}
        />
      </div>
    );
  }
}

export default ExpenseReportList;
