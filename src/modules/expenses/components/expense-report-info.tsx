import * as React from 'react';

import { Box } from '../../ui';
import { ExpenseReport } from '../store/models';

export interface ExpenseReportInfoProps {
  expenseReport: ExpenseReport;
}

const ExpenseReportInfo: React.StatelessComponent<ExpenseReportInfoProps> = ({
  expenseReport,
}) =>
  expenseReport ? (
    <Box title="Expense report">
      <strong>ID: {expenseReport.id}</strong> <br />
      <strong>Date submitted: {expenseReport.dateSubmitted}</strong> <br />
      <strong>Status:</strong> {expenseReport.status} <br />
    </Box>
  ) : null;

export default ExpenseReportInfo;
