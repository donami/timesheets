import React from 'react';

import { PageHeader } from '../../common';
import { ExpenseForm } from '../components';
import { ExpenseReport } from '../store/models';

type Props = {
  onAddExpense(data: ExpenseReport): any;
};

const ExpenseAddPage: React.SFC<Props> = ({ onAddExpense }) => (
  <div>
    <PageHeader>Create Expense Report</PageHeader>
    <ExpenseForm onSubmit={(model: any) => onAddExpense(model)} />
  </div>
);

export default ExpenseAddPage;
