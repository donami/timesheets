import * as React from 'react';
import { Link } from 'react-router-dom';
import { TableList } from 'genui';

import { ExpenseReport } from '../store/models';
import { Translate } from '../../common';

type Props = {
  expenseReports: ExpenseReport[];
  limit?: number;
};

class ExpenseReportList extends React.Component<Props> {
  render() {
    const { expenseReports, limit } = this.props;

    const tableItems = expenseReports.slice(0, limit || 9999).map(report => ({
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
