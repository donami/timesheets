import React from 'react';

import { PageHeader } from '../../common';
import { ExpenseForm } from '../components';
import { ExpenseReport } from '../store/models';

type Props = {
  onAddExpense(data: ExpenseReport): any;
  loading: boolean;
};

const ExpenseAddPage: React.SFC<Props> = ({ onAddExpense, loading }) => (
  <div>
    <PageHeader>Create Expense Report</PageHeader>
    <ExpenseForm
      loading={loading}
      onSubmit={(model: any) => onAddExpense(model)}
    />
  </div>
);

export default ExpenseAddPage;
